import { Document, Schema, model, models, Model } from "mongoose";

interface ITeachingInfo extends Document {
  teacher: Schema.Types.ObjectId;
  teachingExperience: string;
  professionalSkills: string;
  teachingPhilosophy: string;
  downloadableTeachingResources: string;
  contactInformation: string;
}

// define Schema
const TeachingInfoSchema = new Schema<ITeachingInfo>(
  {
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teachingExperience: { type: String, required: true },
    professionalSkills: { type: String, required: true },
    teachingPhilosophy: { type: String, required: true },
    downloadableTeachingResources: { type: String, required: true },
    contactInformation: { type: String, required: true },
  },
  { timestamps: true }
);

const TeachingInfo: Model<ITeachingInfo> =
  models.TeachingInfo ||
  model<ITeachingInfo>("TeachingInfo", TeachingInfoSchema);

export default TeachingInfo;
