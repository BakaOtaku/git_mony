pragma solidity ^0.4.24;
import "./EIP20Interface.sol";

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/evm-contracts/src/v0.4/ChainlinkClient.sol";


contract Gitsource is ChainlinkClient{
    bytes32 public volume;
    string public email;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    address public claimer;
     bytes32 public passhash;
     string public githubsender;
     string public messagesender;
     address public reciever;
     
    uint256 _index;
    struct Awarder {
        
        string orgName;
        string repoName;
        uint256 perContributorAward;
        uint256 maxNoOfAwards;
    }
    
    EIP20Interface erc20;
    
    constructor (address _erc20) public{
        setPublicChainlinkToken();
        oracle = 0xAA1DC356dc4B18f30C347798FD5379F3D77ABC5b;
        jobId = "b7285d4859da4b289c7861db971baf0a";
        fee = 0.1 * 10 ** 18; // 0.1 LINK
        erc20 = EIP20Interface(_erc20);
    }
    
    mapping(bytes32 => uint256) public awarderToIndex;
    Awarder[] public awarderList;
    mapping(bytes32 => uint256) public alreadyClaimed;
    mapping(bytes32 => uint256) public claimerCount;
    // mapping (bytes32=>address) public useraddress;
    
    // function registerUser(string memory email) public {
    //     useraddress[keccak256(abi.encodePacked(email))]=msg.sender;
    // }
    
    
    
    function registerOrg(string memory _orgName, string memory _repoName, uint256 _perContributorAward, uint256 _maxNoOfAwards) public {
        Awarder memory _awarder = Awarder({
            orgName: _orgName,
            repoName: _repoName,
            perContributorAward: _perContributorAward,
            maxNoOfAwards: _maxNoOfAwards
        });
        uint256 _index=awarderList.push(_awarder)-1;
        awarderToIndex[keccak256(abi.encodePacked(_orgName,_repoName))]=_index;
        erc20.transferFrom(msg.sender,address(this),_perContributorAward*_maxNoOfAwards);
    }
    
    function concat(string memory a, string memory b,string memory c) public  view returns (string memory) {
        
        return string(abi.encodePacked("https://api.github.com/repos/",a,"/", b,"/git/commits/", c));
    }
    
    
    function claimAward(string memory _orgName, string memory _repoName, string memory commitHash) public returns(bytes32 requestId) {
        require(alreadyClaimed[keccak256(abi.encodePacked(commitHash))]==0,"Commit already claimed");
        alreadyClaimed[keccak256(abi.encodePacked(commitHash))]=1;
         _index = awarderToIndex[keccak256(abi.encodePacked(_orgName,_repoName))]-1;
        require(alreadyClaimed[keccak256(abi.encodePacked(_orgName,_repoName))]<awarderList[_index].maxNoOfAwards,"Max commit claimed");
        passhash=keccak256(abi.encodePacked(_orgName,_repoName));
         messagesender=substring(addressToString(msg.sender),2,34);
        reciever=msg.sender;
        //transfer if valid commit msg
        
        
        string memory total_url=concat(_orgName,_repoName,commitHash);
        
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        request.add("get", total_url);
        request.add("path","message");
        
        // address claimer = 0x72bA7d8E73Fe8Eb666Ea66babC8116a41bFb10e2;
        // erc20.transfer(claimer,awarderList[_index].perContributorAward);
        return sendChainlinkRequestTo(oracle, request, fee);
        
        
    }
    
    
    
    
    
function substring(string str, uint startIndex, uint endIndex) constant returns (string) {
    bytes memory strBytes = bytes(str);
    bytes memory result = new bytes(endIndex-startIndex);
    for(uint i = startIndex; i < endIndex; i++) {
        result[i-startIndex] = strBytes[i];
    }
    return string(result);
}
    
    function bytes32ToString(bytes32 x) constant returns (string) {
    bytes memory bytesString = new bytes(60);
    uint charCount = 0;
    for (uint j = 0; j < 34; j++) {
        byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
}

function addressToString(address _address) public pure returns(string memory) {
    bytes32 _bytes = bytes32(uint256(_address));
    bytes memory HEX = "0123456789abcdef";
    bytes memory _string = new bytes(42);
    _string[0] = '0';
    _string[1] = 'x';
    for(uint i = 0; i < 20; i++) {
        _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
        _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
    }
    return string(_string);
}
function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}


    function _toLower(string str) internal returns (string) {
		bytes memory bStr = bytes(str);
		bytes memory bLower = new bytes(bStr.length);
		for (uint i = 0; i < bStr.length; i++) {
			// Uppercase character...
			if ((bStr[i] >= 65) && (bStr[i] <= 90)) {
				// So we add 32 to make it lowercase
				bLower[i] = bytes1(int(bStr[i]) + 32);
			} else {
				bLower[i] = bStr[i];
			}
		}
		return string(bLower);
	}
    

    
    function fulfill(bytes32 _requestId, bytes32 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume=_volume;
        githubsender=_toLower(bytes32ToString(_volume));
        
        
        require(compareStrings(messagesender,githubsender));
        
        address claimer=reciever;
        erc20.transfer(claimer,awarderList[_index].perContributorAward);
        
        
    }
    
    
}
