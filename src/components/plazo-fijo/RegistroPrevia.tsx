import { formatARS, formatPct } from "@/lib/formato";
import type { FilaRegistro } from "@/components/plazo-fijo/hojas";

// La hoja «Mis plazos fijos» es ancha (15 columnas): la previa muestra las cuatro que la persona
// mira, con sus letras reales, en la misma piel que HojaCalculo. Sin hooks: sirve en server y cliente.

const COLS = [
  { letra: "A", titulo: "Banco" },
  { letra: "F", titulo: "Vence el" },
  { letra: "H", titulo: "Cobrás" },
  { letra: "L", titulo: "Tasa real" },
] as const;

export function RegistroPrevia({ archivo, fila, pestanas }: { archivo: string; fila: FilaRegistro; pestanas: string[] }) {
  const real = `${fila.realPct >= 0 ? "+" : ""}${formatPct(fila.realPct, 2)}`;
  return (
    <figure
      className="overflow-hidden rounded-xl bg-white text-[12px] leading-tight shadow-[var(--shadow-alzada)] ring-1 ring-zinc-900/10 sm:text-[13px]"
      aria-label={`Vista previa de la hoja «Mis plazos fijos» de ${archivo}`}
    >
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2">
        <span aria-hidden className="flex gap-1">
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
          <span className="size-2.5 rounded-full bg-zinc-300" />
        </span>
        <span className="ml-1 truncate font-medium text-zinc-700">{archivo}</span>
      </div>

      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-7" />
          <col className="w-[22%]" />
          <col className="w-[26%]" />
          <col className="w-[28%]" />
          <col />
        </colgroup>
        <thead>
          <tr className="bg-zinc-100 text-[11px] font-medium text-zinc-500">
            <th scope="col" className="border-r border-b border-zinc-200 py-1" aria-label="Fila" />
            {COLS.map((c) => (
              <th key={c.letra} scope="col" className="border-r border-b border-zinc-200 py-1 font-medium last:border-r-0">
                {c.letra}
              </th>
            ))}
          </tr>
          <tr className="bg-[#2E7D32] text-[11px] font-semibold text-white">
            <td className="border-r border-b border-zinc-200 bg-zinc-100 text-center text-zinc-500 tabular-nums">14</td>
            {COLS.map((c) => (
              <th key={c.letra} scope="col" className="border-r border-b border-white/20 px-2 py-1.5 text-left last:border-r-0">
                {c.titulo}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-r border-b border-zinc-200 bg-zinc-100 text-center text-[11px] text-zinc-500 tabular-nums">{fila.fila}</td>
            <td className="border-r border-b border-zinc-200 bg-[#FFFDE7] px-2 py-2 text-zinc-400 italic">tu banco</td>
            <td className="border-r border-b border-zinc-200 bg-[#F1F8F1] px-2 py-2 tabular-nums text-zinc-800">{fila.vence}</td>
            <td className="border-r border-b border-zinc-200 bg-[#C8E6C9] px-2 py-2 text-right font-semibold tabular-nums text-zinc-950">
              <span className="block [overflow-wrap:anywhere]">{formatARS(fila.cobras, 0)}</span>
            </td>
            <td className="border-b border-zinc-200 bg-[#F1F8F1] px-2 py-2 text-right tabular-nums text-zinc-800">{real}</td>
          </tr>
          {[1, 2].map((n) => (
            <tr key={n} aria-hidden>
              <td className="border-r border-b border-zinc-200 bg-zinc-100 text-center text-[11px] text-zinc-500 tabular-nums">{fila.fila + n}</td>
              <td className="border-r border-b border-zinc-200 bg-[#FFFDE7] py-2" />
              <td className="border-r border-b border-zinc-200 py-2" />
              <td className="border-r border-b border-zinc-200 py-2" />
              <td className="border-b border-zinc-200 py-2" />
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-zinc-200 bg-white px-3 py-2 text-[11px] leading-snug text-zinc-500">
        {fila.resultado}. Cuando el INDEC publique el IPC de esos meses, la fila pasa sola al dato oficial.
      </p>

      <div className="flex gap-px overflow-hidden border-t border-zinc-200 bg-zinc-100 px-2 pt-1 text-[11px]" aria-hidden>
        {pestanas.map((p) => (
          <span
            key={p}
            className={`shrink-0 truncate rounded-t-md px-2.5 py-1 ${
              p === "Mis plazos fijos" ? "bg-white font-semibold text-emerald-800 shadow-[0_-1px_0_#047857_inset]" : "text-zinc-500"
            }`}
          >
            {p}
          </span>
        ))}
      </div>
    </figure>
  );
}
