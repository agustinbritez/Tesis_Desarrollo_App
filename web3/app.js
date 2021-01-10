const abiContact = 0;

const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');

const web3 = new Web3('HTTP://127.0.0.1:7545');
const address1 = '0xaa7FDd78A802F2dDfa68053F70c12B4f442e97C3';
const address2 = '0x247B5529773EDDa5D790986F96D006b90FF0028a';

const address1Key = new Buffer.from('0abdcdeb2b963603f4702e71d008d566525c85fdf082cdc93d7bdb9478ad4525');
const address2Key = new Buffer.from('47dfc404ab88909d760170c7fedeeffdd6fe0697720fc1cace66b5dd127bfb30');

const addressContract = '0x02db3c73c9335d0a1811755c6004e3230c4d3af9';

const contract = new web3.eth.Contract(abiContact, addressContract);

contract.methods.getOrganitation().call((err, result) => {
    console.log(result);
});