"use client";

import { FormEvent, useState } from "react";

const services = [
  ["상가 철거", "음식점·카페·매장 등 영업 종료 후 내부 철거와 원상복구"],
  ["사무실 철거", "가벽·천장·바닥·집기 철거와 임대차 종료 원상복구"],
  ["주택 내부 철거", "아파트·빌라·주택 리모델링 전 내부 철거"],
  ["부분 철거", "바닥·천장·벽체·타일·싱크대 등 필요한 범위만 선택 철거"]
];

const heroStats = [
  { icon: "▦", no: "01", label: "부산·경남 지역 전문 철거 업체", value: "지역 밀착 현장 대응" },
  { icon: "▣", no: "02", label: "폐기물 비용 저감", value: "직영 처리장 운용" },
  { icon: "✓", no: "03", label: "부산·경남 철거 건수", value: "2026년 389건 진행" },
  { icon: "♙", no: "04", label: "자격증 인력 대거", value: "폐업 컨설턴트 20명 상주" }
];

const whyCards = [
  { no: "01", title: "합리적인 철거 인건비", text: "현장 조건과 철거 범위를 먼저 확인해 불필요한 공정을 줄이고, 필요한 인력과 장비만 배치해 견적 부담을 낮춥니다." },
  { no: "02", title: "직영 폐기물 처리장", text: "철거 과정에서 발생하는 폐기물 처리 비용을 줄일 수 있도록 직영 처리장 운영 체계를 바탕으로 효율적으로 안내합니다." },
  { no: "03", title: "투명한 견적 · 안심 상담", text: "현장 확인 후 공정별 범위를 명확하게 안내하고, 계약 전 견적 내용을 확인할 수 있도록 상담 과정을 투명하게 진행합니다." },
  { no: "04", title: "정부 지원금 원스톱 안내", text: "소상공인 희망리턴패키지 등 폐업지원 제도를 확인해 신청 가능 여부와 준비 절차를 함께 안내해드립니다." }
];

const portfolioCases = [
  { image:"case-01.webp", category:"식당/카페", badge:"폐업지원금 연계", title:"부산 상가 음식점 원상복구", text:"영업 종료 후 내부 집기 철거와 바닥·벽체 원상복구까지 현장 조건에 맞춰 진행합니다.", meta:"상가 철거 · 원상복구" },
  { image:"case-02.webp", category:"사무실", badge:"부분 철거 시공", title:"부산 사무실 내부 철거", text:"가벽·천장·바닥·집기 등 필요한 범위를 확인해 업무공간 철거와 원상복구를 진행합니다.", meta:"사무실 철거" },
  { image:"case-03.webp", category:"상업시설", badge:"폐기물 직영 처리", title:"부산·경남 상업시설 철거", text:"상업시설 내부 철거부터 폐기물 반출까지 공정별로 정리해 안전하게 작업합니다.", meta:"상업시설 철거" },
  { image:"case-04.webp", category:"주거/아파트", badge:"소음 최소화", title:"부산 아파트 내부 철거", text:"리모델링 전 철거 범위를 확인하고 공용부 보호와 폐기물 반출 동선을 고려해 작업합니다.", meta:"주거 철거" },
  { image:"case-05.webp", category:"학원/교육", badge:"원상복구", title:"부산 학원 원상복구 철거", text:"강의실 가벽과 천장, 바닥재 등 임대차 종료에 필요한 원상복구 범위를 정리해 진행합니다.", meta:"학원 철거 · 원상복구" },
  { image:"case-06.webp", category:"대형/공장", badge:"안전 전문", title:"경남 대형 시설 구조물 철거", text:"넓은 현장과 구조물 철거는 장비 동선과 안전 계획을 먼저 확인한 뒤 공정을 진행합니다.", meta:"대형 시설 철거" }
];

export default function HomePage() {
  const [sending, setSending] = useState(false);
  const [modal, setModal] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEstimate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { name:data.get("name"), phone:data.get("phone"), address:data.get("address"), area:data.get("area"), workType:data.get("workType"), request:data.get("request"), privacy:data.get("privacy")==="on", website:data.get("website") };
    try {
      setSending(true);
      const response = await fetch("/api/estimate", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok || !result.ok) { setErrorMessage(result.message || "접수 처리 중 오류가 발생했습니다."); setModal("error"); return; }
      form.reset(); setModal("success");
    } catch { setErrorMessage("네트워크 연결을 확인한 후 다시 시도해 주세요."); setModal("error"); }
    finally { setSending(false); }
  }

  return <>
    <header className="site-header hero-header">
      <a className="brand logo-brand" href="#top"><img src="/images/uploads/logo.png" alt="까치 하우스" className="site-logo" /></a>
      <nav><a href="#services">사업안내</a><a href="#portfolio">철거사례</a><a href="#estimate">견적안내</a><a className="header-cta" href="#estimate">무료 현장 방문 견적</a></nav>
    </header>
    <main id="top">
      <section className="hero hero-premium">
        <div className="hero-image" aria-hidden="true"><img src="/images/uploads/hero.webp" alt="" /></div>
        <div className="hero-glow hero-glow-one"/><div className="hero-glow hero-glow-two"/>
        <div className="container hero-content hero-content-premium">
          <div className="hero-support-badge hero-animate delay-1">희망리턴패키지 등 정부 폐업지원금 최대 600만 원 신청 연계</div>
          <p className="hero-kicker hero-kicker-strip hero-animate delay-2">부산·경남 지역 전문 철거는 까치 하우스가 답입니다</p>
          <h1 className="hero-animate delay-3">안전하고 깔끔한 철거,<br/><span>까치 하우스</span>가 책임집니다.</h1>
          <div className="hero-price-banner hero-animate delay-4"><strong>철거부터 원상복구까지</strong><b>타업체 대비 평균 25% 저렴하게!</b></div>
          <p className="hero-copy hero-animate delay-5">상가·사무실·주택 철거부터 원상복구까지.<br/>현장을 직접 확인하고 필요한 공정만 정확하게 안내합니다.</p>
          <a href="#estimate" className="primary-button hero-cta hero-animate delay-5">무료 현장 방문 견적 신청 <span>→</span></a>
        </div>
        <div className="hero-stats-wrap container hero-animate delay-5"><div className="hero-stats-card">{heroStats.map((item)=><div className="hero-stat" key={item.no}><div className="hero-stat-icon">{item.icon}</div><div className="hero-stat-no">{item.no}</div><div className="hero-stat-label">{item.label}</div><div className="hero-stat-value">{item.value}</div><span className="hero-stat-line"/></div>)}</div></div>
      </section>

      <section className="why-section" id="why-kkachi">
        <div className="container"><div className="why-heading"><p className="why-kicker">WHY KKACHI HOUSE</p><h2>왜 철거는 <span>‘까치 하우스’</span>여야 할까요?</h2><p>복잡한 철거 견적과 폐기물 처리, 지원금 안내까지 한 번에 이해하기 쉽게 정리해드립니다.</p></div><div className="why-grid">{whyCards.map((card)=><article className="why-card" key={card.no}><div className="why-no">{card.no}</div><h3>{card.title}</h3><p>{card.text}</p></article>)}</div></div>
      </section>

      <section className="case-section" id="portfolio">
        <div className="container">
          <div className="case-heading"><div><p>PORTFOLIO</p><h2>까치 철거 검증된 실제 시공사례</h2></div><span>상가, 사무실, 주거 공간 등 다양한 철거 현장을 확인하세요.</span></div>
          <div className="case-grid">
            {portfolioCases.map((item,i)=><article className="case-card" key={item.image}>
              <div className="case-photo">
                <div className="case-photo-placeholder">시공사진 {String(i+1).padStart(2,"0")}</div>
                <img src={`/images/uploads/portfolio/${item.image}`} alt={item.title} onError={(e)=>{e.currentTarget.style.display="none"}} />
                <span className="case-tag">{item.category}</span><span className="case-badge">{item.badge}</span>
              </div>
              <div className="case-body"><h3>{item.title}</h3><p>{item.text}</p><div className="case-meta"><span>{item.meta}</span><b>까치 하우스</b></div></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section" id="services"><div className="container"><div className="section-heading"><p className="eyebrow dark">SERVICE</p><h2>필요한 철거 범위부터 확인하세요.</h2><p>전체 철거가 아니어도 괜찮습니다. 현장 상황과 목적에 맞춰 상담합니다.</p></div><div className="service-grid">{services.map(([title,description],i)=><article className="service-card" key={title}><div className="image-placeholder">SERVICE IMAGE {i+1}</div><div className="card-body"><h3>{title}</h3><p>{description}</p></div></article>)}</div></div></section>
      <section className="process-section"><div className="container"><div className="section-heading light"><p className="eyebrow">PROCESS</p><h2>견적 신청부터 현장 상담까지</h2><p>불필요하게 복잡한 절차 없이 필요한 내용을 빠르게 확인합니다.</p></div><div className="process-grid"><div><b>01</b><h3>온라인 접수</h3><p>현장 주소와 면적, 요청사항을 남겨주세요.</p></div><div><b>02</b><h3>내용 확인</h3><p>접수 내용을 확인하고 상담을 진행합니다.</p></div><div><b>03</b><h3>현장 방문</h3><p>철거 범위와 현장 조건을 직접 확인합니다.</p></div><div><b>04</b><h3>견적 안내</h3><p>확인된 공정을 기준으로 견적을 안내합니다.</p></div></div></div></section>
      <section className="estimate-section" id="estimate"><div className="container estimate-layout"><div className="estimate-copy"><p className="eyebrow">FREE ESTIMATE</p><h2>무료 현장 방문<br/>견적을 신청하세요.</h2><p>현장 정보를 자세히 남겨주시면 상담과 방문 일정 조율에 도움이 됩니다.</p><ul><li>상가·사무실·주택 철거</li><li>임대차 종료 원상복구</li><li>바닥·천장·벽체 등 부분 철거</li></ul></div><form className="estimate-form" onSubmit={submitEstimate}><label>성함 / 업체명 <em>*</em><input name="name" required maxLength={60} placeholder="예: 홍길동 / 까치상사"/></label><div className="form-row"><label>연락처 <em>*</em><input name="phone" inputMode="tel" required placeholder="010-1234-5678"/></label><label>예상 시공 면적(평) <em>*</em><input name="area" inputMode="decimal" required placeholder="예: 25"/></label></div><label>시공 주소 <em>*</em><input name="address" required maxLength={180} placeholder="상세 주소까지 입력해 주세요."/></label><label>철거 종류<select name="workType" defaultValue=""><option value="">선택해 주세요.</option><option>상가 철거 / 원상복구</option><option>사무실 철거 / 원상복구</option><option>주택 내부 철거</option><option>부분 철거</option><option>기타</option></select></label><label>문의 및 요청사항 <em>*</em><textarea name="request" required maxLength={650} rows={6} placeholder="철거 범위, 현재 상태, 희망 일정 등을 자유롭게 적어주세요."/></label><label className="privacy-check"><input type="checkbox" name="privacy" required/><span>개인정보 수집 및 이용에 동의합니다. <a href="/privacy" target="_blank">[내용보기]</a></span></label><input className="hp-field" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/><button className="submit-button" type="submit" disabled={sending}>{sending?"접수 중...":"무료 현장 방문 견적 신청"}</button></form></div></section>
    </main>
    <footer><div className="container footer-grid"><div className="footer-logo-block"><img src="/images/uploads/logo.png" alt="까치 하우스" className="footer-logo"/><p>철거 · 원상복구 · 부분 철거</p></div><div className="business-info"><p><b>대표</b> 오지훈</p><p><b>사업자등록번호</b> 458-21-02084</p><p><b>업태</b> 서비스 <span className="divider">|</span> <b>종목</b> 집수리</p><p><b>사업장</b> 부산광역시 사하구 까치고개로 47 (괴정동)</p><a href="/privacy">개인정보처리방침</a></div></div><div className="container copyright">Copyright © 2026 까치 하우스. All Rights Reserved.</div></footer>
    <a className="mobile-fixed-cta" href="#estimate">무료 견적 신청</a>
    {modal&&<div className="modal-backdrop" role="dialog" aria-modal="true" onClick={()=>setModal(null)}><div className="modal-box" onClick={e=>e.stopPropagation()}>{modal==="success"?<><div className="modal-icon">✓</div><h2>접수가 정상적으로 완료되었습니다.</h2><p>빠른 연락드리겠습니다.<br/>감사합니다.</p></>:<><div className="modal-icon error">!</div><h2>접수를 완료하지 못했습니다.</h2><p>{errorMessage}</p></>}<button onClick={()=>setModal(null)}>확인</button></div></div>}
  </>;
}
