import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap space-y-4">
      <p className="kicker">404</p>
      <h1 className="font-display text-4xl">No está en el directorio</h1>
      <p className="text-ink-600">Ese handle no existe o es una ruta reservada.</p>
      <Link href="/explorar" className="text-cover-rose underline decoration-foil underline-offset-4">
        Volver a explorar
      </Link>
    </div>
  );
}
