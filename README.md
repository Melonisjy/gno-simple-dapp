# Gno.land Simple Dapp (Adena Wallet)

## Tech Stacks

- React (required)
- Typescript (required)
- Vite
- Zustand
- Tailwind CSS

## Why these stacks?

### Tailwind CSS (vs styled-components)

1. 제한된 시간 안에 빠르게 UI 구현 가능
2. 스타일을 컴포넌트 로직에서 분리해 마크업 레벨에서 명확하게 표현 가능

### Zustand (vs Jotai)

1. atom 단위 설계보다 wallet, toast 같은 도메인 중심 상태를 한눈에 관리하기 쉬움
2. 과제 범위에서 구조를 단순하게 유지하기 유리함

### Vite

1. React 생태계에서 CRA보다 선호도가 높음
2. ESBuild 기반으로 dev server/HMR이 빨라 개발 생산성이 높음
3. CRA 대비 불필요한 추상화가 적어 구조 파악이 쉬움
