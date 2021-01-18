const { BridgeSDK, TOKEN, EXCHANGE_MODE, STATUS } = require('bridge-sdk');
const configs = require('bridge-sdk/lib/configs');

const bridgeSDK = new BridgeSDK({ logLevel: 2 });

const erc20address = "0x1fa8C4B970102CD6de273B34399B022618098556"
const hrc20address = "0xa22C232A7e4711d8E3fC8EF844ba8BF231A6031F"

async function fororg(contributoraward, numawards, privateorgoneaddress, oneaddress, ethaddress) {
  // jump hrc20- doke coins to erc 20 doke coins
  let operationId;
  await bridgeSDK.init(configs.testnet);
  contributoraward = parseInt(contributoraward)
  numawards = parseInt(numawards);
  await bridgeSDK.addOneWallet(privateorgoneaddress);
  // await bridgeSDK.addEthWallet(privateorgethaddresss);
  for (i = 0; i < contributoraward * numawards; i = i + 10) {
    try {
      await bridgeSDK.sendToken(
        {
          type: EXCHANGE_MODE.ONE_TO_ETH,
          token: TOKEN.ERC20,
          amount: contributoraward,
          erc20Address: erc20address,
          hrc20address: hrc20address,
          oneAddress: oneaddress,
          ethAddress: ethaddress
        }
      )
    } catch (e) {
      console.log(e.message);
    }
  }
}

async function foruser(contributoraward, privateethaddress, oneaddress, ethaddress) {
  // jumps from eth doke to harmony doke
  let operationId;
  await bridgeSDK.init(configs.testnet);
  contributoraward = parseInt(contributoraward)
  // numawards=parseInt(numawards);
  await bridgeSDK.addEthWallet(privateethaddress);
  // await bridgeSDK.addEthWallet(privateorgethaddresss);
  try {
    await bridgeSDK.sendToken(
      {
        type: EXCHANGE_MODE.ETH_TO_ONE,
        token: TOKEN.ERC20,
        amount: contributoraward,
        erc20Address: erc20address,
        hrc20address: hrc20address,
        oneAddress: oneaddress,
        ethAddress: ethaddress
      }
    )
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { fororg, foruser };

var contributoraward = 1
// private one key of the org , publicone of org and publiceth of the organization
// fororg(10,10,privateone,publicone,publiceth)

// contributor award always set to one;
// for user > privateeth of the user , public one address of user and public eth of user

// foruser(contributoraward,privateth,publicone,publiceth);

