const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

exports.ChatModel = mongoose.model('Chat', ChatSchema);
