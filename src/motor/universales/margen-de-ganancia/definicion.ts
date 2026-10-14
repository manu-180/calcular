import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiMargenDeGanancia {
  modo: string;
  modoPrecio: string;
  modoMargen: string;
  modoMarkup: string;
  costo: string;
  costoAyuda: string;
  precio: string;
  precioAyuda: string;
  objetivo: string;
  objetivoAyuda: string;
  precioResultado: string;
  margen: string;
  margenAyuda: string;
  markup: string;
  markupAyuda: string;
  ganancia: string;
  errorCosto: string;
  errorFaltaPrecio: string;
  errorFaltaObjetivo: string;
  errorMargen100: string;
  observacionPerdida: string;
}

const r6 = (n: number) => Math.round(n * 1e6) / 1e6;

export function precioConMargen(costo: number, margen: number): number {
  return costo / (1 - margen / 100);
}

export function definir(ctx: ContextoUniversal, ui: UiMargenDeGanancia): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "margen-de-ganancia",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      {
        id: "modo",
        tipo: "opcion",
        etiqueta: ui.modo,
        opciones: [
          { valor: "precio", etiqueta: ui.modoPrecio },
          { valor: "margen", etiqueta: ui.modoMargen },
          { valor: "markup", etiqueta: ui.modoMarkup },
        ],
        porDefecto: "precio",
      },
      { id: "costo", tipo: "moneda", etiqueta: ui.costo, ayuda: ui.costoAyuda, min: 0, porDefecto: montoEjemplo(ctx, 60) },
      { id: "precio", tipo: "moneda", etiqueta: ui.precio, ayuda: ui.precioAyuda, min: 0, porDefecto: montoEjemplo(ctx, 100), requerido: false },
      { id: "objetivo", tipo: "porcentaje", etiqueta: ui.objetivo, ayuda: ui.objetivoAyuda, min: 0, max: 1000, porDefecto: 40, requerido: false },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.costo <= 0) throw new ErrorEntrada(ui.errorCosto, "costo");
      let precio: number;
      if (entrada.modo === "precio") {
        if (!entrada.precio) throw new ErrorEntrada(ui.errorFaltaPrecio, "precio");
        precio = entrada.precio;
      } else {
        if (entrada.objetivo === null) throw new ErrorEntrada(ui.errorFaltaObjetivo, "objetivo");
        if (entrada.modo === "margen" && entrada.objetivo >= 100) throw new ErrorEntrada(ui.errorMargen100, "objetivo");
        precio = redondear(entrada.modo === "margen" ? precioConMargen(entrada.costo, entrada.objetivo) : entrada.costo * (1 + entrada.objetivo / 100));
      }
      const ganancia = redondear(precio - entrada.costo);
      return {
        precio,
        margen: r6(((precio - entrada.costo) / precio) * 100),
        markup: r6(((precio - entrada.costo) / entrada.costo) * 100),
        ganancia,
        observaciones: ganancia < 0 ? [ui.observacionPerdida] : [],
      };
    },
    resultado: [
      { clave: "precio", etiqueta: ui.precioResultado, formato: "moneda", destacada: true },
      { clave: "margen", etiqueta: ui.margen, ayuda: ui.margenAyuda, formato: "porcentaje", decimales: 2, destacada: true },
      { clave: "markup", etiqueta: ui.markup, ayuda: ui.markupAyuda, formato: "porcentaje", decimales: 2 },
      { clave: "ganancia", etiqueta: ui.ganancia, formato: "moneda" },
    ],
  });
}
