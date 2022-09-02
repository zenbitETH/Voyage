// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
contract VoyageToken is ERC20{
    address owner;
    address lensProfile;
    struct Publication{
        address owner;
        uint256 id;
    }
    mapping(uint256=>uint256) reward_withdrable ;
    mapping(uint256=>mapping(uint256=>bool)) isPostRewardWithdrawn;
    constructor(address _lensProfile)ERC20("VOYAGE","VYG"){
        owner = msg.sender;
        lensProfile= _lensProfile;
    }
    function getReward(uint256 userid, uint256 postId) public{
        address user = IERC721(lensProfile).ownerOf(postId);
        require (reward_withdrable[userid]>0);
        require(isPostRewardWithdrawn[userid][postId]);
        (bool success, bytes memory data) = lensProfile.call(
            abi.encodeWithSignature("getContentURI(uin256,uint256)",userid , postId)
        );
        require(success,"could not call the contract");
        string memory meta = abi.decode(data, (string));
        require(bytes(meta).length>1,"no post");
        // console.log(meta);
        _mint(user,10**18);
        reward_withdrable[userid]-=10**18;
        isPostRewardWithdrawn[userid][postId] = true;
    }
    // function registerForReward(address user,uint256 amount)public {
    //     (bool success, bytes memory data) = lensProfile.call(
    //         abi.encodeWithSignature("defaultProfile(address)",user)
    //     );
    //     require(success,"could not call the contract");
    //     uint256 userid = abi.decode(data,(uint256));
    //     reward_withdrable[userid]+=amount;
    // }
    function registerForReward(uint256 userid,uint256 amount)public {
        reward_withdrable[userid]+=amount;
    }
    
}