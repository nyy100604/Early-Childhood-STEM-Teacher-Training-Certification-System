import { Storage } from "@google-cloud/storage";
export const UploadToGcsForTeachingFile = async (
  file: File,
  filename: string
) => {
  const credentials = JSON.parse(
    process.env.GOOGLE_CLOUD_CREDENTIALS as string
  );

  if (!file) throw new Error("File is empty");

  const buffer = await file.arrayBuffer();

  const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    credentials,
  });

  await storage
    .bucket("teaching-file")
    .file(filename)
    .save(Buffer.from(buffer));
  return true;
};
