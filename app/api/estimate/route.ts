import { NextResponse } from "next/server";
import net from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EstimateBody = {
  name?: string;
  phone?: string;
  address?: string;
  area?: string;
  workType?: string;
  request?: string;
  privacy?: boolean;
  website?: string;
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");
const clean = (value: unknown, max = 500) => String(value ?? "").trim().slice(0, max);

function sendIcodeSms(message: string): Promise<{ code: string; raw: string }> {
  const key = process.env.ICODE_TOKEN?.trim();
  const tel = onlyDigits(process.env.ICODE_ADMIN_PHONE || "");
  const cb = onlyDigits(process.env.ICODE_SENDER_PHONE || "");

  if (!key || !tel || !cb) throw new Error("문자 발송 환경변수가 설정되지 않았습니다.");

  const payload = {
    key,
    tel,
    cb,
    msg: message.slice(0, 1900),
    title: "까치 하우스 견적접수",
    date: "",
    charset: "utf-8"
  };

  const json = JSON.stringify(payload);
  const bytes = Buffer.byteLength(json, "utf8");
  if (bytes > 9999) throw new Error("문자 데이터가 너무 깁니다.");

  const packet = `06${String(bytes).padStart(4, "0")}${json}`;

  return new Promise((resolve, reject) => {
    const socket = net.createConnection({ host: "211.172.232.124", port: 9201 });
    let response = "";
    let settled = false;

    const finishError = (err: Error) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      reject(err);
    };

    socket.setTimeout(8000);
    socket.on("connect", () => socket.write(packet, "utf8"));
    socket.on("data", (chunk) => {
      response += chunk.toString();
      if (response.length >= 8) {
        const code = response.slice(6, 8);
        if (settled) return;
        settled = true;
        socket.end();
        resolve({ code, raw: response });
      }
    });
    socket.on("timeout", () => finishError(new Error("아이코드 서버 응답 시간이 초과되었습니다.")));
    socket.on("error", finishError);
    socket.on("end", () => {
      if (!settled) finishError(new Error("아이코드 서버 응답을 확인하지 못했습니다."));
    });
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EstimateBody;
    if (body.website) return NextResponse.json({ ok: true });

    const name = clean(body.name, 60);
    const phone = onlyDigits(clean(body.phone, 20));
    const address = clean(body.address, 180);
    const area = clean(body.area, 30);
    const workType = clean(body.workType, 50);
    const requestText = clean(body.request, 650);

    if (!name || phone.length < 10 || !address || !area || !requestText || !body.privacy) {
      return NextResponse.json({ ok: false, message: "필수 입력사항을 확인해 주세요." }, { status: 400 });
    }

    const message = [
      "[까치 하우스 견적접수]",
      `성함: ${name}`,
      `연락처: ${phone}`,
      `주소: ${address}`,
      `예상면적: ${area}평`,
      workType ? `철거종류: ${workType}` : "",
      "",
      "요청사항:",
      requestText
    ].filter(Boolean).join("\n");

    const result = await sendIcodeSms(message);

    if (result.code !== "00" && result.code !== "17") {
      console.error("iCODE send failed:", result.code, result.raw);
      return NextResponse.json({ ok: false, message: "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("estimate api error:", error);
    return NextResponse.json({ ok: false, message: "접수 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." }, { status: 500 });
  }
}
