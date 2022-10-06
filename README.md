# 항해99 3주차 

## 게시글 API : URI 파라미터의 postsId는 1부터 부여되는 게시글 번호이자 페이지번호입니다.

|기능|URI|METHOD|request|response|
|---|---|---|---|---|
|게시글작성|/posts|POST|{"postsId": "1", "postsName":"홍길동", "postsPassword": "1234", "postsTitle": "안녕하세요", "postsContent": "content 입니다."}|{"message":"게시글을 생성하였습니다."} |
|게시글조회|/posts|GET|-|{"list" : [{"_id":"633bd89178c9f07c86797c28","postsName":"홍길동","postsTitle":"적서차별 철폐","createdAt":"2022-10-04T06:54:09.300Z"}.{"_id":"633c203159c45b2a05f4f985","postsName":"켄로치","postsTitle":"영화와TV의정치학","createdAt":"2022-10-04T11:59:45.611Z"}]}|
|게시글상세조회|/posts/:postsId|GET|-|{"detailPage":[{"_id":"633bd7a578c9f07c86797c25","postsName":"포포","postsTitle":"서벌턴","postsContent":"테스트입니다","createdAt":"2022-10-04T06:50:13.812Z"}]}|
|게시글수정|/posts/:postsId|PUT|{"inputPassword":"1234"},{"postsContent":"수정사항입니다."}|{"message":"게시글을 수정하였습니다."}|
|게시글삭제|/posts/:postsId|DELETE|{"inputPassword":"1234"}|{"message":게시글을 삭제하였습니다.}


## 댓글 API : URI 파라미터의 commentsId는 데이터베이스의 ObjectID 입니다.
|기능|URI|METHOD|request|response|
|---|---|---|---|---|
|댓글작성|/posts/comments/:postId|POST|{postsId": "1", "commentsName":"홍길동", "commentsContent":"댓글입니다."}|{"message":"댓글을 생성하였습니다." |
|댓글조회|/posts/comments/:postId|GET|-|{"list":[{"_id":"633bd9f678c9f07c86797c49","commentsName":"움베르트 에코","commentsContent":"궁극의 리스트","createdAt":"2022-10-04T07:00:06.297Z"},{"_id":"633bd98f78c9f07c86797c39","commentsName":"Naomi Clyne","commentsContent":"The Shock Doctrine","createdAt":"2022-10-04T06:58:23.238Z"},{"_id":"633bd96678c9f07c86797c37","commentsName":"안톤캐스","commentsContent":"수정테스트","createdAt":"2022-10-04T06:57:42.494Z"}]}|
|댓글수정|/posts/comments/:commentsId|PUT|{"commentsContent" : "수정테스트"}|{ "message": "댓글 내용을 입력해주세요." }, {"message": "댓글을 수정하였습니다."}|
|댓글삭제|/posts/comments/:commentsId|DELETE|-|{"message":댓글을 삭제하였습니다.}
