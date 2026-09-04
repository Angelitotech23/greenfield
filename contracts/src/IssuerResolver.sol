// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/// @notice Allowlist de wallets emisoras. No existe función para dato penal.
contract IssuerResolver {
    address public admin;
    mapping(address => bool) public allowed;

    error NotAdmin();
    error NotIssuer();

    event IssuerSet(address indexed wallet, bool allowed);

    constructor(address admin_) {
        admin = admin_;
    }

    function setIssuer(address wallet, bool ok) external {
        if (msg.sender != admin) revert NotAdmin();
        allowed[wallet] = ok;
        emit IssuerSet(wallet, ok);
    }

    function isPayable() external pure returns (bool) {
        return false;
    }

    /// @dev Hook compatible con EAS: solo allowlist.
    function onAttest(address attester) external view returns (bool) {
        if (!allowed[attester]) revert NotIssuer();
        return true;
    }
}
