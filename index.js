import {
    Account,
    Contract,
    defaultProvider,
    ec,
    json,
    number,
    hash,
    Provider,
    validateAndParseAddress,
} from "starknet";
import { BigNumber } from "ethers";
import "fs";
import { appendFile } from "fs";
const ABI = [
    {
        name: "Uint256",
        size: 2,
        type: "struct",
        members: [
            {
                name: "low",
                type: "felt",
                offset: 0,
            },
            {
                name: "high",
                type: "felt",
                offset: 1,
            },
        ],
    },
    {
        data: [
            {
                name: "previousOwner",
                type: "felt",
            },
            {
                name: "newOwner",
                type: "felt",
            },
        ],
        keys: [],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        data: [
            {
                name: "account",
                type: "felt",
            },
        ],
        keys: [],
        name: "Paused",
        type: "event",
    },
    {
        data: [
            {
                name: "account",
                type: "felt",
            },
        ],
        keys: [],
        name: "Unpaused",
        type: "event",
    },
    {
        data: [
            {
                name: "from_",
                type: "felt",
            },
            {
                name: "to",
                type: "felt",
            },
            {
                name: "tokenId",
                type: "Uint256",
            },
        ],
        keys: [],
        name: "Transfer",
        type: "event",
    },
    {
        data: [
            {
                name: "owner",
                type: "felt",
            },
            {
                name: "approved",
                type: "felt",
            },
            {
                name: "tokenId",
                type: "Uint256",
            },
        ],
        keys: [],
        name: "Approval",
        type: "event",
    },
    {
        data: [
            {
                name: "owner",
                type: "felt",
            },
            {
                name: "operator",
                type: "felt",
            },
            {
                name: "approved",
                type: "felt",
            },
        ],
        keys: [],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        name: "constructor",
        type: "constructor",
        inputs: [
            {
                name: "name",
                type: "felt",
            },
            {
                name: "symbol",
                type: "felt",
            },
            {
                name: "owner",
                type: "felt",
            },
            {
                name: "base_uri_len",
                type: "felt",
            },
            {
                name: "base_uri",
                type: "felt*",
            },
            {
                name: "json_extension",
                type: "felt",
            },
            {
                name: "currency_address",
                type: "felt",
            },
            {
                name: "mint_price",
                type: "Uint256",
            },
            {
                name: "root",
                type: "felt",
            },
            {
                name: "wallet_addresses_len",
                type: "felt",
            },
            {
                name: "wallet_addresses",
                type: "felt*",
            },
        ],
        outputs: [],
    },
    {
        name: "supportsInterface",
        type: "function",
        inputs: [
            {
                name: "interfaceId",
                type: "felt",
            },
        ],
        outputs: [
            {
                name: "success",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "name",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "name",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "symbol",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "symbol",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "balanceOf",
        type: "function",
        inputs: [
            {
                name: "owner",
                type: "felt",
            },
        ],
        outputs: [
            {
                name: "balance",
                type: "Uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "ownerOf",
        type: "function",
        inputs: [
            {
                name: "tokenId",
                type: "Uint256",
            },
        ],
        outputs: [
            {
                name: "owner",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "getApproved",
        type: "function",
        inputs: [
            {
                name: "tokenId",
                type: "Uint256",
            },
        ],
        outputs: [
            {
                name: "approved",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "isApprovedForAll",
        type: "function",
        inputs: [
            {
                name: "owner",
                type: "felt",
            },
            {
                name: "operator",
                type: "felt",
            },
        ],
        outputs: [
            {
                name: "isApproved",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "totalSupply",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "supply",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "tokenURI",
        type: "function",
        inputs: [
            {
                name: "token_id",
                type: "Uint256",
            },
        ],
        outputs: [
            {
                name: "token_uri_len",
                type: "felt",
            },
            {
                name: "token_uri",
                type: "felt*",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "owner",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "paused",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "paused",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "mintPrice",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "price",
                type: "Uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "currencyAddress",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "address",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "baseUri",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "uri_len",
                type: "felt",
            },
            {
                name: "uri",
                type: "felt*",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "royalityInfo",
        type: "function",
        inputs: [
            {
                name: "_sale_price",
                type: "Uint256",
            },
        ],
        outputs: [
            {
                name: "receiver",
                type: "felt",
            },
            {
                name: "royalitytAmount",
                type: "Uint256",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "isPublicMintActive",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "p_state",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "isWhitelistMintActive",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "wl_state",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "merkleRoot",
        type: "function",
        inputs: [],
        outputs: [
            {
                name: "root",
                type: "felt",
            },
        ],
        stateMutability: "view",
    },
    {
        name: "approve",
        type: "function",
        inputs: [
            {
                name: "to",
                type: "felt",
            },
            {
                name: "tokenId",
                type: "Uint256",
            },
        ],
        outputs: [],
    },
    {
        name: "setApprovalForAll",
        type: "function",
        inputs: [
            {
                name: "operator",
                type: "felt",
            },
            {
                name: "approved",
                type: "felt",
            },
        ],
        outputs: [],
    },
    {
        name: "transferFrom",
        type: "function",
        inputs: [
            {
                name: "from_",
                type: "felt",
            },
            {
                name: "to",
                type: "felt",
            },
            {
                name: "tokenId",
                type: "Uint256",
            },
        ],
        outputs: [],
    },
    {
        name: "safeTransferFrom",
        type: "function",
        inputs: [
            {
                name: "from_",
                type: "felt",
            },
            {
                name: "to",
                type: "felt",
            },
            {
                name: "tokenId",
                type: "Uint256",
            },
            {
                name: "data_len",
                type: "felt",
            },
            {
                name: "data",
                type: "felt*",
            },
        ],
        outputs: [],
    },
    {
        name: "wlMint",
        type: "function",
        inputs: [
            {
                name: "proof_len",
                type: "felt",
            },
            {
                name: "proof",
                type: "felt*",
            },
        ],
        outputs: [],
    },
    {
        name: "publicMint",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "transferOwnership",
        type: "function",
        inputs: [
            {
                name: "newOwner",
                type: "felt",
            },
        ],
        outputs: [],
    },
    {
        name: "renounceOwnership",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "pause",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "unpause",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "set_base_uri",
        type: "function",
        inputs: [
            {
                name: "ipfs_uri_len",
                type: "felt",
            },
            {
                name: "ipfs_uri",
                type: "felt*",
            },
        ],
        outputs: [],
    },
    {
        name: "setTokenUriExtension",
        type: "function",
        inputs: [
            {
                name: "extension",
                type: "felt",
            },
        ],
        outputs: [],
    },
    {
        name: "setRoyaltyInfo",
        type: "function",
        inputs: [
            {
                name: "_receipt",
                type: "felt",
            },
            {
                name: "_royality_fee",
                type: "Uint256",
            },
        ],
        outputs: [],
    },
    {
        name: "setMintPrice",
        type: "function",
        inputs: [
            {
                name: "_price",
                type: "Uint256",
            },
        ],
        outputs: [],
    },
    {
        name: "setCurrencyAddress",
        type: "function",
        inputs: [
            {
                name: "address",
                type: "felt",
            },
        ],
        outputs: [],
    },
    {
        name: "startPublicMint",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "stopPublicMint",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "startWlMint",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "stopWlMint",
        type: "function",
        inputs: [],
        outputs: [],
    },
    {
        name: "burn",
        type: "function",
        inputs: [
            {
                name: "token_id",
                type: "Uint256",
            },
        ],
        outputs: [],
    },
    {
        name: "setMerkleRoot",
        type: "function",
        inputs: [
            {
                name: "root",
                type: "felt",
            },
        ],
        outputs: [],
    },
];

let contractAddress = "0x012f8e318fe04a1fe8bffe005ea4bbd19cb77a656b4f42682aab8a0ed20702f0";

const provider = new Provider({
    sequencer: {
        network: "mainnet-alpha", // or 'goerli-alpha'
    },
});

const contract = new Contract(ABI, BigNumber.from(contractAddress)._hex, provider);
let addresses = new Set();

for (let tokenId = 1; tokenId < 445; tokenId++) {
    let owner = await contract.ownerOf([tokenId.toString(), "0"]);
    if (!addresses.has(owner[0].toString())) {
        addresses.add(owner[0].toString());
        appendFile(
            "addresses.txt",
            BigNumber.from(owner[0].toString()).toHexString() + "\n",
            (err) => {
                if (err) throw err;
            }
        );
    }
}
