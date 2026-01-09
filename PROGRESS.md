# Datarize Frontend Assignment Progress

## 1단계. 라우터 및 레이아웃 구현

- [x] `react-router-dom`, `tailwind` 및 유틸리티 라이브러리 설치
- [x] 페이지 컴포넌트 생성 (Dashboard, Customer, NotFound)
- [x] `DefaultLayout` 구현
- [x] `AppRouter` 설정 및 `App.tsx` 연결

## 2단계. 공통 API 통신 레이어 구축

- [x] `fetch` 기반 HTTP Client 유틸리티 구현 (`httpClient`)
- [x] `HttpError` 클래스 구현 (에러 표준화)
- [x] Query Params 자동 처리 로직 추가
- [x] 공통 헤더 및 JSON 파싱 처리

## 3단계. API 엔드포인트 함수 분리

- [x] API 엔드포인트 상수화
- [x] `api/customers/apis.ts`, `api/purchase/apis.ts` 등으로 함수 분리
- [x] Request/Response 타입 정의 (`src/api/customers/types.ts`, `src/api/purchase/types.ts`)

## 4단계. React Query 설정

- [x] `QueryClient` 설정 및 `QueryProvider` 구현
- [x] 전역 설정 (staleTime, retry 등) 적용
- [x] `main.tsx` 또는 `App.tsx`에 Provider 적용

## 5단계. 날짜 범위 선택 컴포넌트

- [x] `DateRangePicker` 컴포넌트 구현
- [x] 시작일/종료일 상태 관리
- [x] 유효성 검사 (시작일 > 종료일 방지)
- [x] 날짜 범위 상태 훅 테스트코드 작성

## 6단계. 대시보드 — 가격대별 구매 빈도 테이블

- [x] API 연동 (`/api/purchase-frequency`)
- [x] 데이터 로딩/에러/빈 상태 처리
- [x] `recharts` 라이브러리 설치
- [x] 구매 빈도 데이터 시각화 (BarChart 등)

## 7단계. CSV 다운로드 기능

- [x] JSON 데이터를 CSV로 변환하는 유틸리티 함수 구현
- [x] 다운로드 버튼 및 기능 연동

## 8단계. 고객 목록 (검색/정렬/페이지네이션)

- [x] 고객 목록 API 연동
- [x] 검색창 구현
- [x] 정렬 기능 (구매금액 순 등)
- [x] 페이지네이션 UI 및 로직 구현

## 9단계. 고객 상세 구매 내역

- [ ] 고객 상세 정보 조회 API 연동
- [ ] 구매 내역 목록 UI 구현 (썸네일 포함)

## 11단계. 테스트 코드 작성

- [ ] 유틸리티 함수 단위 테스트 (CSV 변환 등)
- [ ] 주요 컴포넌트 테스트

## 12단계. 마무리

- [ ] 코드 정리 및 주석 보완
- [ ] README.md 작성 (실행 방법, 기술 스택)
