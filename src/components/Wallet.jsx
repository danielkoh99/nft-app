import {
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getWalletData } from "../functions/getWalletBalance";

const Wallet = () => {
  const [balance, setBalance] = useState("");
  useEffect(async () => {
    if (localStorage.getItem("connected") === "true") {
      connectToWallet();
    }
  }, []);

  const connectToWallet = async () => {
    // setAccount(await connectUsersWallet());
    setBalance(await getWalletData());
  };

  return (
    <Card
      sx={{
        width: 200,
        borderRadius: 2,
        maxHeight: 500,
        bottom: 10,
        right: 20,
        position: "fixed",
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          {window.ethereum && localStorage.getItem("connected") === "true" ? (
            <p> Balance: {balance.slice(0, 8) + "ETH"}</p>
          ) : (
            ""
          )}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        {window.ethereum && localStorage.getItem("connected") === "false" ? (
          <Button onClick={connectToWallet}>Connect wallet</Button>
        ) : (
          <b style={{ color: "blue" }}>Connected</b>
        )}
        {!window.ethereum ? (
          <>
            <p>Follow the link to install 👇🏼</p>
            <Button href="https://metamask.io/download.html">Metamask</Button>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
};

export default Wallet;
