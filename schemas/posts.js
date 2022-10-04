const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    postsId: {
        type: Number,
        required: true,
        unique : true
      },
      postsName: {
        type: String,
        required: true
      },
      postsPassword: {
        type: Number,
        required: true
      },
      postsTitle: {
        type: String,
        required: true
      },
      postsContent: {
        type: String,
        required: true
      }
    },{ timestamps: true })

module.exports = mongoose.model("Posts", postsSchema);