import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// full name
formSchema.virtual("fullName").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

formSchema.set("toJSON", { virtuals: true });
formSchema.set("toObject", { virtuals: true });

export default mongoose.model("data", formSchema);
