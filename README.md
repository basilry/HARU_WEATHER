# 🌤️ Vue Weather App

Vue.js 3을 사용한 현대적인 날씨 앱입니다. 위치 기반 날씨 정보, 도시 검색, 즐겨찾기, 5일 예보 등의 기능을 제공합니다.

## ✨ 주요 기능

### 🎯 핵심 기능
- **📍 위치 기반 날씨**: GPS 또는 IP 기반 자동 위치 감지
- **🔍 도시 검색**: 실시간 자동완성으로 전 세계 도시 검색
- **⭐ 즐겨찾기**: 자주 확인하는 도시를 즐겨찾기에 저장
- **📅 5일 예보**: 상세한 일기예보 정보 제공
- **🌙 다크모드**: 시스템 설정에 따른 자동 테마 전환

### 🎨 UI/UX 특징
- **📱 반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원
- **⚡ 빠른 로딩**: 효율적인 API 호출과 캐싱
- **🎭 부드러운 애니메이션**: Vue 트랜지션을 활용한 자연스러운 화면 전환
- **♿ 접근성**: 키보드 내비게이션 및 스크린 리더 지원

### 📊 날씨 정보
- 현재 온도 및 체감온도
- 최고/최저 기온
- 습도, 기압, 바람 속도
- 가시거리, 일출/일몰 시간
- 날씨 아이콘 및 한국어 설명

## 🚀 시작하기

### 필수 요구사항
- Node.js 16.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **패키지 설치**
   ```bash
   npm install
   ```

2. **OpenWeatherMap API 키 설정**
   - [OpenWeatherMap](https://openweathermap.org/api)에서 무료 계정 생성
   - API 키 발급 (무료 플랜: 1,000 calls/day)
   - `src/services/weatherService.js` 파일에서 `API_KEY` 상수에 발급받은 키 입력
   
   ```javascript
   const API_KEY = '여기에_발급받은_API_키_입력'
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   
   브라우저에서 `http://localhost:3000` 으로 접속

4. **프로덕션 빌드**
   ```bash
   npm run build
   ```

### ⚠️ API 키 없이 사용하기

API 키를 설정하지 않아도 앱을 테스트할 수 있습니다:
- 모의 데이터로 기본 기능 동작
- 실제 날씨 정보는 표시되지 않음
- 개발 및 UI 테스트 목적으로 사용 가능

## 🏗️ 프로젝트 구조

```
src/
├── components/          # Vue 컴포넌트
│   ├── WeatherCard.vue     # 메인 날씨 카드
│   ├── FavoriteCard.vue    # 즐겨찾기 카드
│   └── ForecastSection.vue # 5일 예보 섹션
├── services/           # 비즈니스 로직
│   ├── weatherService.js   # 날씨 API 서비스
│   ├── locationService.js  # 위치 서비스
│   └── storageService.js   # 로컬 스토리지 관리
├── App.vue            # 메인 앱 컴포넌트
├── main.js            # 앱 진입점
└── style.css          # 전역 스타일
```

## 🔧 기술 스택

- **Frontend**: Vue.js 3 (Composition API)
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **API**: OpenWeatherMap API
- **Storage**: LocalStorage
- **Location**: Geolocation API + IP Geolocation
- **Styling**: CSS3 (Custom Properties, Grid, Flexbox)

## 📱 기능 상세

### 위치 서비스
- **GPS 우선**: 브라우저의 Geolocation API 사용
- **IP 백업**: GPS 실패 시 IP 기반 위치 추정
- **권한 관리**: 위치 권한 상태 확인 및 안내

### 날씨 서비스
- **현재 날씨**: 실시간 날씨 정보
- **5일 예보**: 3시간 간격 상세 예보
- **도시 검색**: 전 세계 도시 검색 및 자동완성
- **에러 처리**: 네트워크 오류, API 한도 등 처리

### 저장소 관리
- **즐겨찾기**: 도시별 즐겨찾기 관리
- **설정**: 다크모드, 마지막 위치 등
- **데이터 관리**: 스토리지 사용량 모니터링

## 🎨 스타일링

### CSS 변수 시스템
```css
:root {
  --primary-color: #4f46e5;
  --background-color: #f8fafc;
  --text-color: #1e293b;
  --card-background: #ffffff;
  /* ... */
}
```

### 다크모드 지원
```css
[data-theme="dark"] {
  --background-color: #0f172a;
  --text-color: #f1f5f9;
  --card-background: #1e293b;
  /* ... */
}
```

### 반응형 브레이크포인트
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔒 보안 고려사항

- **API 키 보호**: 프로덕션에서는 환경변수 사용 권장
- **HTTPS 필수**: Geolocation API는 HTTPS에서만 동작
- **사용자 개인정보**: 위치 정보는 로컬에만 저장

## 🚀 배포

### Vercel 배포
```bash
npm run build
vercel --prod
```

### Netlify 배포
```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

### 환경변수 설정 (프로덕션)
```bash
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

## 🤝 기여하기

1. 포크하기
2. 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시 (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🙏 감사의 말

- [OpenWeatherMap](https://openweathermap.org/) - 날씨 데이터 제공
- [Vue.js](https://vuejs.org/) - 프레임워크
- [Vite](https://vitejs.dev/) - 빌드 도구

---

**Happy Coding! 🌈**
