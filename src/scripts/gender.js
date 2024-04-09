import { ethers } from 'ethers'
import abi from '../utils/abi.json'
import getProvider from './getProvider'


export const getContract = async() => {
    const contractAddress = '0xF19ac623eEaB1c7910A58C4A3145f4Ee7515e9bE'//main

    const provider = await getProvider()

    const signer = await provider.getSigner()

    const contract = new ethers.Contract(contractAddress, abi.abi, signer)

    const overrides = {
        from: signer.getAddress(),
        gasLimit: ethers.utils.hexlify(6000000),
        nonce: provider.getTransactionCount(signer.getAddress())
    }

    return {
        signer : signer,
        contract : contract,
        overrides : overrides
    }
}

export async function getGender(){
        try {

            const {signer, contract, overrides} = await getContract();

            const tx = await contract.balanceOf(await signer.getAddress())

            const balance = parseInt(tx._hex)

            let tokensId = []
            let res = []
            for (let i = 0; i < balance; i++) {
                const token = await contract.tokenOfOwnerByIndex(signer.getAddress(), i)
                res.push({
                    token: parseInt(token),
                    female: await contract.nftGender(parseInt(token))
                })
            }
            console.log(res)
            return res
        }
        catch (e) {
            console.log(e)
            return []
        }
    }

    