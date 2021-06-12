import React, { useEffect, useState } from "react";
import ipfs from "./ipfs";
import Web3 from "web3";
import {
  IMAGE_HASH_STORAGE_ABI,
  IMAGE_HASH_STORAGE_ADDRESS,
} from "./contractAbis/imageHashStorage";

const BLOCKCHAIN_NETWORK_URL = "http://localhost:8545";

function App() {
  const [web3, setWeb3] = useState();
  const [contractInstance, setContractInstance] = useState();

  const [file, setFile] = useState();
  const [ipfsImagePath, setIpfsImagePath] = useState();

  useEffect(() => {
    setWeb3(new Web3(BLOCKCHAIN_NETWORK_URL));
  }, []);

  useEffect(() => {
    if (web3) {
      setContractInstance(
        new web3.eth.Contract(
          IMAGE_HASH_STORAGE_ABI,
          IMAGE_HASH_STORAGE_ADDRESS
        )
      );
    }
  }, [web3]);

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

    const accounts = await web3.eth.getAccounts();

    contractInstance.methods
      .setHash(web3.utils.fromAscii(result.path))
      .send({ from: accounts[0] })
      .on("receipt", (receipt) => {
        alert(
          `Image uploaded and saved successfully!\n${receipt.transactionHash}`
        );
      });
  };

  const onShowImageClick = async () => {
    const imageHash = await contractInstance.methods.getHash().call();
    setIpfsImagePath(web3.utils.toAscii(imageHash));
  };

  return (
    <div className="container">
      <form onSubmit={handleImageUpload}>
        <div className="row mt-3">
          <div className="col-sm-8 offset-sm-2">
            <label htmlFor="imgFile">File to upload to IPFS</label>
            <div className="input-group">
              <input
                id="imgFile"
                type="file"
                className="form-control"
                onChange={onFileChange}
              />
              <button type="submit" className="btn btn-outline-primary">
                Upload image
              </button>
            </div>
          </div>
        </div>
      </form>
      <section className="mt-3">
        <div className="row">
          <div className="col-sm-12 text-center">
            <button className="btn btn-primary" onClick={onShowImageClick}>
              Show image on IPFS
            </button>
          </div>
        </div>
        <div className="row">
          {ipfsImagePath && (
            <div className="col-sm-12 mt-2 text-center">
              <h4>IPFS image</h4>
              <img
                src={`https://ipfs.io/ipfs/${ipfsImagePath}`}
                alt="IPFS hosted"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
