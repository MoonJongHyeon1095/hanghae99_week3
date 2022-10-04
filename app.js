const express = require('express');
const app = express();
const port = 3000;

//index.js에서 보낸 mongoose connect
const connect = require("./schemas");
connect();

//ejs 
app.set('view engine', 'ejs');

//body-parser Middleware //이게 라우터 객체(라는 표현이 맞는지도 모르겠다) 미들웨어 위에 와야하는 이유는?
app.use(express.json()) 


//routes
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
app.use([postsRouter, commentsRouter]);

//GET 
app.get('/', (req, res) => {

    res.send('홈입니다.')
})

// app.get('/posts', function(req, res) { 
//     res.sendFile(__dirname +'posts')
//   });

// //GET 게시글목록조회
// app.get("/list", function(req, res) { 
//   res.render('list', {posts : 결과}); 
// });
// // './views/list.ejs' 라고 경로를 쓸 필요가 없다고? //기본경로라는게 있단다. 



app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });