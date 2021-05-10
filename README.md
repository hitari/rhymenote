# Rhymenot

## 라임검색기(2015)

<http://rhymenote.com>

### 기술스택

- ES5, jQuery, Java, Mysql

## 라임검색 사이트 개편 작업(2021)

사용 스택: react, redux toolkit, Typescript, mongoDB, express

- 기존 한글 ->한글/영어 에서 영어-> 한글/영어 검색 가능하도록 추가 개발 예정
- 가사 기록 및 검색 단어 저장 및 비교 기능 설계중
- Node Server 및 MongoDB는 private repo 관리

### 고민사항

- 검색 결과 리스트 보여주는 부분을 좀더 편하게 볼수있는 구조로 변경 하려한다. 인피니티 스크롤과 페이징 이동 그리고 초성 이동 기능을 Mix해서 리스트 UI를 구성하는건 어떤가 고민중...
- 한글 변환 로직은 node server에서 처리 하도록 변경 작업 하는게 맞을거 같아 페이징 기초 작업 이후는 변환 로직 서버로 이전
