import { mongodbConnect } from "@/MongoDb/connect";
import { UploadToGcsForTeachingFile } from "@/lib/uploadToGcsForTeachingFile";
import TeachingInfo from "@/MongoDb/schema/teachingInfo";

export async function POST(req: Request) {
  const formData = await req.formData();

  const teachingExperience = formData.get("teachingExperience");
  const professionalSkills = formData.get("professionalSkills");
  const teachingPhilosophy = formData.get("teachingPhilosophy");
  const contactInformation = formData.get("contactInformation");
  const downloadableTeachingResources = formData.get(
    "downloadableTeachingResources"
  ) as File;
  const _id = formData.get("_id");
  const teacherName = formData.get("teacher");

  const filename = `${teacherName}_file`;
  //   console.log(
  //     teachingExperience,
  //     professionalSkills,
  //     teachingPhilosophy,
  //     contactInformation,
  //     _id,
  //     teacherName
  //   );
  const uploadTeachingFile = await UploadToGcsForTeachingFile(
    downloadableTeachingResources,
    filename
  );

  await mongodbConnect();

  if (uploadTeachingFile) {
    try {
      const teachingInfo = new TeachingInfo({
        teacher: _id,
        teachingExperience,
        professionalSkills,
        teachingPhilosophy,
        downloadableTeachingResources: filename,
        contactInformation,
      });

      await teachingInfo.save();
      return new Response(JSON.stringify({ message: "資料上傳成功" }), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: "資料上傳失敗" }), {
        status: 400,
      });
    }
  }
}
