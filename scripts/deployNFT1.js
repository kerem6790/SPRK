const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const SparkNFT = await hre.ethers.getContractFactory("SparkNFT");

  const name = "SPARK Tier 1";
  const symbol = "SPRK1";
  const maxSupply = 100;
  const price = ethers.parseEther("0.1");
  const baseURI = "ipfs://tier1metadata/";

  const nft = await SparkNFT.deploy(name, symbol, maxSupply, price, baseURI, "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  console.log(`${name} deployed to:`, nft.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});