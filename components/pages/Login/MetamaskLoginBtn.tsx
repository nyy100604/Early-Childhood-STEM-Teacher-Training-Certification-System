"use client";
import { BrowserProvider } from "ethers";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

// components
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const MetamaskLoginBtn = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const signVerifyMessage = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const message = "請簽署此段訊息登入系統";
    const signature = await signer.signMessage(message);
    return [message, signature] as const;
  };

  const handleIssuerLogin = async () => {
    if (window.ethereum) {
      // get wallet account
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const [message, signature] = await signVerifyMessage();
        await signIn("Metamask", { message, signature });
        setLoading(false);
      } catch {
        setLoading(false);
        toast({
          variant: "default",
          title: "失敗",
          description: "請 重 新 登 入 錢 包",
        });
      }
    } else {
      setLoading(false);
      toast({
        variant: "default",
        title: "失敗",
        description: "請 安 裝 錢 包",
      });
    }
  };

  return (
    <Button
      variant="default"
      className="bg-white text-secondary w-full mt-6 mb-6 shadow-xl"
      onClick={handleIssuerLogin}
    >
      {loading ? (
        <div className="flex items-center gap-x-3">
          <LoaderCircle className="animate-spin" />
          登入中
        </div>
      ) : (
        <div>發證者登入</div>
      )}
    </Button>
  );
};

export default MetamaskLoginBtn;
