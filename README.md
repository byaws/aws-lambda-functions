> Lambda,

람다란, 서버를 프로비저닝하거나 관리하지 않고도 코드를 실행할 수 있게 해주는 컴퓨팅 서비스입니다.

Index
--------

* mysql : mysql connect && response data
* handler : handler를 통한 router 분리
* hooks : https 모듈을 통하여 hooks bot (slack, jandi, jira 등)

Use
--------

* [1] 해당 패키지가 무거우면 람다에 올릴수 없기 때문에 필요한 모듈만 설치한다.
* [2] package.json - dependencies 원하는 모듈만 넣어두고 npm install
* [3] lambda 핸들러 설정을 파일명과 일치 시킨후에 시작한다. => 초기 index.handler로 구성되어 있다.