import "./App.css";
import Web3 from "web3";
import React, { useState } from "react";
import Header from "./Header";
import Home from "./Home";
import style from "styled-components";
import Token from "../abis/Token.json";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [account, setAccount] = useState(0);
  const [balance, setBalance] = useState();
  const [initialBalance, setInitialBalance] = useState();
  const [tokenAllowance, setTokenAllowance] = useState();
  const USDCaddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  const contractAddress = "0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b";

  window.web3 = new Web3(window.ethereum);
  const web3data = window.web3;
  const token = new web3data.eth.Contract(Token.abi, USDCaddress);

  async function web3() {
    const address = await window.web3.eth.getAccounts();
    setAccount(address[0]);
    if (address == undefined) {
      setAccount(0);
    }
  }

  //USDC balance get function
  async function getBalance() {
    if (account > 0) {
      let tokenBalance = await token.methods.balanceOf(account).call();
      tokenBalance = tokenBalance / Math.pow(10, 6);
      setBalance(tokenBalance);
    }
  }

  //Approve function
  async function getApprove(approvalAmount) {
    if (approvalAmount != 0 && approvalAmount != undefined) {
      token.methods
        .approve(
          contractAddress,
          web3data.utils.BN(approvalAmount * Math.pow(10, 6))
        )
        .send({ from: account });
    } else {
      alert("please enter valid value");
    }
  }

  //Set Allowance function
  async function getAllowance() {
    let tokenAllowance = await token.methods
      .allowance(account, contractAddress)
      .call();
    setTokenAllowance(tokenAllowance / Math.pow(10, 6));
  }

  //Send token to another user
  async function sendToken(toAddress, amount) {
    if (toAddress !== 0 && toAddress.length == 42) {
      if (amount != 0) {
        await token.methods
          .transfer(toAddress, amount * Math.pow(10, 6))
          .send({ from: account });
      } else {
        alert("Incorrect amount");
      }
    } else {
      alert("Address is incorrect");
    }
  }

  function LoadingStatus(e) {
    setLoading(e);
  }
  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockChainData() {
    const store = await web3data.eth.getAccounts();
    setAccount(store[0]);
  }

  function loading() {
    return (
      <Container>
        <Loading></Loading>;
      </Container>
    );
  }

  if (isLoading) {
    return loading(isLoading);
  } else {
    web3();
    return (
      <div className="App">
        <Wrap>
          <Header
            loadWeb3={loadWeb3}
            loadBlockChainData={loadBlockChainData}
            account={account}
            parentCallback={LoadingStatus}
            web3={web3}
          />
          <Home
            balance={balance}
            getBalance={getBalance}
            getAllowance={getAllowance}
            getApprove={getApprove}
            tokenAllowance={tokenAllowance}
            sendToken={sendToken}
          />
        </Wrap>
      </div>
    );
  }
}

export default App;

const Wrap = style.div`
    height:100%;
    width:100%;
    background-size: auto;
    background-position:center;
    background-repeat:no-repeat;
    background-image:url("./images/430scuderia.jpg");
    overflow:hidden;
`;

const Container = style.div`
    width: 100%;
    height: 500px;
    justify-content:center;
    align-items:center;
    display:flex;
`;

const Loading = style.div`
    width: 48px;
    height: 48px;
    border: 5px solid #262121;
    border-bottom-color: transparent;
    border-radius: 50%;
    
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    display:flex;
    justify-content:center;
    
@keyframes rotation {
0% {
    transform: rotate(0deg);
}
100% {
    transform: rotate(360deg);
}
`;
