export const IMAGE_HASH_STORAGE_ADDRESS = '0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab';

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