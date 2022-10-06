# 항해99 3주차 

## API

|기능|URI|METHOD|request|response|
|---|---|---|---|---|
|게시글작성|/posts|POST|{"postsId": "1", "postsName":"홍길동", "postsPassword": "1234", "postsTitle": "안녕하세요", "postsContent": "content 입니다."}|{"message":"게시글을 생성하였습니다." |
|게시글조회|/posts|GET|-|{"list" : [{"_id":"633bd89178c9f07c86797c28","postsName":"홍길동","postsTitle":"적서차별 철폐","createdAt":"2022-10-04T06:54:09.300Z"}.{"_id":"633c203159c45b2a05f4f985","postsName":"켄로치","postsTitle":"영화와TV의정치학","createdAt":"2022-10-04T11:59:45.611Z"}]}|
|게시글상세조회|/posts/:postsId|GET|-|{"detailPage":[{"_id":"633bd7a578c9f07c86797c25","postsName":"포포","postsTitle":"서벌턴","postsContent":"테스트입니다","createdAt":"2022-10-04T06:50:13.812Z"}]}|
|게시글수정|/posts/:postsId|PUT|{"inputPassword":"1234"},{"postsContent":"수정사항입니다."}|{"message":"게시글을 수정하였습니다."}|
|게시글삭제|/posts/:postsId|DELETE|{"inputPassword":"1234"}|{"message":게시글을 삭제하였습니다.}

