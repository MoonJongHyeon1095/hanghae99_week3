const express = require('express'); 
//const { default: test } = require('node:test'); //<-- 이게 뭘까? 왜 생겼을까?
const router = express.Router();

const Posts = require("../schemas/posts");  

    
/** 배포환경 확인
 *GET 게시글목록 전체조회 
 *제목, 이름, 작성날짜
 *작성날짜 내림차순 정렬
 */

router.get("/", async (req, res) => {
  const posts = await Posts.find()
  .select({
      "postsName" : 1, "postsTitle" :1, "createdAt" : 1, 
       })
    .sort({"createdAt" : "desc"})
    
    res.status(203).json({list : posts});
    
  }); 

 /** 배포환경 확인
  *  GET 게시글 상세조회
  *  제목, 이름, 글내용, 날짜
  */
router.get('/:postsId', async (req,res)=> { 
  const {postsId} = req.params;
  // const postsId = req.params.postsId 
  // 위와 같다. //걍 구조분해 할당으로 해본 것.
  
  const detail = await Posts.find({postsId:postsId}).select({
    "_id":0, "postsTitle":1, "postsName":1, "postsContent":1, "createdAt":1
  })
  
  res.status(203).json({detailPage:detail})
  })


/**배포환경 확인
 * POST 게시글 작성
 * 제목, 이름, 비밀번호, 글내용
 *  */ 

//async를 굳이 넣어야 하는 이유는?
router.post("/", async (req, res) => {  
  const { postsId, postsName, postsPassword, postsTitle, postsContent} = req.body; // 구조분해할당

  const createdPosts = await Posts.create({ postsId, postsName, postsPassword, postsTitle, postsContent });
  console.log(createdPosts)
  
  res.status(201).json({ posts: createdPosts, message: '게시글을 생성하였습니다.'});
});

/**배포환경 확인 But 하기의 에러 처리 안됨
 * DELETE
 * 비밀번호 일치시 게시글 삭제
 *  */ 
router.delete("/:postsId", async (req, res) => {
  const { postsId } = req.params;
  const post = await Posts.find({ postsId: Number(postsId) });
  const {inputPassword} = req.body;
  
  if (Number(inputPassword) !== post.postsPassword) {
    res.json({ errorMessage: "번호가 다르다." });
    return;
  } 

  if (Number(inputPassword) == post.postsPassword){
  await Posts.deleteOne({ postsId })}

  res.json({ "message": "게시글을 삭제하였습니다."});

});

/** 
 * node:internal/errors:477
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at new NodeError (node:internal/errors:387:5)
    at ServerResponse.setHeader (node:_http_outgoing:603:11)
    at ServerResponse.header (/home/ubuntu/hh99w3_2/hanghae99_week3/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/home/ubuntu/hh99w3_2/hanghae99_week3/node_modules/express/lib/response.js:174:12)
    at ServerResponse.json (/home/ubuntu/hh99w3_2/hanghae99_week3/node_modules/express/lib/response.js:278:15)
    at /home/ubuntu/hh99w3_2/hanghae99_week3/routes/posts.js:71:9
    at processTicksAndRejections (node:internal/process/task_queues:96:5) {
  code: 'ERR_HTTP_HEADERS_SENT'
}
 * 
*/



/**
 * PUT
 * 게시글 수정, 비밀번호 검사
 */
 //const post = await Posts.find({ postsId: Number(postsId) });
 router.put("/:postsId", async (req, res, next) => {
  const { postsId } = req.params;
  const {inputPassword} = req.body;
  const {postsContent} = req.body;
  const post = await Posts.find({ postsId: Number(postsId) });
  console.log(post)
 
    if (Number(inputPassword) !== post.postsPassword) {
      res.json({ errorMessage: "번호가 다르다." });
      return;}
    
    if (post.length){
    await Posts
    .updateOne({"postsId":postsId, "postsPassword":inputPassword},{"$set": {postsContent}})
    res.json({"message": "게시글을 수정하였습니다."})}
    })
  
  // https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set


module.exports = router;