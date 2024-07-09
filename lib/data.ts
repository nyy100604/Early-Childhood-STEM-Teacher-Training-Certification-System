import Certificate from "@/MongoDb/schema/certificateSchema";
import User from "@/MongoDb/schema/userSchema";
import cerficateStatus from "@/MongoDb/schema/certificateStatusSchema";
import TeachingInfo from "@/MongoDb/schema/teachingInfo";
import { mongodbConnect } from "@/MongoDb/connect";

// get all certificate
export const getAllCertificationInformation = async () => {
  await mongodbConnect();
  const data = await Certificate.find({}).lean();
  return JSON.parse(JSON.stringify(data));
};

// get certificate status by CertificateName and teacherName
export const getCertificateStatusByCertificateNameAndteacherName = async (
  certicatename: string,
  kingdergarten: string
) => {
  try {
    await mongodbConnect();
    const certificate = await Certificate.findOne({ certicatename });
    const teachers = await User.find({ kingdergarten });
    if (!certificate || teachers.length === 0) {
      console.log("certificate or teachers not found");

      return [];
    }

    const teachersIds: string[] = teachers.map((teacher) => teacher._id);

    const certificateStatuses = await cerficateStatus
      .find({
        certificate: certificate._id,
        teacher: { $in: teachersIds },
      })
      .populate("certificate")
      .populate("teacher");

    return JSON.parse(JSON.stringify(certificateStatuses));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get verifid certificate
export const getVerfiedCertificateStatus = async () => {
  await mongodbConnect();
  const data = await cerficateStatus.find({
    makeStatus: true,
    verifyStatus: true,
  });
  return JSON.parse(JSON.stringify(data));
};

// get verifid certificate by teacherId
export const getVerfiedCertificateStatusByteacherId = async (
  teacherId: string
) => {
  await mongodbConnect();
  const data = await cerficateStatus
    .find({
      teacher: teacherId,
      makeStatus: true,
      verifyStatus: true,
    })
    .populate("certificate")
    .populate("teacher");
  return JSON.parse(JSON.stringify(data));
};

// get teacher's teaching information
export const getTeacherTeachingInfo = async (teacher_Id: string) => {
  await mongodbConnect();
  const data = await TeachingInfo.findOne({ teacher: teacher_Id });
  if (!data) {
    return [];
  }
  return JSON.parse(JSON.stringify(data));
};
