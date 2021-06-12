export const IMAGE_HASH_STORAGE_ADDRESS = '0xCfA236d43ABDbAd1a05d00DE8915B69f5Fa6bE3d';

export const IMAGE_HASH_STORAGE_ABI = [
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "imageHash",
				"type": "bytes"
			}
		],
		"name": "setHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];