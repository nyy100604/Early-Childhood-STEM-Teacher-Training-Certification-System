import { mongodbConnect } from "@/MongoDb/connect";
import User from "../../../MongoDb/schema/userSchema";
import Certificate from "../../../MongoDb/schema/certificateSchema";
import { ethers } from "ethers";
export async function POST(request: Request) {
  const data = await request.json();
  let { username, email, password, kindergartenName, usertype } = data;

  try {
    await mongodbConnect();
    console.log("connect to mongodb successfully!");

    const existEmail = await User.findOne({ email });

    if (existEmail) {
      return new Response(JSON.stringify({ message: "電子信箱已註冊！" }), {
        status: 400,
      });
    }
    const { address } = ethers.Wallet.createRandom();
    const user = new User({
      username,
      email,
      password,
      kingdergarten: kindergartenName,
      role: usertype,
      address,
    });
    // save signup data
    try {
      await user.save();
      console.log("stored user's signup data successfully!!");
      return new Response(JSON.stringify({ message: "註 冊 成 功！" }), {
        status: 200,
      });
    } catch (e) {
      console.log(e);
      return new Response(JSON.stringify({ message: "註 冊 失 敗！" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ message: "cannot connect to mongoDb" }),
      {
        status: 400,
      }
    );
  }
}
