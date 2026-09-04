# Análisis del tema legal — split on-chain / off-chain

Este documento es el marco de diseño. **No sustituye un dictamen jurídico** en Bolivia ni en los países donde haya usuarios o consultantes.

## El problema

Polygon es un registro público append-only. Si un antecedente, una requisitoria o un enum `flagged` queda ligado a la wallet de Pablo, el **derecho al olvido no se puede cumplir**, aunque él hubiera consentido antes.

## Normas que importan (síntesis)

- **GDPR** arts. 9 (biometría), 10 (condenas e infracciones) y 17 (supresión). Efecto extra-territorial.
- **LGPD (Brasil)** y leyes de LatAm (Argentina 25.326, Chile, régimen boliviano / Ley 164): el casillero no es un “skill”.
- **Presunción de inocencia / injuria:** publicar “buscado por fraude” sin fuente oficial es un riesgo civil y penal para la plataforma.
- En Bolivia, el certificado de antecedentes lo emiten entidades habilitadas. La plataforma solo muestra lo que esa entidad cargó, con plazo.

## Qué sí va on-chain

Títulos, empleo, representación de marca, compromiso de unicidad (hash) y el SBT de pasaporte. Texto y PDF se borran off-chain; queda el hash.

## Qué nunca va on-chain

Antecedentes, requisitorias, procesos, sentencias, nombre en claro, foto, biometría cruda, ni `clean`/`flagged` público.

No existe schema EAS `BackgroundCheck`.

## Cómo se borra

El vault (`integrity_vault`) es off-chain. El CV solo redirige a `/integridad/[grant]` (no indexable, auditado). Al borrar el vault, Polygon no tiene nada que desescribir.

## Procedimiento de baja

1. Solicitud del titular o de autoridad.
2. Borrado duro de vault, grants y logs.
3. El CV y los sellos profesionales no cambian (el texto de credenciales sí puede ocultarse).
4. El `uniqueness_hash` permanece por anti-Sybil (base: prevención de fraude).
