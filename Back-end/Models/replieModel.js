const mongoose = require("mongoose");
const { Schema } = mongoose;
const ReplieSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      require: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
const Replie = mongoose.model("Replie", ReplieSchema);
module.exports = Replie;
