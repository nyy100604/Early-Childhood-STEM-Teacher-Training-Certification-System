import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, // 使用環境變量設置項目 ID
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_CREDENTIALS || "{}"),
});

export const getGcsFile = async (filename: string) => {
  const bucketName = "certificate_file";
  const file = storage.bucket(bucketName).file(filename);
  const [exist] = await file.exists();
  if (!exist) {
    return false;
  } else {
    return file;
  }
};
