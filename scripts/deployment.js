const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const FrejaPug = await hre.ethers.getContractFactory("FrejaPug");
  const frejaPug = await FrejaPug.deploy();

  await frejaPug.deployed();

  console.log("NFT deployed to", frejaPug.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
