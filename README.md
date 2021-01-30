<p align="center"><img src="/app/public/logo.png" align="center" width="300"></p>
<h1 align="center">Gitmony</h1>
<h6 align="center">Make open source sustainable so that developers are appropriately rewarded</h6>



GitMony uses **Harmony Bridge** and **Chainlink oracle**, to make a completely decentralized platform to reward opensource contributors.

- 🎥 [Project Demo](https://www.youtube.com/watch?v=M7-3AImM8mI)
- 📰 [GitCoin Submission](https://gitcoin.co/hackathon/hack-the-horizon/projects/4190/gitmony)
- 🌐 [Oracle Jobs](https://market.link/jobs/c2387021-cf1c-44a0-ae79-66fcdf39cff3/runs)
### Problem

Every year, there are events like Hacktoberfest and also some platforms which reward open source contributors but this system is somewhat centralized.
Some open-source platforms, constantly deploy bots to trace whether the commits have been made or not to the assigned repo or not which is not necessary.

### Solution and Product

GitMony is a truly decentralized platform to reward this and uses Chainlink and Harmony to verify the contributions on Github. The organization will have to register on the smart-contract and its HRC20 coins named (Doke Coin) will be deposited into the contract.

Now a contributor will commit on the organisation’s repo and also prefix his public key to the commit message. Then the contributor will have to call the smart contract from his wallet and provide the info of his repo to which he has committed and also the commit hash.
Now chainlink will verify the commit from github and if the wallet address on the commit message and the smart-contract caller’s address match then the HRC20 tokens will be transferred to the sender to reward the contributor.

### Running the project on your machine

```bash
git clone git clone https://github.com/BakaOtaku/git_mony.git

# Start the server
cd server
npm i
npm start

# Start the client
cd app
npm i
npm run dev
```

Claim some doke coins for testing -->
Open `ERC20Interface.sol` in remix

This account with private key `fbfacda64b334c48c95b9bfdd7b772a4549a4c3444e3b8db33e22f4eba056aa1`

Contains some Doke tokens which can be transferred to your account for testing.
Please ensure that your account contains sufficient Ether and One for testing.

### Tech Stack:

- **Harmony Protocol** : Harmony has fast and low transaction fee, which we have utilized for our platform.
- **Chainlink Oracle** : Chainlink has been linked to GitMony to call an external API to verify whether the commit has been made or not.

### Blockers we overcame:

We asked on the community telegram and did not come across through any running chainlink node on harmony-one testnet , but we overcame this by utilizing harmony-kovan bridge where chainlink is connected to Kovan and then performing all the transactions.

## Team

- [ 👨🏻‍💻 Aniket Dixit](https://github.com/dixitaniket)
- [ 👨🏻‍🎓 Arpit Srivastava](https://github.com/fuzious)
- [ 🌊 Aman Raj](https://github.com/AmanRaj1608)

---
