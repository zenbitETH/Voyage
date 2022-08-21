// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MundialTrip is ERC721URIStorage {
    uint256 tokenId;
    event TripDeclared(
        address user,
        uint256 tokenId,
        string city,
        uint256 startTime,
        uint256 endTime
    );
    struct Trip {
        uint256 tokenId;
        string city;
        uint256 startTime;
        uint256 endTime;
    }
    mapping(address => Trip) tokenTrip;

    constructor() ERC721("Trip-Token", "TT") {}

    function mint(string calldata city, uint256 endtime) public {
        Trip memory trip = Trip(tokenId, city, block.timestamp, endtime);
        _mint(msg.sender, tokenId);
        emit TripDeclared(msg.sender,tokenId, city, block.timestamp, endtime);
        tokenTrip[msg.sender] = trip;
        tokenId++;
    }

    function getUserCurrentTrip(address user)
        public
        view
        returns (Trip memory)
    {
        return tokenTrip[user];
    }

    function isTripOngoing(uint256 tokenID) public view returns (bool) {
        return tokenTrip[ownerOf(tokenID)].endTime < block.timestamp;
    }

    function isTripOngoing(address user) public view returns (bool) {
        return tokenTrip[user].endTime < block.timestamp;
    }
}
