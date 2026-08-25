export const metadata = {
  title: "개인정보 수집 및 이용 안내 | 까치 하우스",
  description: "까치 하우스 무료 현장 방문 견적 신청 시 수집하는 개인정보 항목, 이용 목적, 보유 기간 및 이용자 권리를 안내합니다."
};

const items = [
  {
    no: "01",
    title: "수집하는 개인정보 항목",
    text: "무료 현장 방문 견적 및 상담 진행을 위해 필요한 최소한의 정보만 수집합니다.",
    list: ["성함 또는 업체명", "연락처", "시공 주소", "예상 시공 면적", "철거 종류", "문의 및 요청사항"]
  },
  {
    no: "02",
    title: "개인정보 이용 목적",
    text: "수집된 개인정보는 아래 목적 범위에서만 이용하며, 다른 용도로 임의 사용하지 않습니다.",
    list: ["철거·원상복구 상담", "현장 방문 일정 조율", "견적 산출 및 안내", "문의 내용 확인 및 상담 연락"]
  },
  {
    no: "03",
    title: "보유 및 이용 기간",
    text: "상담 및 견적 목적이 달성된 후 개인정보는 지체 없이 파기합니다. 다만 관계 법령에서 일정 기간 보관을 요구하는 경우 해당 기간 동안 안전하게 보관할 수 있습니다."
  },
  {
    no: "04",
    title: "개인정보의 제3자 제공",
    text: "까치 하우스는 이용자의 동의 없이 개인정보를 외부에 판매하거나 임의로 제공하지 않습니다. 법령에 따른 요청 등 정당한 사유가 있는 경우에는 관련 절차에 따라 처리합니다."
  },
  {
    no: "05",
    title: "동의 거부 권리",
    text: "개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 다만 견적 상담에 필요한 필수 정보의 수집에 동의하지 않을 경우 무료 현장 방문 견적 신청 및 상담 진행이 제한될 수 있습니다."
  },
  {
    no: "06",
    title: "개인정보 보호를 위한 안내",
    text: "견적 신청을 통해 전달되는 개인정보는 상담 및 현장 방문 목적에 필요한 범위에서만 확인하며, 불필요한 개인정보가 장기간 보관되지 않도록 관리합니다."
  }
];

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <section className="privacy-hero">
        <div className="privacy-container">
          <a href="/" className="privacy-logo-link"><img src="/images/uploads/logo.png" alt="까치 하우스" /></a>
          <div className="privacy-badge">PERSONAL INFORMATION</div>
          <h1>개인정보 수집 및 이용 안내</h1>
          <p>까치 하우스는 무료 현장 방문 견적 상담에 필요한 정보만 수집하며,<br className="privacy-desktop"/> 상담 목적 범위 안에서 안전하게 관리합니다.</p>
          <div className="privacy-trust-row">
            <span>✓ 최소 정보 수집</span><span>✓ 상담 목적 이용</span><span>✓ 목적 달성 후 파기</span>
          </div>
        </div>
      </section>

      <section className="privacy-content">
        <div className="privacy-container privacy-layout">
          <aside className="privacy-summary">
            <div className="privacy-summary-card">
              <span className="privacy-summary-label">까치 하우스 개인정보 보호 원칙</span>
              <strong>견적 상담에 필요한 정보만<br/>최소한으로 확인합니다.</strong>
              <p>무료 현장 방문 견적을 신청하기 위해 입력한 정보는 철거 상담, 일정 조율 및 견적 안내를 위해 사용됩니다.</p>
              <a href="/#estimate">무료 현장 견적 신청 →</a>
            </div>
          </aside>

          <div className="privacy-main">
            <div className="privacy-intro">
              <h2>안심하고 견적을 신청하실 수 있도록 안내드립니다.</h2>
              <p>아래 내용을 확인하신 후 개인정보 수집 및 이용에 동의해 주세요. 까치 하우스는 고객님의 정보를 견적 상담과 현장 방문에 필요한 범위에서만 이용합니다.</p>
            </div>

            <div className="privacy-policy-list">
              {items.map((item) => (
                <article className="privacy-policy-card" key={item.no}>
                  <div className="privacy-policy-no">{item.no}</div>
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                    {item.list && <ul>{item.list.map((value) => <li key={value}>{value}</li>)}</ul>}
                  </div>
                </article>
              ))}
            </div>

            <div className="privacy-notice">
              <div className="privacy-notice-icon">i</div>
              <div><strong>동의 전 꼭 확인해 주세요.</strong><p>필수 정보는 견적 상담을 위한 최소 항목입니다. 개인정보 수집 및 이용에 동의하지 않는 경우 온라인 견적 접수가 제한될 수 있습니다.</p></div>
            </div>

            <div className="privacy-actions">
              <a href="/" className="privacy-secondary-btn">← 메인으로 돌아가기</a>
              <a href="/#estimate" className="privacy-primary-btn">무료 현장 방문 견적 신청</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="privacy-footer">
        <div className="privacy-container privacy-footer-inner">
          <img src="/images/uploads/logo.png" alt="까치 하우스" />
          <div><p><b>상호</b> 까치 하우스 <span>|</span> <b>대표</b> 오지훈 <span>|</span> <b>사업자등록번호</b> 458-21-02084</p><p><b>사업장</b> 부산광역시 사하구 까치고개로 47 (괴정동)</p></div>
        </div>
      </footer>
    </main>
  );
}
