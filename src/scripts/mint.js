import { ethers } from 'ethers'
import { CONTRACT_ADDRESS } from '../App';
import { checkStartSale } from './checkStartSale';
import abi from '../utils/abi.json'
import getProvider from "./getProvider";


export async function mint(res){
    try{
        const provider = await getProvider()
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi.abi, signer)
        const one_day = (60 * 60 * 24 * 1000); //Поменять для тестов
        let isStarted = await checkStartSale()
        //console.log(await contract.getBlock())
        //Для проверки начались продажи или нет можно использовать isStarted. Если > 0, то нужен минт модалка. Если нет, то заглушка
        if(isStarted>0) {
            if (isStarted+one_day > await provider.getBlockNumber()) {
                const isWhitelisted = await contract.inWhiteList()
                let WLprice = await contract.wlPrice()
                let WLpriceF = parseInt(WLprice)/(10 ** 18)
                if (isWhitelisted) {
                    let cost = WLpriceF * res.ntf
                    const tx = await contract.whiteListMint(res.ntf, override(cost))
                    await tx.wait()
                    console.log(tx)
            } else if (isStarted+one_day < await provider.getBlockNumber()) {
                const isWhitelisted = await contract.inWhiteList()
                let WLprice = await contract.wlPrice()
                let WLpriceF = parseInt(WLprice)/(10 ** 18)
                let price = await contract.price()
                let priceF = parseInt(price)/(10 ** 18)
                if (isWhitelisted) {
                    let cost = WLpriceF * res.ntf
                    const tx = await contract.whiteListMint(res.ntf, override(cost))
                    await tx.wait()
                    console.log(tx)
                } else {
                    let cost = priceF * res.ntf
                    const tx = await contract.mint(res.ntf, override(cost))
                    await tx.wait()
                    console.log(tx)
                }
            }

            function override(cost) {
                const overrides = {
                    from: signer.getAddress(),
                    gasLimit: ethers.utils.hexlify(6000000),
                    value: ethers.utils.parseEther(cost.toString()),
                    nonce: provider.getTransactionCount(signer.getAddress())
                }
                    return overrides
                }
            }
        }
    }
    catch (e) {
        if(e.code === 4001){ // user denied transaction
            console.log(e)
        } else if (e.code === 32000){
            console.log("Public sales hasn't start")
        } 
    }
}

//  open enough coil praise enemy stuff fault ugly zero parrot device syrup