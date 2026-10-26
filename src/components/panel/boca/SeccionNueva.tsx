import type { BocaDatos } from "@/lib/panel/tipos";
import { SECCION_NUEVA, separarSeccion, type LadoSeccion } from "@/lib/panel/boca";
import { deCada100, numero, plural } from "@/lib/panel/formato";
import { Bloque, origen } from "./comun";

const unDecimal = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });

function Lado({ titulo, lado, destacado }: { titulo: string; lado: LadoSeccion; destacado?: boolean }) {
  const rinde = lado.compartidos ? unDecimal.format(lado.llegadas / lado.compartidos) : null;
  return (
    <div
      className={`rounded-2xl p-4 ring-1 ring-inset ${destacado ? "bg-emerald-50/60 ring-emerald-900/[0.08]" : "bg-zinc-50/80 ring-zinc-900/[0.05]"}`}
    >
      <p className={`text-xs font-medium ${destacado ? "text-emerald-800" : "text-zinc-600"}`}>{titulo}</p>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <dt className="text-xs text-zinc-600">Compartidos</dt>
          <dd className="mt-0.5 text-2xl font-semibold tracking-[-0.02em] tabular-nums text-zinc-900">{numero(lado.compartidos)}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-600">Llegaron por esos links</dt>
          <dd className="mt-0.5 text-2xl font-semibold tracking-[-0.02em] tabular-nums text-zinc-900">{numero(lado.llegadas)}</dd>
        </div>
        <div className="col-span-2 text-xs leading-relaxed text-zinc-600">
          {lado.llegadas
            ? `${plural(lado.nuevas, "nueva", "nuevas")} · ${deCada100(lado.usaron / lado.llegadas)} usaron una calculadora`
            : "Todavía no llegó nadie por acá"}
          {rinde ? ` · ${rinde} por compartido` : ""}
        </div>
      </dl>
    </div>
  );
}

export function SeccionNueva({ boca }: { boca: BocaDatos }) {
  const { nueva, resto } = separarSeccion(boca.origenes);
  const huerfanas = nueva.llegadas > 0 && nueva.compartidos === 0;
  return (
    <Bloque
      titulo={`${origen(SECCION_NUEVA)} contra todo lo demás`}
      significa="Lo que salió de la sección nueva, separado del resto del sitio. Una llegada cuenta acá por la marca que trae el link, aunque el compartido no se haya medido."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Lado titulo={origen(SECCION_NUEVA)} lado={nueva} destacado />
        <Lado titulo="Todo lo demás" lado={resto} />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-zinc-600">
        {huerfanas
          ? "Llegó gente por links de esta sección que no figuran como compartidos: casi seguro los compartiste vos. Tu navegador no se mide desde que abriste el panel, así que tus compartidos no suman, pero la gente que entra por ellos sí."
          : "Tus propios compartidos no suman: tu navegador no se mide desde que abriste el panel. La gente que entra por tus links sí cuenta."}
      </p>
    </Bloque>
  );
}
