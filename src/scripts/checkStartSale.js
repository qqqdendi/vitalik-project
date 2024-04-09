
import { ethers } from 'ethers'
import abi from '../utils/abi.json'
import getProvider from "./getProvider";
import { CONTRACT_ADDRESS } from '../App';

export const checkStartSale = async () => {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer)
    let isStarted = parseInt(await contract.startAt());
    const isWhitelisted = await contract.inWhiteList()
    const one_day = (60 * 60 * 24 * 1000);
    if (isStarted > 0) {
        if (isStarted+one_day > await provider.getBlockNumber() && isWhitelisted) {
            return 1
        } else if (isStarted+one_day < await provider.getBlockNumber()) {
            return 2
        } else {
            return 0
        }
    }
    else {
        return 0
    }
} 