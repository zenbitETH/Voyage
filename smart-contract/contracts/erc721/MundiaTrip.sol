// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract VoyagePassport is ERC721URIStorage {
    uint256 tokenId;
    event VoyageDeclared(
        address user,
        uint256 tokenId,
        string city,
        uint256 startTime,
        uint256 endTime
    );
    struct Voyage {
        uint256 tokenId;
        string city;
        uint256 startTime;
        uint256 endTime;
    }
    struct Memories {
        // Lens posts created during Voyage
    }
    mapping(address => Voyage) tokenVoyage;

    constructor() ERC721("Voyage", "VYG") {}

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
