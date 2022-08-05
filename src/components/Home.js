import React, { useState } from "react";
import style from "styled-components";
import Button from "@mui/material/Button";

function Home(props) {
  const [Value, setValue] = useState();
  const [toAddress, setToAddress] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <Container>
      <Data>
        <DataBox>
          <DataTitle>Get USDC Balance of User</DataTitle>
          <InputOne
            type="number"
            placeholder="Click Balance button"
            value={props.balance}
            disabled={true}
          ></InputOne>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "white",
                fontWeight: 600,
              },
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              justifyContent: "center",
              display: "flex",
              marginLeft: "200px",
              borderRadius: "20px",
            }}
            variant="contained"
            onClick={() => {
              props.getBalance();
            }}
          >
            Balance
          </Button>
          <DataTitle>
            Allow user to set the USDC allowance for same test contract
            (0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b)
          </DataTitle>
          <InputOne
            type="number"
            onChange={(event) => {
              const getApprovalAmount = event.target.value;
              setValue(getApprovalAmount);
            }}
          ></InputOne>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "white",
                fontWeight: 600,
              },
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              justifyContent: "center",
              display: "flex",
              marginLeft: "200px",
              borderRadius: "20px",
            }}
            variant="contained"
            onClick={() => {
              props.getApprove(Value);
            }}
          >
            Approve
          </Button>
          <DataTitle>
            USDC allowance is given for this test contract (address:
            0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b)
          </DataTitle>
          <InputTwo
            placeholder="Click Get Allowance button"
            value={props.tokenAllowance}
            disabled={true}
          />
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "white",
                fontWeight: 600,
              },
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              justifyContent: "center",
              display: "flex",
              marginLeft: "200px",
              borderRadius: "20px",
            }}
            variant="contained"
            onClick={() => {
              props.getAllowance();
            }}
          >
            Get Allowance
          </Button>
          <DataTitle>USDC Transfer</DataTitle>
          <InputTwo
            placeholder="Enter TO address"
            onChange={(event) => {
              const address = event.target.value;
              setToAddress(address);
            }}
          />
          <InputTwo
            placeholder="Enter Amount"
            onChange={(event) => {
              const amount = event.target.value;
              setAmount(amount);
            }}
          />
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "white",
                fontWeight: 600,
              },
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
              justifyContent: "center",
              display: "flex",
              marginLeft: "200px",
              borderRadius: "20px",
            }}
            variant="contained"
            onClick={() => {
              props.sendToken(toAddress, amount);
            }}
          >
            Send
          </Button>
        </DataBox>
      </Data>
    </Container>
  );
}

export default Home;

const Container = style.div`
    height:100%;
    width:100%;
    padding:30px 150px 0px 100px;
`;

const Data = style.div`
    justify-content:center;
    display:flex;
    margin:20px 150px 20px 0;   
`;

const DataBox = style.div`
    flex-direction:column;
    background-color:#eaebf3;
    border-radius:30px;
    padding:16px 20px 8px 20px;
    width:480px;
    height:750px;
    color:black;
`;

const DataTitle = style.div`
    font-Weight:600;
    font-size:16px

`;

const InputOne = style.input`
    font-size: 2em;
  border-radius: 20px;
  background-color:#d7d9eb;
  width:462px;
  height:70px;
  border: none;
  margin:8px 0 8px 0;
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
}
::-webkit-outer-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
}    
  `;

const InputTwo = style(InputOne)``;
