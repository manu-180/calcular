import { formatARS } from "@/lib/formato";

// Vista previa de una hoja de la planilla paga, dibujada con los mismos colores que pone el
// generador (verde oscuro en los títulos, amarillo en lo que se completa, verde claro en lo que
// calcula) y con los números de fila reales del archivo: lo que se ve acá es lo que se abre en
// Excel, no una ilustración. Sin hooks: la usan la calculadora (cliente) y las landings (server).

export type FilaHoja = {
  /** Número de fila en el archivo. */
  fila?: number;
  etiqueta: string;
  valor?: number | string;
  tono?: "seccion" | "input" | "resultado" | "total";
  nota?: string;
};

export type HojaPrevia = {
  archivo: string;
  /** Pestañas del libro, en orden; la activa es `hoja`. */
  pestanas: string[];
  hoja: string;
  filas: FilaHoja[];
};

const FONDO: Record<NonNullable<FilaHoja["tono"]>, string> = {
  seccion: "bg-[#1B5E20] text-white",
  input: "bg-[#FFFDE7] text-zinc-900",
  resultado: "bg-[#F1F8F1] text-zinc-800",
  total: "bg-[#C8E6C9] text-zinc-950",
};

function valorTexto(v: FilaHoja["valor"]): string {
  if (v === undefined) return "";
  return typeof v === "number" ? formatARS(v, 0) : v;
}

export function HojaCalculo({ hoja, className = "" }: { hoja: HojaPrevia; className?: string }) {
  return (
    <figure
      className={`overflow-hidden rounded-xl bg-white text-[13px] leading-tight shadow-[var(--shadow-alzada)] ring-1 ring-zinc-900/10 ${className}`}
      aria-label={`Vista previa de la hoja «${hoja.hoja}» de ${hoja.archivo}`}
    >
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
        <span aria-hidden className="flex gap-1">
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
        </span>
        <svg aria-hidden viewBox="0 0 16 16" className="ml-1 size-3.5 shrink-0 text-emerald-700">
          <rect x="1.5" y="1.5" width="13" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.5 6h13M1.5 10.5h13M6 6v8.5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="truncate font-medium text-zinc-700">{hoja.archivo}</span>
      </div>

      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-8" />
          <col />
          <col className="w-[42%]" />
        </colgroup>
        <thead>
          <tr className="bg-zinc-100 text-[11px] font-medium text-zinc-500">
            <th scope="col" className="border-r border-b border-zinc-200 py-1" aria-label="Fila" />
            <th scope="col" className="border-r border-b border-zinc-200 py-1 font-medium">A</th>
            <th scope="col" className="border-b border-zinc-200 py-1 font-medium">B</th>
          </tr>
        </thead>
        <tbody>
          {hoja.filas.map((f, i) => {
            const tono = f.tono ?? "resultado";
            const n = (
              <td className="border-r border-b border-zinc-200 bg-zinc-100 text-center align-middle text-[11px] text-zinc-500 tabular-nums">
                {f.fila ?? ""}
              </td>
            );
            if (tono === "seccion") {
              return (
                <tr key={i}>
                  {n}
                  <th
                    scope="colgroup"
                    colSpan={2}
                    className={`border-b border-zinc-200 px-2.5 py-1.5 text-left text-[11px] font-semibold tracking-wide ${FONDO.seccion}`}
                  >
                    {f.etiqueta}
                  </th>
                </tr>
              );
            }
            const fuerte = tono === "total";
            return (
              <tr key={i} className={FONDO[tono]}>
                {n}
                <th
                  scope="row"
                  className={`border-r border-b border-zinc-200 px-2.5 py-1.5 text-left align-middle ${fuerte ? "font-semibold" : "font-normal"}`}
                >
                  {f.etiqueta}
                  {f.nota ? <span className="block text-[11px] font-normal text-zinc-500">{f.nota}</span> : null}
                </th>
                <td
                  className={`border-b border-zinc-200 px-2.5 py-1.5 align-middle ${
                    tono === "input" ? "text-left font-semibold" : "text-right tabular-nums"
                  } ${fuerte ? "font-semibold" : ""}`}
                >
                  <span className="block [overflow-wrap:anywhere]">{valorTexto(f.valor)}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex gap-px overflow-hidden border-t border-zinc-200 bg-zinc-100 px-2 pt-1 text-[11px]" aria-hidden>
        {hoja.pestanas.map((p) => (
          <span
            key={p}
            className={`shrink-0 truncate rounded-t-md px-2.5 py-1 ${
              p === hoja.hoja ? "bg-white font-semibold text-emerald-800 shadow-[0_-1px_0_#047857_inset]" : "text-zinc-500"
            }`}
          >
            {p}
          </span>
        ))}
      </div>
    </figure>
  );
}
