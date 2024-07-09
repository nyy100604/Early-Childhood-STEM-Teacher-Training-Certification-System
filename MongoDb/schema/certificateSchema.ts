import { Document, Schema, model, models } from "mongoose";

interface ICertificate extends Document {
  certicatename: string;
  coursecontent: string;
  coursename: string;
  coursestandard: string;
  image: string;
  pattern: string;
  purposeOfcerticate: string;
  teachers: Array<Schema.Types.ObjectId>;
}

const certificateSchema: Schema<ICertificate> = new Schema<ICertificate>({
  certicatename: { type: String, required: true },
  coursecontent: { type: String, required: true },
  coursename: { type: String, required: true },
  coursestandard: { type: String, required: true },
  image: { type: String, required: true },
  pattern: { type: String, required: true },
  purposeOfcerticate: { type: String, required: true },
  teachers: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
});

export default models?.Certificate ||
  model<ICertificate>("Certificate", certificateSchema);
