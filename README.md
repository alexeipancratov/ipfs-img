# IPFS image hosting

## Description
This is a demo application using which you can upload any image to IPFS using the web UI and then save its hash in a smart contract on blockchain. The image hash can then be retrieved to show image hosted on IPFS.

![image](https://user-images.githubusercontent.com/3188163/121763842-bd102300-cb47-11eb-8e9f-a6b861f2a7c9.png)

## Development notes

### How to run project locally

Clone the project

```bash
  git clone https://github.com/alexeipancratov/ipfs-img
```

Go to the project directory

```bash
  cd ipfs-img
```

Go to the ui directory

```bash
  cd ui
```

Install dependencies

```bash
  npm install
```

Deploy the ImageHashStorage smart contract to a test blockchain (e.g., Ganache) and copy-paste the contract adddress to the "ui/src/contractAbis/imageHashStorage.js" file

Download and run locally the Go IPFS client on port 5001 - https://github.com/ipfs/go-ipfs

Run project from the UI folder

```bash
  npm start
```
