import Link from "next/link";
import { fechaLargaNovedad, ultimoCambio } from "@/lib/novedades";
import { PuntoVivo } from "./piezas";

// La fecha sale del registro de novedades, no del reloj ni del build: si dijera "hoy" en cada
// deploy, afirmaría una revisión que quizá no hubo.
export function UltimoCambio({ className = "" }: { className?: string }) {
  const fecha = ultimoCambio();
  if (!fecha) return null;
  return (
    <p className={`inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-600 ${className}`}>
      <PuntoVivo />
      <span>
        Último dato oficial cargado el <time dateTime={fecha}>{fechaLargaNovedad(fecha)}</time>
      </span>
      <span aria-hidden className="text-zinc-300">
        ·
      </span>
      <Link
        href="/novedades"
        prefetch={false}
        className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-2 transition-colors hover:text-emerald-800 hover:decoration-emerald-400"
      >
        Ver novedades
      </Link>
    </p>
  );
}
