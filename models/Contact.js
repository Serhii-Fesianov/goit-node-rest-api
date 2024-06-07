import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export const Contact = model("contact", contactSchema);
