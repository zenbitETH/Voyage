import { ethers } from "hardhat";

async function main() {
  
let account= await ethers.getSigners();
console.log(account[0])

const oneDay = 60*60*24
const oneWeek = oneDay*7
const oneMonth = oneDay*30



// let provider =  new ethers.providers.AlchemyProvider("maticmum","6UhsPRKR79e4fSzMo590glSbly-BYewd")
const Mt = await ethers.getContractFactory("VoyagePassport");

const mt = Mt.attach("0xd0480376603736d6826eD133dB387Df6ebDdEea6");

const Token = await ethers.getContractFactory("VoyageToken");
const token = await Token.deploy("0x7582177F9E536aB0b6c721e11f383C326F2Ad1D5")
console.log(token.address);
await token.registerForReward(40161,10**21)

// await mt.deployed();

//await mt.mint("Paris",Math.floor(Date.now() / 1000)+oneWeek)
// console.log(await account[2].getBalance())
// await mt.connect(account[2]).mint("Paris",Math.floor(Date.now() / 1000)+oneWeek)
// await mt.connect(account[0]).mint("Mexico",Math.floor(Date.now() / 1000)+oneMonth)

// console.log(await mt.isTripOngoing(account[2].address))
console.log(await mt.getUserCurrentTrip(account[0].address))

console.log( mt.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
