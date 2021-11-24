const Web3 = require('web3');
require('dotenv').config();
const storeAbi = require('../build/contracts/Store.json').abi;
const tokenAbi = require('../build/contracts/Token.json').abi;
const storeAddress = require('../build/contracts/Store.json').networks["111121"].address;
const tokenAddress = require('../build/contracts/Token.json').networks["111121"].address;

const web3 = new Web3(process.env.HOST);

(async () => {
    // const storeContract = new web3.eth.Contract(storeAbi, storeAddress);
    // const transEncodeAbi = storeContract.methods.setValue("banana").encodeABI()
    //
    // const gasLimit = await web3.eth.estimateGas({
    //     from: process.env.ADDRESS,
    //     to: storeAddress,
    //     value: '0',
    //     data: transEncodeAbi
    // })
    //
    // const gasPrice = await web3.eth.getGasPrice()
    //
    // const tx = {
    //     from: process.env.ADDRESS,
    //     to: storeAddress,
    //     value: 0,
    //     gasPrice: gasPrice,
    //     gas: gasLimit,
    //     data: transEncodeAbi
    // }
    // const signed = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY)
    // const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    // console.log('receipt: ', receipt)
    //
    // const newValue = await storeContract.methods.value().call({from: process.env.ADDRESS})
    // console.log('newValue: ', newValue)


    console.log('tokenAddress: ', tokenAddress)
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    const ownerBalance = await tokenContract.methods.balanceOf(process.env.ADDRESS).call({from: process.env.ADDRESS});
    console.log('ownerBalance: ', ownerBalance)
    // const contractBalance = await tokenContract.methods.balanceOf(tokenAddress).call({from: process.env.ADDRESS});
    // console.log('contractBalance: ', contractBalance)
    //
    const transEncodeAbi2 = tokenContract.methods.transfer(tokenAddress, 10).encodeABI()
    const gasLimit2 = await web3.eth.estimateGas({
        from: process.env.ADDRESS,
        to: tokenAddress,
        value: '0',
        data: transEncodeAbi2
    })

    const gasPrice2 = await web3.eth.getGasPrice()

    const currentNonce = await web3.eth.getTransactionCount(process.env.ADDRESS)
    // let counting = 0;
    // let arr = [];
    // for(let i = 0; i < 1; i++) {
        const tx2 = {
            from: process.env.ADDRESS,
            to: tokenAddress,
            value: 0,
            gasPrice: gasPrice2,
            gas: gasLimit2,
            data: transEncodeAbi2,
            nonce: currentNonce
        }
        console.log('tx2: ', tx2)
        const signed2 = await web3.eth.accounts.signTransaction(tx2, process.env.PRIVATE_KEY)
    console.log('signed2: ', signed2)
        // arr.push(web3.eth.sendSignedTransaction(signed2.rawTransaction))
    // }

    // const r = await Promise.all(arr)
    // console.log(r)
    const receipt2 = await web3.eth.sendSignedTransaction(signed2.rawTransaction)
    console.log('receipt2: ', receipt2)
    //
    //
    // const contractBalance2 = await tokenContract.methods.balanceOf(tokenAddress).call({from: process.env.ADDRESS});
    // console.log('contractBalance2: ', contractBalance2)
})()
// 0xa9059cbb000000000000000000000000fa285e7d910a22e5589146f7c8e430a46647e6a3000000000000000000000000000000000000000000000000000000000000000a
// 4294967295
