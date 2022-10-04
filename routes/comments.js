const express = require('express'); 
//const { default: test } = require('node:test'); <--이게 뭐임?? 언제 생김?? 왜 얘 떄문에 안돌아감??
const router = express.Router();

const Comments = require("../schemas/comments");  


/** 배포환경 확인
 * POST 댓글입력
 *  
 */
router.post("/comments/:postsId", async (req, res) => {
	const postsId = req.params.postsId;  
	const {commentsName, commentsContent} = req.body; // 구조분해할당
	

	if (String(commentsContent).length == 0) {
	  return res.json({ "errorMessage": "댓글 내용을 입력해주세요." });
	}
  
	const createdComment = await Comments.create({ postsId, commentsName, commentsContent})
	
	res.status(201).json({ comments: createdComment, message: '댓글을 생성하였습니다.'});
});

/** 배포환경 확인
 * GET 댓글 목록
 * 작성날짜 내림차순 정렬
 */
router.get("/comments/:postsId", async (req, res) => {
	const { postsId } = req.params;
	const comments = await Comments.find({ postsId: Number(postsId) })
	.select({'commentsName':1, 'commentsContent':1, 'createdAt':1})
	.sort({"createdAt" : "desc"})

	res.json( {list : comments})
});
 
/** 배포환경확인
 * DELETE 
 * 댓글 삭제
 */
router.delete("/comments/:commentsId", async (req, res) => {
	const commentsId = req.params.commentsId;
	await Comments.find({ "_id" : commentsId })
			.deleteOne({ "_id" : commentsId });
	
	res.json({ "message": "댓글을을 삭제하였습니다."});
  });


/**
 * PUT 배포환경 확인
 * 댓글수정
 */
router.put("/comments/:commentsId", async (req, res) => {
	const commentsId = req.params.commentsId;
	const {commentsContent} = req.body;
  
	if (String(commentsContent).length == 0) {
		return res.json({ "message": "댓글 내용을 입력해주세요." });
	}
	
	else{
		const tryEdit = await Comments.updateOne({ "_id": commentsId },{"$set":{"commentsContent":commentsContent}})
	  	return res.json({"message": "댓글을 수정하였습니다."})
	} 
});

module.exports = router;
