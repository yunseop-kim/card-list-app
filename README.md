# Creatrip Assignement

크리에이트립에 지원해주셔서 감사합니다.

과제는 이 repository 를 clone 받아서 작업해주시면 됩니다.
과제를 다 수행하시면 작업하신 github repository 를 알려주세요!

## 해야할 일
1. 백엔드
    * 데이터베이스
        * 데이터베이스의 테이블에는 User 와 Item 이 주어졌습니다.
        * User 는 Item 을 여러개 가질 수 있습니다. 이 관계를 작성해주세요.
    * REST API
        * Item 에 대해서 create, read, update, delete api 를 작성해주세요.
2. 프론트
    * Item 을 보여주는 새로운 page 를 생성합니다.
    * 좌측에는 User 의 리스트가 우측에는 해당 User 의 Item 리스트가 보여집니다.
        * 좌측의 User 를 클릭하면, 우측에 해당 User 의 Item 이 보여집니다.
    * Vuex store 에 가져온 Item 을 저장합니다.
    * Item 에는 이름과 이미지URL 이 포함되어 있습니다. 카드 형식으로 보여주세요.
    * Item 을 삭제하는 기능을 작성해주세요.
    * Item 의 이름을 변경하는 기능을 작성해주세요.
    * Item 을 이름으로 정렬하는 기능을 작성해주세요. (오름차순, 내림차순)
    * 본인이 좋아하는 어떤 라이브러리도 사용할 수 있습니다. (vuetify, bootstrap...)

## 추가사항
1. api 서버는 hot-reload 가 구현되어 있지 않습니다. 필요하시면 구현해주세요. 
    
   
## 데이터베이스 초기화
    create database creatrip;
    create user creatrip@localhost identified by 'creatrip';
    grant all privileges on creatrip.* to creatrip@localhost with grant option;

## 빌드
    # install dependencies
    $ npm install
    
    # run api server
    $ npm run dev:api
    
    # run web server
    $ npm run dev:web
