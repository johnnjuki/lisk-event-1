import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { GetPrice } from "@/components/ui/get-price";
import { PurchaseNft } from "@/components/ui/purchase";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
      setIsMounted(true);
  }, []);

  useEffect(() => {
      if (isConnected && address) {
          setUserAddress(address);
      }
  }, [address, isConnected]);

  if (!isMounted) {
      return null;
  }

  if (!isConnected) {
    return <div>Connect your wallet</div>
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 px-4">
       <GetPrice />
       <PurchaseNft />
    </div>
  );
}
