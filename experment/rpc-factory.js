const Web3 = require('web3');
require('dotenv').config();

const factoryAddress = require('../build/contracts/Factory.json').networks["111121"].address;
const factoryAbi = require('../build/contracts/Factory.json').abi;
const tokenAbi = require('../build/contracts/Token2.json').abi;

const web3 = new Web3(process.env.HOST);

(async () => {
    const factoryContract = new web3.eth.Contract(factoryAbi, factoryAddress);
    const newTokenAbi = factoryContract.methods.createNewToken("This is a test token", "TITT", 10000).encodeABI()

    const gasLimit = await web3.eth.estimateGas({
        from: process.env.ADDRESS,
        to: factoryAddress,
        value: '0',
        data: newTokenAbi
    })

    const gasPrice = await web3.eth.getGasPrice()

    const nonce = await web3.eth.getTransactionCount(process.env.ADDRESS)
    let counting = 0;
    const tx = {
        from: process.env.ADDRESS,
        to: factoryAddress,
        value: 0,
        gasPrice: gasPrice,
        gas: gasLimit,
        data: newTokenAbi,
        nonce: nonce
    }
    console.log('tx: ', tx)
    const signed = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY)
    console.log('signed: ', signed)

    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)
    console.log('receipt: ', receipt)

    const lastEvent = await factoryContract.getPastEvents("TokenCreated", {fromBlock:receipt.blockNumber, toBlock: receipt.blockNumber})
    console.log('lastEvent: ', lastEvent)
    const tokenAddress = lastEvent[0].returnValues.tokenAddress
    console.log('tokenAddress: ', tokenAddress)
    const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress);
    const ownerBalance = await tokenContract.methods.balanceOf(process.env.ADDRESS).call({from: process.env.ADDRESS});
    console.log('ownerBalance: ', ownerBalance)
    const transEncodeAbi2 = tokenContract.methods.transfer(tokenAddress, 10).encodeABI()
    const gasLimit2 = await web3.eth.estimateGas({
        from: process.env.ADDRESS,
        to: tokenAddress,
        value: '0',
        data: transEncodeAbi2
    })

    const gasPrice2 = await web3.eth.getGasPrice()

    const currentNonce = await web3.eth.getTransactionCount(process.env.ADDRESS)
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
    const receipt2 = await web3.eth.sendSignedTransaction(signed2.rawTransaction)
    console.log('receipt2: ', receipt2)
})()
