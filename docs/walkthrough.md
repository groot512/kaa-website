# KAA 홈페이지 리뉴얼 - 완료 워크스루

## 📁 프로젝트 구조

```
kaa-website/
├── index.html          (33KB)  메인 홈페이지
├── membership.html     (-)     멤버십 상세
├── services.html       (-)     서비스 안내
├── about.html          (-)     KAA 소개
├── education.html      (-)     교육/자격
├── css/
│   ├── global.css      (9KB)   디자인 시스템 변수/리셋
│   ├── components.css  (25KB)  전체 컴포넌트 스타일
│   ├── animations.css  (6KB)   애니메이션 키프레임
│   └── membership-page.css     멤버십 페이지 전용
├── js/
│   ├── main.js         (10KB)  공통 인터랙션
│   └── membership.js           멤버십 계산기/토글
└── assets/                     (이미지/미디어 폴더)
```

---

## 📄 페이지별 기능

### 1. [index.html](file:///g:/내 드라이브/anti/2026-02-20/kaa-website/index.html) — 메인 홈페이지
| 섹션 | 기능 |
|------|------|
| Hero | 3D 카드 틸트 + 파티클 배경 + 카운터 애니메이션 |
| 혜택 | 유류비/기프티콘/보험/글로벌 4개 카드 |
| 멤버십 | Silver/Gold/Platinum 카드 + 절감 시뮬레이터 |
| 사업영역 | 6대 사업 카드 |
| 파트너 | 무한 스크롤 로고 벨트 |
| 앱 | 3D 폰 목업 |
| 뉴스/CTA/Footer | 뉴스 카드, 가입 유도, 4열 링크 |

### 2. [membership.html](file:///g:/내 드라이브/anti/2026-02-20/kaa-website/membership.html) — 멤버십 상세
- 3단계 가입 프로세스 안내
- **카드/비교표 토글** 전환 뷰
- **기프티콘 할인 카테고리** (카페, 편의점, 외식, 주유, 문화, 쇼핑)
- **고급 절감액 시뮬레이터** (레인지 슬라이더 + 등급 선택 + 항목별 결과)
- 회원 후기 · FAQ 아코디언

### 3. [services.html](file:///g:/내 드라이브/anti/2026-02-20/kaa-website/services.html) — 서비스 안내
- **5개 탭** 전환: 유류비 · 기프티콘 · 보험 · 글로벌 · 국제면허
- 각 탭에 4개 서비스 카드 + 등급 태그
- IDP 발급 안내 + 전국 제휴 네트워크 통계

### 4. [about.html](file:///g:/내 드라이브/anti/2026-02-20/kaa-website/about.html) — KAA 소개
- 비전/미션/핵심가치 3카드
- CEO 인사말 + 블록쿼트
- 타임라인 연혁
- 6개 조직 구성 카드
- 오시는 길 (지도 플레이스홀더)

### 5. [education.html](file:///g:/내 드라이브/anti/2026-02-20/kaa-website/education.html) — 교육/자격
- 3대 교육 프로그램 카드
- 교통지도사 4단계 응시 절차
- 시험 일정표 (상태 뱃지)
- 기타 프로그램 (어린이, 고령자, 에코, 방어운전)

---

## 🎨 디자인 특징
- **다크 모드** (Deep Navy `#060B18`) + 글래스모피즘
- **3D 효과**: 마우스 추적 틸트, CSS perspective, 플로팅 오브
- **네온 악센트**: Electric Blue + Gold
- **마이크로 애니메이션**: 스크롤 리빌, 카운터, 파티클
- **반응형**: Desktop / Tablet / Mobile

## ✅ 실행 방법
```
http://127.0.0.1:8080
```
또는 `index.html`을 브라우저에서 직접 열기

## 🔜 다음 단계
1. 사용자 디자인 피드백
2. 실제 콘텐츠 & 이미지 적용
3. Kakao Map API 연동
4. 백엔드 API & 결제 시스템
