"use client";

import { MockNFTMarketplaceAbi } from "@/blockchain/abi/marketplaceAbi"
import Image from "next/image"
import React, { useState } from "react"
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi"


export function PurchaseNft() {

    const contractAddress = '0x16B4d20C21d0200CCc35b6082B39b30409B10A1e'

    const { data: isAvailable, error: isAvailableError, isPending: isAvailablePending } = useReadContract({
        address: contractAddress,
        abi: MockNFTMarketplaceAbi,
        functionName: 'available',
        args: [BigInt(1)],
    })

    const { data: hash, isPending, error, writeContract } = useWriteContract()

    async function purchaseNFT(tokenId: number) {
        writeContract({
            address: contractAddress,
            abi: MockNFTMarketplaceAbi,
            functionName: 'purchase',
            args: [BigInt(tokenId)],
        })
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const nftUrls = [
        '/nfts/nft-1.jpeg',
        // '/nfts/nft-2.jpeg',
        // '/nfts/nft-3.jpeg',
        // '/nfts/nft-4.jpeg',
        // '/nfts/nft-5.jpeg',
        // '/nfts/nft-6.jpeg'
    ]

    return (
        <div>
            {isConfirming && <div>Waiting for confirmation..</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && <div>Error: {error.message}</div>}

            {/* <div className="grid grid-cols-3 gap-4 gap-y-8 mt-3"> */}
                <div className="mt-3">
                {
                    nftUrls.map((url, index) => (
                        <div className="flex flex-col space-y-2">
                            <Image className="rounded-md" key={index} src={url} alt="NFT" width={192} height={256} />
                            <button disabled={!isAvailable} type="submit" className={`bg-blue-500 hover:bg-blue-700 text-white p-2 rounded ${isAvailable ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-500'}`}
                                onClick={() => {
                                    purchaseNFT(index + 1);
                                }}
                            >
                                {!isAvailable ? 'Purchased' : 'Purchase'}

                            </button>
                        </div>

                    ))

                }
            </div>
        </div>
    )
}
