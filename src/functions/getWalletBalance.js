import { ethers } from "ethers";
const getWalletData = async () => {
  const [useraccount] = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if (!useraccount) {
    localStorage.setItem("connected", false);
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const balance = await provider.getBalance(useraccount);
  localStorage.setItem("connected", true);

  return ethers.utils.formatEther(balance);
};

export { getWalletData };
