const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const MoneyRouterABI = require("../../artifacts/contracts/superfluid/Moneystream.sol/MoneyRouter.json").abi;
//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network and accounts specified in hardhat.config.js
//3) Make sure that you add the address of your own money router contract
//4) Make sure that you change the params in the createFlowIntoContract function to reflect the proper values
//3) run: npx hardhat run scripts/createFlowIntoContract.js --network goerli
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //NOTE - make sure you add the address of the previously deployed money router contract on your network
  const moneyRouterAddress = "0x904b3bA30EB38057d9EA34BDf4be0b8dcBBada8B";

  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.RPC_URL);

  const sf = await Framework.create({
    chainId: (await provider.getNetwork()).chainId,
    provider
  });

  const signers = await hre.ethers.getSigners();
  const moneyRouter = new ethers.Contract(moneyRouterAddress, MoneyRouterABI, provider);
  const daix = await sf.loadSuperToken("fDAIx");
  console.log(daix.address)
  //call money router create flow into contract method from signers[0] 
  //this flow rate is ~1000 tokens/month
  console.log(await signers[4].address,moneyRouter.address)
  console.log(await daix.balanceOf({
    account: signers[2].address,
    providerOrSigner: signers[2]
  }))
  const cancelApproval = sf.cfaV1.revokeFlowOperatorWithFullControl({
    flowOperator: moneyRouter.address,
    superToken: daix.address,
    })
   
// await moneyRouter.connect(signers[0]).whitelistAccount(signers[2].address)
// console.log("whitelist done")
const aclApproval = sf.cfaV1.authorizeFlowOperatorWithFullControl({
  flowOperator: moneyRouter.address,
  superToken: daix.address,
  })
// await aclApproval.exec(signers[2]).then(function (tx) {
//   console.log(`
//       Congrats! You've just successfully made the money router contract a flow operator. 
//       Tx Hash: ${tx.hash}
//   `)
// });


  await moneyRouter.connect(signers[2]).createFlowIntoContract(daix.address, "100").then(function (tx) {
    console.log(`
        Congrats! You just successfully created a flow into the money router contract. 
        Tx Hash: ${tx.hash}
    `)
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});