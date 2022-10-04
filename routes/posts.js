const express = require('express'); 
// const { default: test } = require('node:test'); <-- 이게 뭘까? 왜 생겼을까?
const router = express.Router();

const Posts = require("../schemas/posts");  

    
/** 
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

 /** 
  *  GET 게시글 상세조회
  *  제목, 이름, 글내용, 날짜
  */
router.get('/posts/:postsId', async (req,res)=> { 
  const {postsId} = req.params;
  // const postsId = req.params.postsId 
  // 위와 같다. //걍 구조분해 할당으로 해본 것.
  
  const detail = await Posts.find({postsId:postsId}).select({
    "postsTitle":1, "postName":1, "postContent":1, "createdAt":1
  })
  
  res.status(203).json({detailPage:detail})
  })


/**
 * POST 게시글 작성
 * 제목, 이름, 비밀번호, 글내용
 *  */ 

//async를 굳이 넣어야 하는 이유는?
router.post("/posts", async (req, res) => {  
  const { postsId, postsName, postsPassword, postsTitle, postsContent} = req.body; // 구조분해할당

  const createdPosts = await Posts.create({ postsId, postsName, postsPassword, postsTitle, postsContent });
  console.log(createdPosts)
  
  res.status(201).json({ posts: createdPosts, message: '게시글을 생성하였습니다.'});
});

/**
 * DELETE
 * 비밀번호 일치시 게시글 삭제
 *  */ 
router.delete("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;
  const post = await Posts.find({ postsId: Number(postsId) });
  const {inputPassword} = req.body;

  if (inputPassword !== post.postsPassword) {
    res.json({ errorMessage: "번호가 다르다." });
  return;
}

  if (inputPassword == post.postsPassword) {
  await Posts.deleteOne({ postsId });
}
  
  res.json({ "message": "게시글을 삭제하였습니다."});
});


/**
 * PUT
 * 게시글 수정, 비밀번호 검사
 */
 //const post = await Posts.find({ postsId: Number(postsId) });
router.put("/posts/:postsId", async (req, res, next) => {
  const { postsId } = req.params;
  const {inputPassword} = req.body;
  const {postsContent} = req.body;

  await Posts.updateOne({"postsId":postsId, "password":inputPassword},
  {"$set": postsContent})
  .exec((err, resolve)=>{
    if(err){
      return next(err);
    }
    if (resolve.modifiedCount ===0){
      return res.json({"message":"비밀번호가 틀렸다."})
    }
  })
 
  res.json({"message": "게시글을 수정하였습니다."})})

  // https://www.mongodb.com/docs/manual/reference/operator/update/set/#mongodb-update-up.-set


module.exports = router;