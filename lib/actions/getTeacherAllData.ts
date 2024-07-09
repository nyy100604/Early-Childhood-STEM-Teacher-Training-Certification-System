"use server";
import User from "@/MongoDb/schema/userSchema";
import CertificateStatus from "@/MongoDb/schema/certificateStatusSchema";
import TeachingInfo from "@/MongoDb/schema/teachingInfo";
import { mongodbConnect } from "@/MongoDb/connect";

export const getCertificateStatusAndTeachingProfileByUserInfo = async (
  username: string,
  email: string,
  position: string
) => {
  try {
    await mongodbConnect();
    const user = await User.findOne({
      email,
      username,
      kingdergarten: position,
    });

    const teacherInfo = await TeachingInfo.findOne({ teacher: user._id });

    const certificateStatus = await CertificateStatus.find({
      teacher: user._id,
      verifyStatus: true,
      makeStatus: true,
    })
      .populate("certificate")
      .populate("teacher");
    // console.log(teacherInfo, certificateStatus);
    if (teacherInfo || certificateStatus) {
      return JSON.parse(
        JSON.stringify({
          teacherInfo,
          certificateStatus,
        })
      );
    } else {
      return false;
    }
  } catch (e) {
    console.log("Occur some error");
    return false;
  }
};

export const getTeacherInfoByTeacherId = async (id: string) => {
  console.log("id", id);

  try {
    await mongodbConnect();
    const result = await TeachingInfo.findOne({ teacher: id });
    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
