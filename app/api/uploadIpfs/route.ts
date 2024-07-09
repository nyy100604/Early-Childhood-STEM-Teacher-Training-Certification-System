import { getGcsFile } from "@/lib/GetGcsFile"; // 引入從 Google Cloud Storage 獲取文件的函數
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"; // 引入 pdf-lib 庫
import fontkit from "@pdf-lib/fontkit"; // 引入 fontkit 用於嵌入自定義字體
import path from "path"; // 引入 path 模組用於處理文件路徑
import fs from "fs/promises"; // 從 fs/promises 引入文件系統模組，用於讀取文件
import { mongodbConnect } from "@/MongoDb/connect";
import CerficateStatus from "@/MongoDb/schema/certificateStatusSchema";

export async function POST(req: Request) {
  try {
    // 解析請求中的 JSON 數據
    const data = await req.json();
    const { username, certificatename, certificateid, teacherid } = data;

    // 從 GCS 獲取證書文件
    const certificatefile = await getGcsFile(`${certificatename}_pdf`);
    if (!certificatefile) {
      return new Response(
        JSON.stringify({ message: "Certificate file not found" }),
        { status: 404 }
      );
    }

    // 將 Stream 轉換為 ArrayBuffer 的輔助函數
    const streamToArrayBuffer = async (stream: any) => {
      const chunks = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks).buffer;
    };

    // 讀取文件流並轉換為 ArrayBuffer
    const readStream = certificatefile.createReadStream();
    const arrayBuffer = await streamToArrayBuffer(readStream);

    // 加載 PDF 文件
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // 嵌入標準 Times Roman 字體
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    // 註冊 fontkit
    pdfDoc.registerFontkit(fontkit);

    // 註冊 fontkit
    pdfDoc.registerFontkit(fontkit);

    // 加載自定義字體
    const fontPath = path.join(
      process.cwd(),
      "public/fonts/NotoSansHK-VariableFont_wght.ttf"
    );
    const fontBytes = await fs.readFile(fontPath); // 讀取字體文件
    const customFont = await pdfDoc.embedFont(fontBytes); // 嵌入自定義字體
    const pages = pdfDoc.getPages(); // 獲取 PDF 中的所有頁面
    const firstPage = pages[0]; // 獲取第一頁

    // 自動生成日期和證書編號
    const date = new Date().toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const certificateNumber = `CERT-${date}`; // 生成唯一的證書編號

    // 添加名字到 PDF
    firstPage.drawText(username, {
      x: 380,
      y: 275,
      size: 18,
      font: customFont,
      color: rgb(0, 0, 0),
    });

    // 添加證書編號到 PDF
    firstPage.drawText(certificateNumber, {
      x: 541,
      y: 275,
      size: 16,
      font: timesRomanFont,
      color: rgb(1, 0, 0),
    });

    // 保存修改後的 PDF 文件並轉換為 Buffer
    const modifiedPdfBytes = await pdfDoc.save();
    const modifiedPdfBuffer = Buffer.from(modifiedPdfBytes);

    // console.log(data);
    // 使用 FormData 將生成的 PDF 上傳到 Pinata 的 IPFS
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([modifiedPdfBuffer], { type: "application/pdf" })
    );
    formData.append(
      "pinataMetadata",
      JSON.stringify({ name: "upload to certificate" })
    );
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });

    const { IpfsHash } = await res.json();
    console.log("IpfsHash", IpfsHash);
    await mongodbConnect();
    await CerficateStatus.findOneAndUpdate(
      {
        certificate: certificateid,
        teacher: teacherid,
      },
      {
        certificateurl: `https://yellow-secondary-blackbird-515.mypinata.cloud/ipfs/${IpfsHash}`,
        makeStatus: true,
      },
      { new: true }
    );

    return Response.json({ IpfsHash }, { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
