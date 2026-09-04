/**
 * Registro de schemas EAS en Polygon Amoy / mainnet.
 * Uso: npx tsx contracts/script/register-schemas.ts
 * Requiere PLATFORM_WALLET_PRIVATE_KEY y RPC.
 */
import { EAS_ADDRESSES, EAS_SCHEMAS, FORBIDDEN_EAS } from "../../lib/eas/schemas";

async function main() {
  console.log("Schemas permitidos (solo aditivos):");
  for (const schema of Object.values(EAS_SCHEMAS)) {
    console.log(`- ${schema.name}: ${schema.schema}`);
  }
  console.log("Prohibidos:", FORBIDDEN_EAS.join(", "));
  console.log("Amoy EAS", EAS_ADDRESSES.amoy.eas);
  console.log("Polygon EAS", EAS_ADDRESSES.polygon.eas);
  if (!process.env.PLATFORM_WALLET_PRIVATE_KEY) {
    console.log("Sin clave: no se envía transacción. Copia los schemas a easscan.");
  }
}

main().catch(console.error);
