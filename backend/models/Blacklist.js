import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
});

export const Blacklist = mongoose.model("Blacklist", BlacklistSchema);
