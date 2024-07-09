import Hero from "@/components/pages/Home/Hero";
import Introduction from "@/components/pages/Home/Introduction";
import BlockchainIntroduce from "@/components/pages/Home/BlockchainIntroduce";
import FunctionIntroduce from "@/components/pages/Home/FunctionIntroduce";
import Footer from "@/components/common/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <BlockchainIntroduce />
      <FunctionIntroduce />
      <Footer />
    </main>
  );
}
