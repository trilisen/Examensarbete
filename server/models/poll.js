import mongoose from "mongoose"

const Schema = mongoose.Schema

const pollSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Poll", pollSchema)
