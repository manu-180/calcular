import type { Rango } from "@/lib/panel/tipos";
import { antes, contra, porcentaje, textoVariacion, variacion } from "@/lib/panel/formato";

export function Delta({ valor, anterior, rango }: { valor: number; anterior: number; rango: Rango }) {
  const v = variacion(valor, anterior);
  const completo =
    v.tipo === "sube" || v.tipo === "baja"
      ? `${textoVariacion(v)} que ${contra(rango)}`
      : v.tipo === "nuevo"
        ? `nuevo: ${antes(rango)} no hubo`
        : v.tipo === "igual"
          ? `igual que ${contra(rango)}`
          : `sin movimiento, tampoco ${antes(rango)}`;
  const base = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums ring-1 ring-inset";
  let visible: string;
  let clase: string;
  switch (v.tipo) {
    case "sube":
      visible = `↑ ${porcentaje(v.pct, v.pct < 0.1 ? 1 : 0)}`;
      clase = "bg-emerald-50 text-emerald-800 ring-emerald-700/15";
      break;
    case "baja":
      visible = `↓ ${porcentaje(v.pct, v.pct < 0.1 ? 1 : 0)}`;
      clase = "bg-rose-50 text-rose-700 ring-rose-700/15";
      break;
    case "nuevo":
      visible = "Nuevo";
      clase = "bg-sky-50 text-sky-800 ring-sky-700/15";
      break;
    case "igual":
      visible = "= Igual";
      clase = "bg-zinc-100 text-zinc-700 ring-zinc-900/[0.06]";
      break;
    default:
      visible = "Sin cambios";
      clase = "bg-zinc-100 text-zinc-600 ring-zinc-900/[0.06]";
  }
  return (
    <span className={`${base} ${clase}`} title={completo}>
      <span aria-hidden>{visible}</span>
      <span className="sr-only">{completo}</span>
    </span>
  );
}

export function DeltaTexto({ valor, anterior, rango }: { valor: number; anterior: number; rango: Rango }) {
  const v = variacion(valor, anterior);
  if (v.tipo === "vacio") return null;
  const color =
    v.tipo === "sube" ? "text-emerald-700" : v.tipo === "baja" ? "text-rose-700" : "text-zinc-600";
  const flecha = v.tipo === "sube" ? "↑ " : v.tipo === "baja" ? "↓ " : "";
  const texto =
    v.tipo === "nuevo" ? `Nuevo: ${antes(rango)} no hubo` : `${textoVariacion(v)} que ${contra(rango)}`;
  return (
    <span className={`text-sm font-medium ${color}`}>
      <span aria-hidden>{flecha}</span>
      {texto}
    </span>
  );
}
