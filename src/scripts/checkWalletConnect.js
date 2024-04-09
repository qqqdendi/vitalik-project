
import { ethers } from 'ethers';
import getProvider from './getProvider';


export const checkWalletConnect = async () => {

    try {
        const provider = await getProvider()
        const signer = await provider.getSigner()
        await signer.getAddress()
        return true

    } catch (e) {
        return false
    }
}