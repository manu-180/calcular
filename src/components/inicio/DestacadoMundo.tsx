import Link from "next/link";

// Mismo lenguaje que /sueldo-en-el-mundo (tinta, brillo esmeralda, el año en puntos) para que la
// tarjeta se lea como la puerta de esa página. El año es fijo y decorativo: el día real lo calcula la
// página con el sueldo de cada uno.
const MESES = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DIA_EJEMPLO = 128;
const CELDA = 9;
const HUECO = 4;

function AnioEnPuntos() {
  let dia = 0;
  const ancho = 31 * (CELDA + HUECO) - HUECO;
  const alto = 12 * (CELDA + HUECO) - HUECO;
  return (
    <svg viewBox={`0 0 ${ancho} ${alto}`} className="h-auto w-full" aria-hidden>
      {MESES.flatMap((dias, fila) =>
        Array.from({ length: dias }, (_, col) => {
          dia += 1;
          const r = CELDA / 2;
          const cx = col * (CELDA + HUECO) + r;
          const cy = fila * (CELDA + HUECO) + r;
          if (dia === DIA_EJEMPLO) {
            return (
              <g key={`${fila}-${col}`}>
                <circle cx={cx} cy={cy} r={r + 3.5} fill="#34d399" opacity="0.22" />
                <circle cx={cx} cy={cy} r={r} fill="#34d399" />
              </g>
            );
          }
          return <circle key={`${fila}-${col}`} cx={cx} cy={cy} r={r} fill={dia < DIA_EJEMPLO ? "#f4f0e6" : "#1f3a31"} />;
        }),
      )}
    </svg>
  );
}

export function DestacadoMundo() {
  return (
    <section aria-labelledby="mundo-titulo" className="relative">
      <Link
        href="/sueldo-en-el-mundo"
        className="group relative grid overflow-hidden rounded-[1.75rem] bg-[#0b1110] px-6 py-8 text-[#f4f0e6] outline-offset-4 sm:grid-cols-[1.15fr_1fr] sm:items-center sm:gap-10 sm:px-10 sm:py-10"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.22),transparent)]"
        />
        <span className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 px-3 py-1 text-xs font-medium tracking-wide text-emerald-300">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
            Nuevo · Día de libertad tributaria
          </span>
          <span id="mundo-titulo" className="mt-5 block text-[1.85rem] font-bold leading-[1.08] tracking-tight text-balance sm:text-[2.35rem]">
            ¿Hasta qué día del año trabajás para el Estado?
          </span>
          <span className="mt-4 block max-w-md text-[15px] leading-relaxed text-pretty text-[#f4f0e6]/70">
            Poné tu sueldo y mirá tu fecha. Después comparalo, con el mismo poder de compra, en más de 40
            países, y armá tu tarjeta para Instagram.
          </span>
          <span className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f4f0e6] px-5 text-[15px] font-semibold text-[#0b1110] transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
            Calcular mi fecha
            <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" aria-hidden>
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
        <span className="relative mt-9 block sm:mt-0">
          <AnioEnPuntos />
          <span className="mt-3 flex items-center justify-between text-xs text-[#f4f0e6]/55">
            <span>Enero</span>
            <span className="text-emerald-300">Desde acá, lo que ganás es tuyo</span>
            <span>Diciembre</span>
          </span>
        </span>
      </Link>
    </section>
  );
}
