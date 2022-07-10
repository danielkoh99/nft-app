/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react";
import "./App.css";
import Wallet from "./components/Wallet";
import { Container, Grid, ImageList } from "@mui/material";
import Nav from "./components/Nav";
import FrejaPug from "./artifacts/contracts/FRJP.sol/FrejaPug.json";
import { ethers } from "ethers";
import NFTImage from "./components/NFTImage";
const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const provider = new ethers.providers.Web3Provider(window.ethereum);
// get end user
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, FrejaPug.abi, signer);

function App() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    localStorage.setItem("connected", false);
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };
  return (
    <>
      <Nav></Nav>

      <Container maxWidth={false} className="App">
        <Grid style={{ justifyContent: "center" }} container spacing={2}>
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, id) => (
              <NFTImage
                key={id}
                getCount={getCount}
                contract={contract}
                tokenId={id}
              ></NFTImage>
            ))
            .slice(1)}
        </Grid>

        <Wallet></Wallet>
      </Container>
    </>
  );
}

export default App;
