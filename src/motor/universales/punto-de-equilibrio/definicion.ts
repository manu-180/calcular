import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiPuntoDeEquilibrio {
  fijos: string;
  fijosAyuda: string;
  precio: string;
  variable: string;
  variableAyuda: string;
  objetivo: string;
  objetivoAyuda: string;
  unidades: string;
  facturacion: string;
  contribucion: string;
  contribucionAyuda: string;
  contribucionPct: string;
  unidadesObjetivo: string;
  facturacionObjetivo: string;
  errorPrecio: string;
  errorMargen: string;
  observacionRedondeo: string;
}

// Las unidades se redondean hacia arriba (no se vende media unidad); la facturación es la exacta del
// punto de equilibrio, que es como la presenta cualquier libro de costos.
export function equilibrio(fijos: number, precio: number, variable: number): { unidades: number; facturacion: number } {
  const contribucion = precio - variable;
  return { unidades: Math.ceil(fijos / contribucion - 1e-9), facturacion: (fijos * precio) / contribucion };
}

export function definir(ctx: ContextoUniversal, ui: UiPuntoDeEquilibrio): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "punto-de-equilibrio",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "fijos", tipo: "moneda", etiqueta: ui.fijos, ayuda: ui.fijosAyuda, min: 0, porDefecto: montoEjemplo(ctx, 5000) },
      { id: "precio", tipo: "moneda", etiqueta: ui.precio, min: 0, porDefecto: montoEjemplo(ctx, 50) },
      { id: "variable", tipo: "moneda", etiqueta: ui.variable, ayuda: ui.variableAyuda, min: 0, porDefecto: montoEjemplo(ctx, 30) },
      { id: "objetivo", tipo: "moneda", etiqueta: ui.objetivo, ayuda: ui.objetivoAyuda, min: 0, requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.precio <= 0) throw new ErrorEntrada(ui.errorPrecio, "precio");
      if (entrada.precio <= entrada.variable) throw new ErrorEntrada(ui.errorMargen, "variable");
      const contribucion = entrada.precio - entrada.variable;
      const base = equilibrio(entrada.fijos, entrada.precio, entrada.variable);
      const objetivo = entrada.objetivo ?? 0;
      const conObjetivo = objetivo > 0 ? equilibrio(entrada.fijos + objetivo, entrada.precio, entrada.variable) : null;
      const exactas = entrada.fijos / contribucion;
      return {
        unidades: base.unidades,
        facturacion: redondear(base.facturacion),
        contribucion: redondear(contribucion),
        contribucionPct: Math.round((contribucion / entrada.precio) * 1e8) / 1e6,
        unidadesObjetivo: conObjetivo ? conObjetivo.unidades : null,
        facturacionObjetivo: conObjetivo ? redondear(conObjetivo.facturacion) : null,
        observaciones: Math.abs(exactas - Math.round(exactas)) > 1e-9 ? [ui.observacionRedondeo] : [],
      };
    },
    resultado: [
      { clave: "unidades", etiqueta: ui.unidades, formato: "numero", decimales: 0, destacada: true },
      { clave: "facturacion", etiqueta: ui.facturacion, formato: "moneda", destacada: true },
      { clave: "contribucion", etiqueta: ui.contribucion, ayuda: ui.contribucionAyuda, formato: "moneda" },
      { clave: "contribucionPct", etiqueta: ui.contribucionPct, formato: "porcentaje", decimales: 2 },
      { clave: "unidadesObjetivo", etiqueta: ui.unidadesObjetivo, formato: "numero", decimales: 0 },
      { clave: "facturacionObjetivo", etiqueta: ui.facturacionObjetivo, formato: "moneda" },
    ],
  });
}
