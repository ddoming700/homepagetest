# 윤아나 SSG 리팩토링 프로젝트

## 구조
- `index.html` : 메인
- `detail.html` : 상품 상세 공통 페이지
- `css/` : reset / common / main / detail
- `js/` : ES Module 방식으로 기능 분리
- `json/` : 섹션별 데이터 분리
- `image/` : 메인 및 상세 이미지

## 상품 상세 연결
현재 실제 상세페이지로 연결되는 상품은 `rice-001`입니다.

`index.html` → 쌀 상품 클릭 → `detail.html?id=rice-001`

다른 상품은 아직 상세 데이터가 없으므로 `#`으로 유지됩니다.

## 새 상품을 추가하는 방법
1. `json/client_products.json`에 상품을 추가하고 고유 `id`를 넣습니다.
2. `json/product_details.json`에 같은 ID로 상세 데이터를 추가합니다.
3. `js/products.js`의 상세 연결 조건을 필요에 따라 확장합니다.

## 실행
VS Code의 Live Server로 `index.html`을 실행하세요.
ES Module과 fetch를 사용하므로 파일을 직접 더블클릭(`file://`)해서 실행하지 않는 것이 좋습니다.


### 클릭 이동 규칙
메인 페이지의 모든 링크/버튼은 데모 요구사항에 따라 `detail.html?id=rice-001`(바른고을 의성진쌀 10kg)으로 이동합니다. 상세페이지의 SSG.COM 로고는 `index.html`로 돌아갑니다. URL에 다른 상품 ID가 들어와도 상세페이지에서는 의성진쌀 데이터를 표시합니다.
