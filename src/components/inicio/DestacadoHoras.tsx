import Link from "next/link";
import { RUTA_HORAS_AR } from "@/lib/horas-ar/catalogo";
import { datosHorasAR } from "@/lib/horas-ar/datos";
import { duracion, minutosDe } from "@/lib/horas-ar/formato";

// La puerta del inicio a /cuantas-horas-de-trabajo, con el mismo lenguaje de la página (tinta, crema,
// esmeralda, la tarjeta de fichaje). Los números son reales: el precio oficial dividido por la hora del
// salario mínimo, porque en el inicio todavía no hay sueldo de nadie.
const MUESTRA = ["asado", "nafta", "cerveza", "canasta"];

function Fichaje({ horas }: { horas: number }) {
  return (
    <span className="grid grid-cols-8 gap-1.5" aria-hidden>
      {Array.from({ length: 40 }, (_, i) => {
        const lleno = Math.max(0, Math.min(1, horas - i));
        return (
          <span key={i} className="relative aspect-square overflow-hidden rounded-[4px] bg-[#f4f0e6]/[0.12]">
            {lleno > 0 ? <span className="absolute inset-y-0 left-0 bg-emerald-400" style={{ width: `${lleno * 100}%` }} /> : null}
          </span>
        );
      })}
    </span>
  );
}

export function DestacadoHoras() {
  let filas: { id: string; corto: string; minutos: number }[] = [];
  try {
    const d = datosHorasAR();
    const hora = d.minimo?.porHora;
    if (hora) filas = MUESTRA.flatMap((id) => d.items.filter((i) => i.id === id).map((i) => ({ id, corto: i.corto, minutos: minutosDe(i.monto, hora) })));
  } catch (err) {
    console.error("[inicio] destacado de horas", err);
  }
  const asado = filas.find((f) => f.id === "asado");

  return (
    <section aria-labelledby="horas-titulo" className="relative">
      <Link
        href={RUTA_HORAS_AR}
        className="group relative grid overflow-hidden rounded-[1.75rem] bg-[#0b1110] px-6 py-8 text-[#f4f0e6] outline-offset-4 sm:grid-cols-[1.1fr_1fr] sm:items-center sm:gap-10 sm:px-10 sm:py-10"
      >
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.22),transparent)]" />
        <span className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
            Nuevo · Con precios del INDEC
          </span>
          <span id="horas-titulo" className="mt-5 block text-[1.85rem] font-bold leading-[1.08] tracking-tight text-balance sm:text-[2.35rem]">
            ¿Cuántas horas de tu trabajo vale un kilo de asado?
          </span>
          <span className="mt-4 block max-w-md text-[15px] leading-relaxed text-pretty text-[#f4f0e6]/70">
            Poné tu sueldo y mirá cuánto de tu tiempo se va en el asado, la nafta o la canasta básica. Después armá tu tarjeta para Instagram o WhatsApp.
          </span>
          <span className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f4f0e6] px-5 text-[15px] font-semibold text-[#0b1110] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
            Calcular mis horas
            <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" aria-hidden>
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        {asado ? (
          <span className="relative mt-9 block sm:mt-0">
            <span className="block text-sm text-[#f4f0e6]/60">Con el salario mínimo, un kilo de asado cuesta</span>
            <span className="mt-1 block text-[2.75rem] font-bold leading-none tracking-[-0.045em] tabular-nums sm:text-[3.25rem]">{duracion(asado.minutos).texto}</span>
            <span className="mt-5 block max-w-[17rem]">
              <Fichaje horas={asado.minutos / 60} />
            </span>
            <span className="mt-6 grid grid-cols-3 gap-2 border-t border-[#f4f0e6]/10 pt-4 text-xs text-[#f4f0e6]/55">
              {filas
                .filter((f) => f.id !== "asado")
                .map((f) => (
                  <span key={f.id} className="block">
                    {f.corto}
                    <span className="mt-0.5 block text-[15px] font-semibold tabular-nums text-[#f4f0e6]">{duracion(f.minutos).texto}</span>
                  </span>
                ))}
            </span>
          </span>
        ) : null}
      </Link>
    </section>
  );
}
