import { mongodbConnect } from "@/MongoDb/connect";
import { UploadToGcs } from "@/lib/UploadToGcs";
import Certificate from "@/MongoDb/schema/certificateSchema";

export async function POST(req: Request) {
  const formData = await req.formData();

  const imagefile = formData.get("image") as File;
  const patternfile = formData.get("pattern") as File;
  const certificatename = formData.get("certicatename");

  const imagefilename = `${certificatename}_png`;
  const pdffilename = `${certificatename}_pdf`;

  try {
    const uploadImage = await UploadToGcs(imagefile, imagefilename);
    const uploadPattern = await UploadToGcs(patternfile, pdffilename);
    await mongodbConnect();

    if (uploadImage && uploadPattern) {
      const data = {
        certicatename: formData.get("certicatename"),
        coursecontent: formData.get("coursecontent"),
        coursename: formData.get("coursename"),
        coursestandard: formData.get("coursestandard"),
        purposeOfcerticate: formData.get("purposeOfcerticate"),
        image: imagefilename,
        pattern: pdffilename,
        teachers: [],
      };
      const certificate = new Certificate(data);
      await certificate.save();
      return new Response(JSON.stringify({ message: "證書建立成功" }), {
        status: 200,
      });
    }
  } catch (e) {
    console.log(e);

    return new Response(JSON.stringify({ message: "證書上傳失敗" }), {
      status: 400,
    });
  }
}
