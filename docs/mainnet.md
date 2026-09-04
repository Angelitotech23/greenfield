# Account Abstraction y despliegue

## Redes

| Entorno | Chain ID | EAS | RPC típico |
|---------|----------|-----|------------|
| Polygon Amoy | 80002 | 0xb101275a60d8bfb14529C421899aD7CA1Ae5B5Fc | https://rpc-amoy.polygon.technology |
| Polygon mainnet | 137 | 0x5E634ef5355f45A855d02D66eCD687b1502AF790 | Alchemy / Infura |

## Contratos

```
cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --private-key $PLATFORM_WALLET_PRIVATE_KEY
```

Luego registrar schemas con `npx tsx contracts/script/register-schemas.ts` o en https://polygon-amoy.easscan.org.

Poner `NEXT_PUBLIC_SBT_ADDRESS` y los UID de schema en `.env`.

## Privy + paymaster

1. Crear app en Privy (email, Google, wallets).
2. `NEXT_PUBLIC_PRIVY_APP_ID` y `PRIVY_APP_SECRET`.
3. Embedded wallets: `createOnLogin: users-without-wallets`.
4. Pimlico: `PIMLICO_API_KEY`. El endpoint `/api/aa/status` confirma si el paymaster está listo.
5. Los usuarios Web2 no necesitan MATIC para que el relayer de plataforma ancle IdentityVerified.

## Checklist pre-mainnet

- [ ] Abogado revisa `docs/analisis-legal.md` y `/privacidad`
- [ ] Sumsub (o equivalente) en producción
- [ ] Proyecto Supabase activo + migración `001_init.sql`
- [ ] SBT y schemas en Polygon
- [ ] Paymaster con tope de gasto
- [ ] `NEXT_PUBLIC_DEMO_MODE=false`
