import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || "{}"),
});

export const GetGcsTeachingFile = async (filename: string) => {
  const bucketName = "teaching-file";
  const file = storage.bucket(bucketName).file(filename);
  const [exist] = await file.exists();
  if (!exist) {
    return false;
  } else {
    return file;
  }
};
