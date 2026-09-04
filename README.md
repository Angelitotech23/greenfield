# Pasaporte Profesional

Hay un momento que se repite en toda contratación seria: alguien te pide el currículum, lo lee, y tiene que decidir si te cree.

Hoy esa decisión se resuelve con capturas, PDFs editables y llamadas que nadie tiene tiempo de hacer. El título puede ser real. También puede no serlo. Desde fuera, se ve igual.

**Pasaporte Profesional** nace para cortar esa duda.

No es una red social. No es un muro de logros. Es un currículum público que se puede mostrar con un enlace, un código QR o un toque, y en el que lo importante no lo afirma solo el candidato: lo firma quien lo otorgó.

---

## La idea, en una frase

Que una universidad, una empresa o un emisor reconocido pueda dejar constancia de un título, un empleo o un certificado, y que cualquiera —un reclutador, un socio, una institución— pueda comprobarlo sin pedirte el WhatsApp, sin instalar una app y sin tener que “confiar en la foto”.

Lo que tú declaras sigue siendo tuyo. Lo que otro firma, se distingue. Lo que no debe ser público, no lo es.

---

## Un ejemplo: el evento

Estás en un congreso, una feria, un after. Alguien se acerca. Es extranjero, o no. Da igual. Se presenta como CEO, como “head of”, como alguien que lleva tres años en una empresa que todos reconocen. Saca el teléfono y te muestra su LinkedIn: foto seria, cargo en grande, Google, un fondo, una historia redonda.

Cualquiera puede editar su LinkedIn y parecer alguien importante. No hace falta que Google lo confirme. No hace falta que la empresa lo sepa. Tres horas antes del evento puedes escribir que fuiste CEO, que trabajaste tres años ahí, que lideras un equipo. LinkedIn te deja publicarlo. El perfil no pregunta. No firma nadie más que tú.

Ese es el hueco: **un perfil autoeditado no es una prueba**. Es una declaración con buena tipografía.

Tú asientes. Pedirle una demostración —un contrato, un correo corporativo, una llamada a RH— es incómodo. Si el cargo es real, quedas como desconfiado. Si no lo es, ya le diste la conversación, la foto juntos, tal vez una intro a tu red.

Ahí es donde hoy se pierde la verdad: no porque la gente sea ingenua, sino porque **no hay una forma elegante de verificar sin ofender**.

Con Pasaporte Profesional esa escena cambia de tono, no de cortesía. La persona te pasa un QR o un enlace. Abres su hoja. Si el cargo en esa compañía está **firmado por la compañía**, se ve. Si solo lo escribió él, también se ve —y se ve como eso: una declaración. No tienes que interrogarlo. No tienes que creerle al LinkedIn. La diferencia está en la página, a la vista de los dos.

El que sí es CEO no se siente acusado: se siente respaldado. El que no lo es deja de tener un escenario tan barato.

Eso es lo que resolvemos. Confianza en el pasillo, sin el mal gesto de pedir papeles.

---

## Cómo funciona

No hace falta entender cadenas ni servidores. El sistema tiene cuatro movimientos, siempre los mismos.

**1. Tú armas tu hoja.**  
Creas un perfil público con tu nombre, tu oficio y tu historia. Eso es tuyo: lo editas cuando quieras. Hasta aquí se parece a cualquier currículum. La diferencia empieza en el paso siguiente.

**2. Quien te otorgó algo puede firmarlo.**  
Una universidad, una empresa, un emisor de certificados entra por su lado —no por el tuyo— y deja constancia: este título, este cargo, este tiempo en la compañía. Esa firma no la pones tú. Si mañana dejas de ser CEO, la empresa puede retirar el sello. Si nunca lo fuiste, no hay sello que mostrar.

**3. Lo firmado queda comprobable.**  
La declaración vive en tu perfil. La firma vive en un registro público que no depende de que tú (ni LinkedIn) lo hayas escrito bien. Cualquiera que abra tu hoja puede ver, en el acto, qué es relato y qué está respaldado. No tiene que llamar a RH. No tiene que pedirte el contrato. La página ya lo dice.

Hay tres lecturas, a propósito simples:

| Lo que ves | Qué significa | ¿Lo puede inventar el titular? |
| --- | --- | --- |
| **Declarado** | Lo escribió él. Se puede borrar o cambiar. | Sí. Es su palabra. |
| **Contrastado** | Ya existía en un emisor conocido (un curso, una certificación). Se consultó ahí. | No a gusto. Hay que pasar por ese emisor. |
| **Firmado** | Lo selló la institución o la empresa. Se puede comprobar. Si lo revocan, deja de valer. | No. |

**4. Lo compartes sin app.**  
Un enlace. Un QR. Un toque. La otra persona abre el currículum en el teléfono, ahí mismo, en el evento. Verde o firmado: puedes creerle sin poner cara rara. Solo declarado: también lo ves, y decides tú cuánto peso le das. Nadie queda interrogado en público.

Eso es el producto en marcha: **no reemplazamos la conversación; le quitamos la mentira fácil.**

---

## Lo que deliberadamente no hacemos

Un currículum no es un expediente judicial.

Los datos sensibles —antecedentes, procesos, cualquier cosa que una persona tiene derecho a que no quede grabada para siempre en un registro público— **no van al libro abierto**. Viven aparte, con acceso controlado, con posibilidad de borrar, y fuera de lo que un buscador o un extraño debería indexar.

El perfil público puede, como máximo, indicar que existe un canal discreto para quien tenga motivo y permiso. Nunca convierte la vida penal de alguien en un sello de vitrina.

Eso no es un detalle técnico. Es una decisión de diseño y de respeto.

El marco está en [`docs/analisis-legal.md`](docs/analisis-legal.md): a Polygon van hashes, títulos, empleo y el SBT del pasaporte. No van nombre en claro, foto, biometría ni antecedentes.

---

## Para quién es

Para profesionales que quieren que su trayectoria se pueda enseñar sin pedir permiso a una plataforma de terceros.

Para instituciones que ya emiten títulos o constancias y quieren que esa firma se vea donde el candidato se presenta.

Para quien evalúa personas y está cansado de adivinar.

LatAm es el terreno natural: movilidad, informalidad, títulos reales que no viajan bien, y una necesidad concreta de confianza sin burocracia extra.

---

## Arquitectura

La app es un monolito [Next.js 15](https://nextjs.org/) (App Router). La cadena no es el producto: es el ancla de lo firmado. El currículum, la visibilidad y el casillero de integridad viven off-chain.

```
Titular / emisor / validador / reclutador
                 │
            Next.js 15
                 │
            API routes
        ┌────────┼────────┐
        │        │        │
   Perfil CV   EAS/SBT   Vault
   (off-chain) (Polygon) (off-chain, borrable)
```

| Pieza | Rol |
| --- | --- |
| **Next.js 15 + React 19 + Tailwind** | UI, rutas públicas y paneles por rol |
| **Store de aplicación** | Perfiles, credenciales, grants y eventos |
| **Ethereum Attestation Service (EAS)** | Atestaciones en Polygon Amoy (`80002`) o mainnet (`137`) |
| **`ReputationPassport`** | NFT soulbound (ERC-5192): un pasaporte por wallet |
| **`IssuerResolver`** | Allowlist de wallets que pueden firmar |
| **Supabase** | Esquema SQL listo en `supabase/migrations/`; persistencia de producción |
| **Privy + Pimlico** | Login Web2, embedded wallet y gas patrocinado |
| **Sumsub** | KYC y prueba de unicidad (hash, no PII on-chain) |

Schemas EAS permitidos (solo hashes, sin dato penal): `IdentityVerified`, `AcademicCredential`, `EmploymentAttestation`, `BrandRepresentation`, `Web2Credential`.

Prohibidos de forma explícita: `BackgroundCheck`, `CriminalRecord`, `Warrant`, `flagged`.

---

## Flujo en el sistema

1. **Entrar** en `/auth` (correo, wallet o una persona de demo).
2. **Armar el CV** en `/app`: titular, bio, skills, experiencia declarada, visibilidad.
3. **Identidad** en `/onboarding`: KYC, nombre legal bloqueado, compromiso de unicidad.
4. **Contrastar** un curso Web2 (DataCamp, Microsoft Learn, Coursera) desde credenciales.
5. **Firmar** desde `/issuer`: la universidad o la empresa emite el sello; el titular no puede editarlo.
6. **Mostrar** `/{handle}` o el QR. El reclutador ve declarado / contrastado / firmado.
7. **Integridad** (si aplica): el validador carga el vault off-chain; el titular comparte un grant. Esa página no se indexa. Borrar el vault no toca Polygon porque ahí no había dato penal.

Roles: `user`, `issuer`, `validator`, `organizer`, `admin`.

---

## Estructura del repositorio

| Ruta | Qué hay |
| --- | --- |
| `app/` | Páginas (marketing, CV público, paneles) y `app/api/` |
| `app/[handle]/` | Currículum público |
| `components/` | CV, semáforo, QR, formularios por rol |
| `lib/store/` | Estado de la app y seed de demostración |
| `lib/eas/` | Schemas y cliente EAS |
| `lib/auth/` | Sesión y roles |
| `contracts/src/` | `ReputationPassport.sol` e `IssuerResolver.sol` |
| `supabase/migrations/` | Esquema off-chain |
| `docs/analisis-legal.md` | Qué va on-chain y qué no |
| `docs/mainnet.md` | Checklist hacia Amoy / mainnet |
| `.env.example` | Variables de entorno |

---

## Cómo arrancarlo

Hace falta Node.js 20 o superior.

```bash
git clone https://github.com/Angelitotech23/greenfield.git
cd greenfield
npm install
```

Copia `.env.example` a `.env.local`. Con `NEXT_PUBLIC_DEMO_MODE=true` (el valor por defecto) no hace falta Privy, Supabase ni una wallet con MATIC.

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). En `/auth` puedes entrar con estas personas:

| Persona | Correo | Qué ver |
| --- | --- | --- |
| Pablo | `pablo@saipit.example` | Titular con sello + emisor |
| María | `maria@example.com` | Credenciales Web2 |
| Luis | `luis@example.com` | Solo declarado, sin KYC |
| UMSA | `registro@umsa.example` | Emisor académico |
| Mesa de integridad | `integridad@example.com` | Validador (vault off-chain) |
| Laboratorio de eventos | `eventos@andes.example` | Organizador / check-in |

CV de ejemplo: [/pablo](http://localhost:3000/pablo).

Contratos (Foundry), cuando toque desplegar:

```bash
cd contracts
forge build
```

El resto del camino a cadena —schemas EAS, SBT, Privy, paymaster, Sumsub— está en [`docs/mainnet.md`](docs/mainnet.md).

---

## Estado de este repositorio

Esto es el producto en demostración, no un registro de producción.

- El semáforo, los roles y el CV público se pueden recorrer ahora.
- En demo, el estado vive en memoria del servidor: se reinicia con el proceso.
- Las atestaciones EAS y el mint del SBT se simulan hasta completar el checklist de `docs/mainnet.md` y poner `NEXT_PUBLIC_DEMO_MODE=false`.
- La migración de Supabase describe el destino de los datos; hay que cablearla para persistir.

Si quieres verlo en movimiento: crea un perfil, abre el directorio, entra a un currículum y fíjate qué está solo declarado y qué está firmado. Esa diferencia es toda la mecánica.

---

## Autoría y derechos

Esta idea, este producto y el trabajo contenido en este repositorio pertenecen exclusivamente a **Jhon Angelo Rivera Cartagena**.

Están protegidos por derechos de autor. Queda prohibido copiar, reproducir, adaptar, distribuir, explotar comercialmente o usar esta idea, este diseño o este código, en todo o en parte, sin aprobación expresa y previa del autor.

Si no hay esa aprobación, no hay licencia.

© Jhon Angelo Rivera Cartagena. Todos los derechos reservados.
