import React, { useState, useRef, useEffect } from "react";
import {abi,address} from './Constant.js'
 import { ethers } from "ethers";

function App2() {

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const Uid = new ethers.Contract(address, abi, signer);


    const [amt, setAmt] = useState(0);
    // uint256 adhaarNum, uint256 pin,string memory name, string memory city, string memory date
    const [adhaarNum, setAdhaarNum] = useState(0);
    const [pin, setPin] = useState(0);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [date, setDate] = useState("");
  async function addbalance() {
    // console.log(Uid);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account);
    const tx = await Uid.addBalance({value: ethers.utils.parseEther(amt)});
    console.log(tx);
    const receipt = await tx.wait(6);
    console.log(receipt);
  }

  async function getbalance() {
    // console.log(Uid);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account);
    // get account balance
    const tx = await Uid.getBalance(account);
    // convert into ether
    const etherBalance = ethers.utils.formatEther(tx.toString());
    console.log(etherBalance);
   
  }
  async function verify() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const tx = await Uid.verify(adhaarNum,pin,name,city,date);
    console.log(tx);
    const receipt = await tx.wait(2);
    console.log(receipt);
    const sender = receipt.events[0].args.sender;
    console.log(sender);
    const Upin = receipt.events[0].args.Upin;
    console.log(Upin);
    const hash = receipt.events[0].args.hash;
    console.log(hash);
  }


  return (
    <div>
        input amount: <input type="text" onChange={(e) => setAmt(e.target.value)} />
        <button onClick={addbalance}>AddBalance</button> <button onClick={getbalance}>getBalance</button>
        <br/>
        <br/>
        <br/>
        <br/>
        input adhaarNum: <input type="text" onChange={(e) => setAdhaarNum(e.target.value)} />
        <br/>
        input pin: <input type="text" onChange={(e) => setPin(e.target.value)} />
        <br/>
        input name: <input type="text" onChange={(e) => setName(e.target.value)} />
        <br/>
        input city: <input type="text" onChange={(e) => setCity(e.target.value)} />
        <br/>
        input date: <input type="text" onChange={(e) => setDate(e.target.value)} />
        <button onClick={verify}>verify</button>
        <br/>


       
    </div>
  )
}

export default App2