import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiIva {
  operacion: string;
  agregar: string;
  quitar: string;
  monto: string;
  montoAyuda: string;
  otraTasa: string;
  otraTasaAyuda: string;
  neto: string;
  impuesto: string;
  total: string;
  tasaUsada: string;
  errorTasa: string;
}

export function definir(ctx: ContextoUniversal, ui: UiIva): DefinicionCalculadora {
  const claveTasa = ctx.datos.tasa;
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "iva",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: { [claveTasa]: "numero" },
    campos: [
      {
        id: "operacion",
        tipo: "opcion",
        etiqueta: ui.operacion,
        opciones: [
          { valor: "agregar", etiqueta: ui.agregar },
          { valor: "quitar", etiqueta: ui.quitar },
        ],
        porDefecto: "agregar",
      },
      { id: "monto", tipo: "moneda", etiqueta: ui.monto, ayuda: ui.montoAyuda, min: 0, porDefecto: montoEjemplo(ctx, 100) },
      { id: "otraTasa", tipo: "porcentaje", etiqueta: ui.otraTasa, ayuda: ui.otraTasaAyuda, min: 0, max: 100, requerido: false },
    ],
    calcular(e, valores, { redondear }) {
      const tasa = e.otraTasa ?? valores[claveTasa];
      if (typeof tasa !== "number" || !Number.isFinite(tasa) || tasa < 0) throw new ErrorEntrada(ui.errorTasa, "otraTasa");
      let neto: number;
      let impuesto: number;
      let total: number;
      if (e.operacion === "quitar") {
        total = redondear(e.monto);
        neto = redondear(e.monto / (1 + tasa / 100));
        impuesto = redondear(total - neto);
      } else {
        neto = redondear(e.monto);
        impuesto = redondear((e.monto * tasa) / 100);
        total = redondear(neto + impuesto);
      }
      return { neto, impuesto, total, tasaUsada: tasa };
    },
    resultado: [
      { clave: "total", etiqueta: ui.total, formato: "moneda", destacada: true },
      { clave: "neto", etiqueta: ui.neto, formato: "moneda" },
      { clave: "impuesto", etiqueta: ui.impuesto, formato: "moneda" },
      { clave: "tasaUsada", etiqueta: ui.tasaUsada, formato: "porcentaje" },
    ],
  });
}
