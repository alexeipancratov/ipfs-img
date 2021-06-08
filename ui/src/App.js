import React, { useState } from "react";
import "./App.css";
import ipfs from "./ipfs";
import Web3 from "web3";
import {
  IMAGE_HASH_STORAGE_ABI,
  IMAGE_HASH_STORAGE_ADDRESS,
} from "./contractAbis/imageHashStorage";

const BLOCKCHAIN_NETWORK_URL = "http://localhost:8545";

function App() {
  const [file, setFile] = useState();
  const [ipfsImagePath, setIpfsImagePath] = useState();

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    uploadAndSaveImage();
  };

  const uploadAndSaveImage = async () => {
    const result = await ipfs.add(file);
    console.log("IPFS image path", result.path);

    const web3 = new Web3(BLOCKCHAIN_NETWORK_URL);
    const hashStorageContract = new web3.eth.Contract(
      IMAGE_HASH_STORAGE_ABI,
      IMAGE_HASH_STORAGE_ADDRESS
    );
    const accounts = await web3.eth.getAccounts();

    hashStorageContract.methods
      .setHash(web3.utils.fromAscii(result.path))
      .send({from: accounts[0]})
      .on("receipt", (receipt) => {
        alert(
          `Image uploaded and saved successfully!\n${receipt.transactionHash}`
        );
      });
  };

  const onShowImageClick = async () => {
    const web3 = new Web3(BLOCKCHAIN_NETWORK_URL);
    const hashStorageContract = new web3.eth.Contract(
      IMAGE_HASH_STORAGE_ABI,
      IMAGE_HASH_STORAGE_ADDRESS
    );

    const imageHash = await hashStorageContract.methods.getHash().call();
    setIpfsImagePath(web3.utils.toAscii(imageHash));
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleImageUpload}>
          <input type="file" onChange={onFileChange} />
          <button type="submit">Upload image</button>
        </form>
        <button onClick={onShowImageClick}>Show image on IPFS</button>
        {ipfsImagePath && (
          <section>
            <h4>IPFS image</h4>
            <img src={`https://ipfs.io/ipfs/${ipfsImagePath}`} alt="IPFS hosted" />
          </section>
        )}
      </header>
    </div>
  );
}

export default App;
