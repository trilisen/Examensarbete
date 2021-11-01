import mongoose from "mongoose"

const Schema = mongoose.Schema

const voteSchema = new Schema(
  {
    option: {
      type: Schema.Types.ObjectId,
      ref: "Option",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("Vote", voteSchema)
