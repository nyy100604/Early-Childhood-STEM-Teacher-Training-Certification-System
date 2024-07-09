"use client";
import { contractABI, contractAddress } from "@/Blockchain/data";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { saveCertificateStatus } from "@/lib/actions/saveCertificate";
import { useRouter } from "next/navigation";
import Link from "next/link";

// icon
import { Check, Upload, LoaderCircle } from "lucide-react";
// components
import { useToast } from "@/components/ui/use-toast";

type UploadBlockchainType = {
  verifyStatus: boolean;
  makeStatus: boolean;
  certificate_id: string;
  teacher_id: string;
  token_id: string;
  certificateurl: string;
  blockchainurl: string;
  recipient: string;
};

const UploadBlockchain: React.FC<UploadBlockchainType> = ({
  makeStatus,
  verifyStatus,
  certificate_id,
  teacher_id,
  token_id,
  certificateurl,
  blockchainurl,
  recipient,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  let providerRef = useRef<ethers.BrowserProvider | null>(null);
  let signerRef = useRef<ethers.Signer | null>(null);
  let contractRef = useRef<ethers.Contract | null>(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        providerRef.current = provider;
        console.log("reset provider");

        // Initialize the contract after provider is set
        await initializeContract(provider);
      } else {
        toast({
          title: "失敗",
          description: "請下載Metamask至瀏覽器",
        });
      }
    };

    const initializeContract = async (provider: ethers.BrowserProvider) => {
      if (provider) {
        const signer = await provider.getSigner();
        const newContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log("signer", signer);

        contractRef.current = newContract;
        signerRef.current = signer;

        console.log("Contract and signer initialized again");

        newContract.on("CertificateMinted", handleMintCertificate);
      }
    };

    initializeProvider();

    return () => {
      if (contractRef.current) {
        contractRef.current.removeAllListeners("CertificateMinted");
      }
    };
  }, [toast, router, contractAddress]);

  const handleMintCertificate = async (
    to: string,
    certificateId: string,
    tokenId: string
  ) => {
    console.log(
      "CertificateMinted event received",
      to,
      certificateId.toString(),
      tokenId.toString()
    );
  };

  const mintCertificate = async () => {
    if (!makeStatus) {
      toast({
        title: "失敗",
        description: "必須先製造證書，才可上傳至區塊鏈",
      });
      return;
    }

    const contract = contractRef.current;
    const signer = signerRef.current;
    console.log(recipient, certificateurl, token_id);
    console.log("contract", contract, "signer", signer);

    if (contract && signer) {
      try {
        const recipients = [recipient];
        const data = "0x";
        const cids = [certificateurl];
        const certificateId = token_id;
        // console.log(recipients, data, cids, certificateId);

        const tx = await contract.mintToMultipleUsers(
          certificateId,
          recipients,
          data,
          cids
        );

        setLoading(true);
        await tx.wait();
        const res = await saveCertificateStatus(
          certificate_id,
          teacher_id,
          `https://holesky.etherscan.io/tx/${tx.hash}`
        );
        setLoading(false);
        if (!res.success) {
          console.log("Error saving certificate status", res.message);
        } else {
          console.log("Certificate status saved successfully");
          router.refresh();
        }
        // console.log("tx", tx);
        console.log("Certificates minted successfully");
      } catch (e) {
        console.log(e);

        setLoading(false);
        toast({
          title: "失敗",
          description: "無法上傳至區塊鏈，請重新上傳",
        });
      }
    }
  };

  return (
    <>
      {verifyStatus ? (
        <Link href={blockchainurl}>
          {" "}
          <span className="flex gap-x-2 cursor-pointer">
            {" "}
            <Check size={20} className="text-green-600" />
            點選查看
          </span>
        </Link>
      ) : (
        <span className="flex gap-x-2 cursor-pointer" onClick={mintCertificate}>
          {loading ? (
            <div className="flex items-center gap-x-3">
              <LoaderCircle className="text-gray-500 animate-spin" size={20} />
              上傳中
            </div>
          ) : (
            <div className="flex items-center gap-x-3">
              <Upload className="text-gray-500 " size={20} />
              未上傳
            </div>
          )}
        </span>
      )}
    </>
  );
};

export default UploadBlockchain;
