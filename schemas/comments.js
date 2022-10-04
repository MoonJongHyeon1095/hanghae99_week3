const mongoose = require("mongoose"); // 몽구스 라이브러리 가져오기

const commentsSchema = new mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
      },
      
      commentsName: {
        type: String,
        required: true
      },
      commentsContent: {
        type: String,
        required: true
      },
  
      commentsId: {
        type: mongoose.Schema.Types.ObjectId 
      }
}, { timestamps: true })

module.exports = mongoose.model("Comments", commentsSchema);