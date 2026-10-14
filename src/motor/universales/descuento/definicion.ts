import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiDescuento {
  precio: string;
  descuento: string;
  segundoDescuento: string;
  segundoDescuentoAyuda: string;
  ahorro: string;
  final: string;
  descuentoTotal: string;
  errorMayorA100: string;
  observacionDoble: (efectivo: string) => string;
}

export function definir(ctx: ContextoUniversal, ui: UiDescuento): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "descuento",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "precio", tipo: "moneda", etiqueta: ui.precio, min: 0, porDefecto: montoEjemplo(ctx, 80) },
      { id: "descuento", tipo: "porcentaje", etiqueta: ui.descuento, min: 0, max: 100, porDefecto: 25 },
      { id: "segundo", tipo: "porcentaje", etiqueta: ui.segundoDescuento, ayuda: ui.segundoDescuentoAyuda, min: 0, max: 100, requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.descuento > 100) throw new ErrorEntrada(ui.errorMayorA100, "descuento");
      const segundo = entrada.segundo ?? 0;
      const final = redondear(entrada.precio * (1 - entrada.descuento / 100) * (1 - segundo / 100));
      const ahorro = redondear(entrada.precio - final);
      const efectivo = entrada.precio > 0 ? redondear((ahorro / entrada.precio) * 100) : 0;
      return {
        final,
        ahorro,
        efectivo,
        observaciones: segundo > 0 ? [ui.observacionDoble(String(efectivo))] : [],
      };
    },
    resultado: [
      { clave: "final", etiqueta: ui.final, formato: "moneda", destacada: true },
      { clave: "ahorro", etiqueta: ui.ahorro, formato: "moneda" },
      { clave: "efectivo", etiqueta: ui.descuentoTotal, formato: "porcentaje" },
    ],
  });
}
