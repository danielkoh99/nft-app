import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ethers } from "ethers";
import FrejaPug from "../artifacts/contracts/FRJP.sol/FrejaPug.json";
import { Button, Grid, Card } from "@mui/material";
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get end user
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, FrejaPug.abi, signer);
export default function NFTImage({ tokenId, getCount }) {
  const [isMinted, setIsMinted] = useState(false);
  const contentId = "QmW65Bn1d3xwJxwdtVuk1DfBmdnyEAVfzBotUM87jq7k9s";
  const metadataId = "Qmcdm2p2rWWEGZG9QxaFHyDZML9vwBFnpCQWdjVbnphcEb";
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);
  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    setIsMinted(result);
  };
  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.051"),
    });
    await result.wait();
    getMintedStatus();
    getCount();
  };

  //   const getURI = async () => {
  //     const uri = await contract.tokenURI(tokenId + 1);
  //     console.log(uri);
  //     setImgUri(uri);
  //     setShowUri(!showUri);
  //   };
  return (
    <Grid item xs={8} md={4} lg={3}>
      <Card>
        <h5>ID #{tokenId}</h5>
        <Img
          onClick={() => window.open(imageURI)}
          src={isMinted ? imageURI : "img/placeholder.png"}
          loading="lazy"
        />
        {!isMinted ? <Button onClick={mintToken}>Mint</Button> : <p>Sold!</p>}
        <h2>Price: 0.051 ETH</h2>
      </Card>
    </Grid>
  );
}
const Img = styled.img`
  width: 100%;
  transition: all 200ms;
  opacity: 1;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
