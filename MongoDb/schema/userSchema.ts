import { Document, Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  kingdergarten: string;
  role: "發證者" | "教師";
  address: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isIssuer(): boolean;
  isTeacher(): boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  kingdergarten: { type: String, required: true },
  address: { type: String, required: false },
  role: { type: String, enum: ["發證者", "教師"], required: true },
});

// compare password
userSchema.method(
  "comparePassword",
  async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
);

// verify that issuer wallet is specific address or not
userSchema.method("isIssuerAddress", function () {
  return this.address === "0x54d160a7AeC0bAdDa0CF718b9989Dfff5f6f6f8C";
});

// verify that user is Issuer or not
userSchema.method("isIssuer", function () {
  return this.role === "發證者";
});

// verify that user is Teacher or not
userSchema.method("isTeacher", function () {
  return this.role === "教師";
});

// hash password before save data
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export default models?.User || model<IUser>("User", userSchema);
