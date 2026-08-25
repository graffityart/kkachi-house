import type { Metadata } from "next";
import "./globals.css";
import "./why.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maxpool.olbarun.kr"),
  title: "까치 하우스 | 철거·원상복구 무료 현장 방문 견적",
  description: "상가·사무실·주택 철거, 부분 철거, 원상복구까지. 까치 하우스 무료 현장 방문 견적을 신청하세요.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "까치 하우스 | 철거·원상복구",
    description: "철거부터 원상복구까지 현장을 확인하고 필요한 공정만 안내합니다.",
    url: "https://maxpool.olbarun.kr",
    siteName: "까치 하우스",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
