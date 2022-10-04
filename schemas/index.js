const mongoose = require("mongoose"); // 몽구스 라이브러리 가져오기

const connect = () => {
  mongoose
    .connect("mongodb://test:test@13.125.81.242:27017", { useNewUrlParser: true }) 
    .catch(err => console.log(err)); // 에러가 발생하면 콘솔에 에러 찍어줘
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;