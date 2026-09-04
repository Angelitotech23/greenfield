# Pasaporte Profesional

Plataforma de currículum público verificable. Los títulos y certificados pueden anclarse en Polygon (EAS + SBT). Los antecedentes penales **nunca** van a la blockchain: viven en un vault off-chain, borrable, detrás de un grant.

## Arranque

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abre http://localhost:3000. En modo demo (`NEXT_PUBLIC_DEMO_MODE=true`) no hace falta Privy ni Supabase.

### Cuentas demo

| Correo | Rol |
|--------|-----|
| pablo@saipit.example | Usuario verificado + emisor Saipit |
| maria@example.com | Credenciales Web2 amarillas |
| luis@example.com | Solo declarado (blanco) |
| registro@umsa.example | Emisor UMSA |
| integridad@example.com | Validador del vault |
| eventos@andes.example | Organizador |

CV público de ejemplo: [/pablo](http://localhost:3000/pablo). Grant de integridad demo: `/integridad/grant-pablo-demo`.

## Stack

Next.js 15 · Supabase (schema en `supabase/migrations`) · Privy · Polygon / EAS · Foundry (`contracts/`).

## Legal

Lee [docs/analisis-legal.md](docs/analisis-legal.md) y la ruta `/privacidad`.
