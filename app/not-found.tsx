import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-4xl">No está en el directorio</h1>
      <p>Ese handle no existe o es una ruta reservada.</p>
      <Link href="/explorar" className="underline">
        Volver a explorar
      </Link>
    </div>
  );
}
