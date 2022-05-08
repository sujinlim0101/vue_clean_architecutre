# vue clean architecture

* 클린아키텍처 스터디르 하며 사이드 프로젝트로 수행.

### 주제

* 지역을 입력하면 오늘 내일 날씨를 알려줌

![제목_없는_아트워크](https://user-images.githubusercontent.com/60640614/167285496-cfdff5a6-ba5a-4459-8baa-b7e364fc69d3.png)

## 레이어 분리
* Repository, Usecase, Entity로 분리하여, 관심사를 분리
* Entity는 비지니스 로직을 가지고 있으며, 세부적인 사항에 의존하지 않음
* Usecase는 Repository를 몰라야하기 떄문에 Interface로 제어의 역전을 사용.
