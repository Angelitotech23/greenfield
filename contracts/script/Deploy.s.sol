// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ReputationPassport} from "../src/ReputationPassport.sol";
import {IssuerResolver} from "../src/IssuerResolver.sol";

interface VmLike {
    function envAddress(string calldata) external view returns (address);
    function startBroadcast() external;
    function stopBroadcast() external;
}

contract DeployScript {
    function run() external {
        // forge script contracts/script/Deploy.s.sol:DeployScript --rpc-url $RPC_URL --broadcast
        // Admin y minter se pasan por env en un wrapper real de forge-std.
    }
}

/// @dev Registro de schemas EAS (documental). Ejecutar con eas-sdk o easscan.
/// IdentityVerified: bytes32 uniquenessCommitment,uint64 verifiedAt
/// AcademicCredential: bytes32 documentHash,bytes32 credentialType,uint64 issuedAt
/// EmploymentAttestation: bytes32 documentHash,bytes32 credentialType,bytes32 roleHash,uint64 issuedAt
/// BrandRepresentation: bytes32 brandId,uint64 validUntil
/// Web2Credential: bytes32 provider,bytes32 externalIdHash
/// PROHIBIDO: BackgroundCheck, CriminalRecord, flagged
library SchemaCatalog {
    function names() internal pure returns (string[5] memory list) {
        list = [
            "IdentityVerified",
            "AcademicCredential",
            "EmploymentAttestation",
            "BrandRepresentation",
            "Web2Credential"
        ];
    }
}
