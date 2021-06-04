const Web3 = require('web3');
require('dotenv').config();
const storeAbi = require('../build/contracts/Store.json').abi;
const tokenAbi = require('../build/contracts/Token.json').abi;

const web3 = new Web3('http://127.0.0.1:9933');

(async () => {
    const storeContract = new web3.eth.Contract(storeAbi, process.env.STORE_ADDRESS);
    const transEncodeAbi = storeContract.methods.setValue("banana").encodeABI()

    const gasLimit = await web3.eth.estimateGas({
        from: process.env.ADDRESS,
        to: process.env.STORE_ADDRESS,
        value: '0',
        data: transEncodeAbi
    })

    const gasPrice = await web3.eth.getGasPrice()

    const tx = {
        from: process.env.ADDRESS,
        to: process.env.STORE_ADDRESS,
        value: 0,
        gasPrice: gasPrice,
        gas: gasLimit,
        data: transEncodeAbi
    }
    const signed = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY)
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    console.log('receipt: ', receipt)

    const newValue = await storeContract.methods.value().call({from: process.env.ADDRESS})
    console.log('newValue: ', newValue)



    const tokenContract = new web3.eth.Contract(tokenAbi, process.env.TOKEN_ADDRESS);
    const ownerBalance = await tokenContract.methods.balanceOf(process.env.ADDRESS).call({from: process.env.ADDRESS});
    console.log('ownerBalance: ', ownerBalance)
    const contractBalance = await tokenContract.methods.balanceOf(process.env.TOKEN_ADDRESS).call({from: process.env.ADDRESS});
    console.log('contractBalance: ', contractBalance)

    const transEncodeAbi2 = tokenContract.methods.transfer(process.env.TOKEN_ADDRESS, 1000000).encodeABI()

    const gasLimit2 = await web3.eth.estimateGas({
        from: process.env.ADDRESS,
        to: process.env.TOKEN_ADDRESS,
        value: '0',
        data: transEncodeAbi2
    })

    const gasPrice2 = await web3.eth.getGasPrice()

    const tx2 = {
        from: process.env.ADDRESS,
        to: process.env.TOKEN_ADDRESS,
        value: 0,
        gasPrice: gasPrice2,
        gas: gasLimit2,
        data: transEncodeAbi2
    }
    const signed2 = await web3.eth.accounts.signTransaction(tx2, process.env.PRIVATE_KEY)
    const receipt2 = await web3.eth.sendSignedTransaction(signed2.rawTransaction)
    console.log('receipt2: ', receipt2)


    const contractBalance2 = await tokenContract.methods.balanceOf(process.env.TOKEN_ADDRESS).call({from: process.env.ADDRESS});
    console.log('contractBalance2: ', contractBalance2)
})()
