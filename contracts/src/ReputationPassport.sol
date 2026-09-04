// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/// @notice ERC-5192 Minimal Soulbound NFT
interface IERC5192 {
    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);
    function locked(uint256 tokenId) external view returns (bool);
}

contract ReputationPassport is IERC5192 {
    error NotMinter();
    error NotAdmin();
    error Soulbound();
    error AlreadyMinted();
    error Nonexistent();

    string public name = "Pasaporte Profesional";
    string public symbol = "PASSPORT";

    address public admin;
    address public minter;
    uint256 public nextId = 1;

    mapping(uint256 => address) private _owner;
    mapping(address => uint256) public tokenOf;
    mapping(uint256 => bool) private _exists;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event MinterUpdated(address indexed minter);

    constructor(address admin_, address minter_) {
        admin = admin_;
        minter = minter_;
    }

    modifier onlyAdmin() {
        if (msg.sender != admin) revert NotAdmin();
        _;
    }

    function setMinter(address minter_) external onlyAdmin {
        minter = minter_;
        emit MinterUpdated(minter_);
    }

    function mint(address to) external returns (uint256 tokenId) {
        if (msg.sender != minter && msg.sender != admin) revert NotMinter();
        if (tokenOf[to] != 0) revert AlreadyMinted();
        tokenId = nextId++;
        _owner[tokenId] = to;
        tokenOf[to] = tokenId;
        _exists[tokenId] = true;
        emit Transfer(address(0), to, tokenId);
        emit Locked(tokenId);
    }

    /// @notice Solo admin ante orden legal. El uniqueness_hash off-chain permanece.
    function burn(uint256 tokenId) external onlyAdmin {
        if (!_exists[tokenId]) revert Nonexistent();
        address from = _owner[tokenId];
        delete tokenOf[from];
        delete _owner[tokenId];
        _exists[tokenId] = false;
        emit Transfer(from, address(0), tokenId);
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        if (!_exists[tokenId]) revert Nonexistent();
        return _owner[tokenId];
    }

    function locked(uint256 tokenId) external view returns (bool) {
        if (!_exists[tokenId]) revert Nonexistent();
        return true;
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0xb45a3c0e || interfaceId == 0x01ffc9a7;
    }

    function transferFrom(address, address, uint256) external pure {
        revert Soulbound();
    }

    function safeTransferFrom(address, address, uint256) external pure {
        revert Soulbound();
    }

    function approve(address, uint256) external pure {
        revert Soulbound();
    }
}
