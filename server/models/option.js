import mongoose from "mongoose"

const Schema = mongoose.Schema

const optionSchema = new Schema({
  poll: {
    type: Schema.Types.ObjectId,
    ref: "Poll",
  },
  content: {
    type: String,
    trim: true,
  },
})

export default mongoose.model("Option", optionSchema)
