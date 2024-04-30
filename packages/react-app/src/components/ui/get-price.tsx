import { type BaseError, useReadContract } from "wagmi";
import { MockNFTMarketplaceAbi } from "@/blockchain/abi/marketplaceAbi";

export const GetPrice = () => {
    const contractAdress = '0x16B4d20C21d0200CCc35b6082B39b30409B10A1e';

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