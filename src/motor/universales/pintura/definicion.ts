import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiPintura {
  modo: string;
  modoMedidas: string;
  modoSuperficie: string;
  largo: (u: string) => string;
  largoAyuda: string;
  alto: (u: string) => string;
  superficie: (u: string) => string;
  aberturas: (u: string) => string;
  aberturasAyuda: string;
  manos: string;
  rendimiento: (u: string) => string;
  rendimientoAyuda: string;
  recomendado: (u: string) => string;
  recomendadoAyuda: string;
  necesario: (u: string) => string;
  neta: (u: string) => string;
  errorMedidas: string;
  errorSuperficie: string;
  errorAberturas: string;
  errorRendimiento: string;
}

export const MARGEN = 0.1;
const r2 = (n: number) => redondear(n, { decimales: 2, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiPintura): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const ul = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const uv = imperial ? "gal" : "L";
  const rendimientoUnidad = imperial ? "ft²/gal" : "m²/L";
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "pintura",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      {
        id: "modo",
        tipo: "opcion",
        etiqueta: ui.modo,
        opciones: [
          { valor: "medidas", etiqueta: ui.modoMedidas },
          { valor: "superficie", etiqueta: ui.modoSuperficie },
        ],
        porDefecto: "medidas",
      },
      { id: "largo", tipo: "numero", etiqueta: ui.largo(ul), ayuda: ui.largoAyuda, min: 0, requerido: false, porDefecto: imperial ? 48 : 14 },
      { id: "alto", tipo: "numero", etiqueta: ui.alto(ul), min: 0, requerido: false, porDefecto: imperial ? 8 : 2.6 },
      { id: "superficie", tipo: "numero", etiqueta: ui.superficie(us), min: 0, requerido: false },
      { id: "aberturas", tipo: "numero", etiqueta: ui.aberturas(us), ayuda: ui.aberturasAyuda, min: 0, requerido: false, porDefecto: 0 },
      { id: "manos", tipo: "entero", etiqueta: ui.manos, min: 1, max: 10, porDefecto: 2 },
      { id: "rendimiento", tipo: "numero", etiqueta: ui.rendimiento(rendimientoUnidad), ayuda: ui.rendimientoAyuda, min: 0, porDefecto: imperial ? 350 : 10 },
    ],
    calcular(e) {
      let bruta: number;
      if (e.modo === "superficie") {
        if (!e.superficie || e.superficie <= 0) throw new ErrorEntrada(ui.errorSuperficie, "superficie");
        bruta = e.superficie;
      } else {
        if (!e.largo || e.largo <= 0) throw new ErrorEntrada(ui.errorMedidas, "largo");
        if (!e.alto || e.alto <= 0) throw new ErrorEntrada(ui.errorMedidas, "alto");
        bruta = e.largo * e.alto;
      }
      const aberturas = e.aberturas ?? 0;
      if (aberturas >= bruta) throw new ErrorEntrada(ui.errorAberturas, "aberturas");
      if (e.rendimiento <= 0) throw new ErrorEntrada(ui.errorRendimiento, "rendimiento");
      const neta = bruta - aberturas;
      const necesario = (neta * e.manos) / e.rendimiento;
      return { recomendado: r2(necesario * (1 + MARGEN)), necesario: r2(necesario), neta: r2(neta) };
    },
    resultado: [
      { clave: "recomendado", etiqueta: ui.recomendado(uv), ayuda: ui.recomendadoAyuda, formato: "numero", decimales: 2, destacada: true },
      { clave: "necesario", etiqueta: ui.necesario(uv), formato: "numero", decimales: 2 },
      { clave: "neta", etiqueta: ui.neta(us), formato: "numero" },
    ],
  });
}
