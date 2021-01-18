const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Account } = require('@harmony-js/account')
const Web3 = require("web3");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const { abi1, abi2, infura, erc20address, contractaddress } = require('./config');
const { fororg, foruser } = require('./dokesend');

app.use('/registerOrg', async (req, res) => {
	const { orgname, reponame, privatekey, contributoraward, numawards } = req.body;
	try {
		let provider = new HDWalletProvider(privatekey, infura);
		let some_web3 = new Web3(provider);
		let account = (await some_web3.eth.getAccounts())[0];
		const oneaddress = Account.add(privatekey).bech32Address;
		await fororg(contributoraward, numawards, privatekey, oneaddress, account);
		await delay(5000);
		let reward = new some_web3.eth.Contract(abi1, contractaddress);
		let eip20 = new some_web3.eth.Contract(abi2, "0x1fa8C4B970102CD6de273B34399B022618098556")
		console.log(oneaddress, account)

		await eip20.methods.approve(contractaddress, parseInt(contributoraward) * parseInt(numawards) + 20).send({
			from: account,
			gasLimit: 3000000
		});

		await reward.methods.registerOrg(orgname, reponame, parseInt(contributoraward), parseInt(numawards)).send({
			from: account,
			gasLimit: 3000000
		});

		res.status(200).send('ok');
	} catch (err) {
		console.log(err);
	}
})

app.use('/claimAward', async (req, res) => {
	const { orgname, reponame, commithash, privatekey } = req.body;
	let provider = new HDWalletProvider(privatekey, infura);
	let some_web3 = new Web3(provider);
	let account = (await some_web3.eth.getAccounts())[0]
	const oneaddress = Account.add(privatekey).bech32Address;
	let reward = new some_web3.eth.Contract(abi1, contractaddress)
	console.log(account);

	let response = await reward.methods.claimAward(orgname, reponame, commithash).send({
		from: account,
		gasLimit: 4000000
	})
	await foruser(1, privatekey, oneaddress, account);
	// console.log(response);
	res.status(200).send(response.transactionHash);
})

function delay(t, val) {
	return new Promise(function (resolve) {
		setTimeout(function () {
			resolve(val);
		}, t);
	});
}

// Main Server
app.use('/', (req, res) => {
	res.status(201).send("API server home");
});

app.listen(process.env.PORT || 4000, () => {
	console.log('Listening on 4000');
});
