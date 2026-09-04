export default function PrivacidadPage() {
  return (
    <article className="prose-sm max-w-3xl space-y-6 leading-relaxed">
      <p className="text-xs uppercase tracking-[0.2em] text-[#9a7420]">Documento de producto</p>
      <h1 className="font-display text-4xl">Política de privacidad y derecho al olvido</h1>
      <p>
        Este texto es el marco operativo de Pasaporte Profesional. No sustituye un
        dictamen de un abogado en cada país donde operemos.
      </p>
      <h2 className="font-display text-2xl">Qué tratamos</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>Datos de cuenta: correo, wallet, handle.</li>
        <li>CV declarativo: foto, bio, skills, enlaces, experiencia no firmada.</li>
        <li>KYC: solo un hash de unicidad. Nunca la cara ni el documento en claro.</li>
        <li>Credenciales: metadatos off-chain + hash y atestación EAS on-chain.</li>
        <li>Vault de integridad: resultado judicial/administrativo, off-chain, con plazo.</li>
      </ul>
      <h2 className="font-display text-2xl">Qué va a la blockchain (y no se puede borrar)</h2>
      <p>
        En Polygon solo se añaden sellos aditivos: títulos, empleo, representación
        de marca, compromiso de unicidad y el SBT de pasaporte. El texto (PDF,
        nombre de la materia) se borra de nuestros servidores si lo pides; en la
        cadena queda un hash opaco.
      </p>
      <h2 className="font-display text-2xl">Qué nunca va a la cadena</h2>
      <p>
        Antecedentes penales, requisitorias, “buscado por…”, sentencias, nombre
        legal en claro, foto, biometría cruda, ni un enum flagged ligado a tu
        wallet. Eso choca con GDPR art. 10 y 17, LGPD y normas latinas de casillero
        judicial: el olvido sería imposible.
      </p>
      <h2 className="font-display text-2xl">Cómo se borra el vault</h2>
      <p>
        Tú o una autoridad piden la baja. El validador (o el sistema) hace borrado
        duro de integrity_vault, grants y logs asociados. El CV no cambia. Polygon
        no tiene nada que desescribir. Plazo de conservación por defecto: hasta
        expires_at o 12 meses, lo que ocurra primero.
      </p>
      <h2 className="font-display text-2xl">Base legal (síntesis)</h2>
      <ul className="list-disc space-y-1 pl-5">
        <li>CV público: consentimiento e interés legítimo de identidad profesional.</li>
        <li>KYC / unicidad: prevención de fraude (anti-Sybil). El hash permanece.</li>
        <li>Vault: habilitación de una entidad oficial + consentimiento o norma local.</li>
        <li>Logs de grants: seguridad y auditoría, plazo corto.</li>
      </ul>
      <h2 className="font-display text-2xl">Account Abstraction</h2>
      <p>
        Si entras con correo, Privy crea una embedded wallet. El gas de las
        atestaciones de plataforma puede patrocinarse con un paymaster (Pimlico) en
        Polygon Amoy y, en producción, Polygon mainnet.
      </p>
    </article>
  );
}
