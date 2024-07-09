import { Document, Schema, model, models } from "mongoose";

interface ICertificateStatus extends Document {
  certificate: Schema.Types.ObjectId;
  teacher: Schema.Types.ObjectId;
  makeStatus: boolean;
  verifyStatus: boolean;
  certificateurl: string;
  blockchainurl: string;
  updatedAt: Date;
}

const certificateStatusSchema: Schema<ICertificateStatus> =
  new Schema<ICertificateStatus>(
    {
      certificate: {
        type: Schema.Types.ObjectId,
        ref: "Certificate",
        required: true,
      },
      teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
      makeStatus: { type: Boolean, default: false, required: true },
      verifyStatus: {
        type: Boolean,
        default: false,
        required: true,
      },
      certificateurl: {
        type: String,
        default: "",
        required: false,
      },
      blockchainurl: {
        type: String,
        default: "",
        required: false,
      },
    },
    {
      timestamps: { updatedAt: true },
    }
  );

export default models?.CertificateStatus ||
  model<ICertificateStatus>("CertificateStatus", certificateStatusSchema);
