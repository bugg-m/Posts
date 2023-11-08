import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter the title of your Post"],
    minLength: [4, "Title must be atleast 4 characters long"],
    maxLength: [80, "Title must be within 80 characters"],
  },
  description: {
    type: String,
    required: [true, "Please write something about your Post"],
    minLength: [10, "Description must be atleast 10 characters long"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
      },
      comment: {
        type: String,
        // required: true,
      },
    },
  ],

  shared: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
});

export const postModel = mongoose.model("PostData", postSchema);
