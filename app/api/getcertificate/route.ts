import { getGcsFile } from "@/lib/GetGcsFile";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename")?.toString();
  console.log("filename", filename);

  if (!filename) {
    return new Response(JSON.stringify({ message: "無法取的證書圖片" }), {
      status: 400,
    });
  }

  try {
    const result = await getGcsFile(filename);
    // console.log(result);

    if (!result) {
      return new Response(JSON.stringify({ message: "無法取的證書圖片" }), {
        status: 404,
      });
    }

    const stream = result.createReadStream();

    const response = new Response(stream as any);
    return response;
  } catch (error: any) {
    console.error("Error getting file:", error); // 捕獲錯誤並記錄錯誤信息
    return Response.json(
      { message: `Error getting file: ${error.message}` }, // 返回 JSON 格式的錯誤信息
      { status: 500 } // 設置 HTTP 狀態碼為 500 (Internal Server Error)
    );
  }
};
