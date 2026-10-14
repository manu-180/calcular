import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { formatearNumero } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiPropina {
  cuenta: string;
  porcentaje: string;
  porcentajeAyuda: string;
  personas: string;
  redondear: string;
  redondearAyuda: string;
  propina: string;
  total: string;
  porPersona: string;
  propinaEfectiva: string;
  errorPersonas: string;
  observacionRedondeo: (efectiva: string) => string;
}

export function definir(ctx: ContextoUniversal, ui: UiPropina): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "propina",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "cuenta", tipo: "moneda", etiqueta: ui.cuenta, min: 0, porDefecto: montoEjemplo(ctx, 60) },
      { id: "porcentaje", tipo: "porcentaje", etiqueta: ui.porcentaje, ayuda: ui.porcentajeAyuda, min: 0, max: 100, porDefecto: 10 },
      { id: "personas", tipo: "entero", etiqueta: ui.personas, min: 1, porDefecto: 1 },
      { id: "redondear", tipo: "si-no", etiqueta: ui.redondear, ayuda: ui.redondearAyuda, porDefecto: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.personas < 1 || !Number.isInteger(entrada.personas)) throw new ErrorEntrada(ui.errorPersonas, "personas");
      let propina = redondear((entrada.cuenta * entrada.porcentaje) / 100);
      let total = redondear(entrada.cuenta + propina);
      let porPersona = redondear(total / entrada.personas);
      let propinaEfectiva: number | null = null;
      const observaciones: string[] = [];
      if (entrada.redondear) {
        const arriba = Math.ceil(total / entrada.personas - 1e-9);
        if (arriba !== porPersona) {
          porPersona = arriba;
          total = redondear(arriba * entrada.personas);
          propina = redondear(total - entrada.cuenta);
          propinaEfectiva = entrada.cuenta > 0 ? redondear((propina / entrada.cuenta) * 100) : null;
          if (propinaEfectiva !== null) observaciones.push(ui.observacionRedondeo(formatearNumero(propinaEfectiva, ctx.locale)));
        }
      }
      return { propina, total, porPersona, propinaEfectiva, observaciones };
    },
    resultado: [
      { clave: "total", etiqueta: ui.total, formato: "moneda", destacada: true },
      { clave: "propina", etiqueta: ui.propina, formato: "moneda" },
      { clave: "porPersona", etiqueta: ui.porPersona, formato: "moneda" },
      { clave: "propinaEfectiva", etiqueta: ui.propinaEfectiva, formato: "porcentaje" },
    ],
  });
}
