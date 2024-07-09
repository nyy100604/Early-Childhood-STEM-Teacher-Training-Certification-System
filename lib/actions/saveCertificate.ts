"use server";

import { mongodbConnect } from "@/MongoDb/connect";
import CerficateStatus from "@/MongoDb/schema/certificateStatusSchema";

export async function saveCertificateStatus(
  certificateId: string,
  teacherId: string,
  blockchain_url: string
) {
  try {
    await mongodbConnect();

    // Create and update a CertificateStatus
    await CerficateStatus.findOneAndUpdate(
      {
        certificate: certificateId,
        teacher: teacherId,
      },
      {
        verifyStatus: true,
        blockchainurl: blockchain_url,
      },
      {
        new: true,
      }
    );
    return { success: true, message: "Certificate status saved successfully" };
  } catch (error) {
    console.error("Error saving certificate status", error);
    return { success: false, message: "Internal Server Error" };
  }
}
