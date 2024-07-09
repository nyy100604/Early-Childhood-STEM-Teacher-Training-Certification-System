import { GetGcsTeachingFile } from "@/lib/GetGcsTeachingFile";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename")?.toString();
  // console.log("filename", filename);

  if (!filename) {
    return new Response(JSON.stringify({ message: "無法取得教學檔案" }), {
      status: 400,
    });
  }

  try {
    const result = await GetGcsTeachingFile(filename);

    if (!result) {
      return new Response(JSON.stringify({ message: "無法取的教學檔案" }), {
        status: 404,
      });
    }

    const stream = result.createReadStream();

    return new Response(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error: any) {
    return Response.json(
      { message: `Error getting file:${error.message}` },
      { status: 500 } //the http status code is 500(Internal Server Error)
    );
  }
};
