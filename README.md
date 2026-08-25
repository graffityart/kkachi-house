# 까치 하우스 철거 랜딩페이지

## 로컬 실행
```bash
npm install
npm run dev
```

## iCODE 설정
Vercel 환경변수에 아래 값을 등록합니다.

- `ICODE_TOKEN`: 아이코드 토큰관리에서 생성한 토큰
- `ICODE_SENDER_PHONE`: 아이코드에 사전등록된 발신번호
- `ICODE_ADMIN_PHONE`: 견적 접수 문자를 받을 관리자 번호

> 토큰은 GitHub에 절대 커밋하지 마세요.

## 이미지 교체
`public/images/` 안의 안내용 SVG 파일을 실제 사진으로 교체한 뒤
`components/HomePage.tsx`의 이미지 URL만 수정하면 됩니다.

권장 파일명:
- `/images/hero.webp`
- `/images/service-store.webp`
- `/images/service-office.webp`
- `/images/service-home.webp`
- `/images/portfolio-01.webp`
- `/images/portfolio-02.webp`
- `/images/portfolio-03.webp`

## 도메인
Vercel 프로젝트 배포 후 Domains에 `maxpool.olbarun.kr`을 추가하고,
Vercel이 안내하는 DNS 값을 `olbarun.kr` DNS에 적용합니다.

## 문자 발송
`/api/estimate`가 iCODE의 JSON 소켓 규격으로 관리자에게만 접수 내용을 보냅니다.
고객에게는 문자를 발송하지 않고 웹 팝업으로 접수 완료를 안내합니다.
