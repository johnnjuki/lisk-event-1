import { type BaseError, useReadContract } from "wagmi";
import { MockNFTMarketplaceAbi } from "@/blockchain/abi/marketplaceAbi";

export const GetPrice = () => {
    const contractAdress = '0x8Ca2A1E049D63a08a058fc996F97698Ed54d9242';

    const {data: price, error, isPending} = useReadContract({
        address: contractAdress,
        abi: MockNFTMarketplaceAbi,
        functionName: 'getPrice',
    })

    if (isPending) return <div>Loading...</div>
    if (error) 
        return ( 
          <div> 
            Error: {error.message} 
          </div> 
        ) 

    return (
        <div>
            Price: {price?.toString()}
        </div>
    )
}