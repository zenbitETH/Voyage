# Voyage

A dapp mint travels as NFT and generate content on Lens during the trip to get DeFi rewards  

Developed at [ETH México 2022](https://ethglobal.com/showcase/voyage-tqbtt)  

## About
Voyage is a web3 dapp built with:

poap: Gnosis Voyage Smartcontracts: solidity with hardhat Contracts deployed and NTFs minted on Polygon Mumbai. Web3 wallet: Wallet Connect and desktop wallet. City stream: Superfluid. Human verification: Worldcoin. Frontend: Nuxt with Tailwind, API : Lens API, and The Graph. IPFS

How it works

a Trip nft

When on vacation, the user will have the opportunity to mint a poap and an nft that represents his trip : the city he is in and the end and start.

Indexing the datas on the graph

We indexed the data from the nft with the graph. It allows us to keep tracks of the different trips from every users. Our graph will get the information about what the different trips minted and their owners.

Verifying the identty of a person with worldcoin

We don’t want bots or people with multiple accounts to be using our product, so we are requiring the user to be authenticated with worldcoin

A photo sharing platform built on lens

we built on top of lens and app that enable to share the pictures of the trip. The proof that the user own an nft and is a real person is displayed on the post

if the user is authentified, minted the nft and posted content about his trip, he can have rewards thanks to a superfluid canal


## Contracts
https://mumbai.polygonscan.com/address/0xd0480376603736d6826eD133dB387Df6ebDdEea6#events



### Built with:

- Next.js  
- Lens API
- Superfluid
- Worldcoin  
- The Graph  
- Wallet Connect    
- Polygon    
- IPFS
- Tailwind CSS  




### Dev Environment

Working with Polygon Mumbai testnet contracts (further update to deploy your own contracts)

1. Install dependencies

```bash
cd client
yarn install
```

2. Start developmment

```bash
cd client
npm run dev
```

3. 📱 Open http://localhost:3000 to see the app

