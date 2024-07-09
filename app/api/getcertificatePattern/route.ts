import { getGcsFile } from "@/lib/GetGcsFile";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename")?.toString();

  if (!filename) {
    return new Response(JSON.stringify({ message: "無法取的證書模板" }), {
      status: 400,
    });
  }

  try {
    const result = await getGcsFile(filename);

    if (!result) {
      return new Response(JSON.stringify({ message: "無法取的證書模板" }), {
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
