import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { Campo, DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiImc {
  peso: (unidad: string) => string;
  altura: (unidad: string) => string;
  pies: string;
  pulgadas: string;
  imc: string;
  categoria: string;
  pesoMin: (unidad: string) => string;
  pesoMax: (unidad: string) => string;
  rangoAyuda: string;
  bajo: string;
  normal: string;
  sobrepeso: string;
  obesidad1: string;
  obesidad2: string;
  obesidad3: string;
  errorPeso: string;
  errorAltura: string;
  aviso: string;
}

export const KG_POR_LB = 0.45359237;
export const M_POR_PULGADA = 0.0254;

const r1 = (n: number) => redondear(n, { decimales: 1, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiImc): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const unidadPeso = imperial ? "lb" : "kg";
  const campos: Campo[] = imperial
    ? [
        { id: "peso", tipo: "numero", etiqueta: ui.peso("lb"), min: 0, porDefecto: 160 },
        { id: "pies", tipo: "entero", etiqueta: ui.pies, min: 0, max: 8, porDefecto: 5 },
        { id: "pulgadas", tipo: "numero", etiqueta: ui.pulgadas, min: 0, max: 11.99, porDefecto: 9 },
      ]
    : [
        { id: "peso", tipo: "numero", etiqueta: ui.peso("kg"), min: 0, porDefecto: 70 },
        { id: "altura", tipo: "numero", etiqueta: ui.altura("cm"), min: 0, porDefecto: 170 },
      ];
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "imc",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos,
    calcular(entrada) {
      const e = entrada as Readonly<Record<string, number | null>>;
      const peso = e.peso ?? 0;
      const metros = imperial ? ((e.pies ?? 0) * 12 + (e.pulgadas ?? 0)) * M_POR_PULGADA : (e.altura ?? 0) / 100;
      if (peso <= 0) throw new ErrorEntrada(ui.errorPeso, "peso");
      if (metros <= 0) throw new ErrorEntrada(ui.errorAltura, imperial ? "pies" : "altura");
      const kg = imperial ? peso * KG_POR_LB : peso;
      const imc = r1(kg / (metros * metros));
      const categoria =
        imc < 18.5 ? ui.bajo : imc < 25 ? ui.normal : imc < 30 ? ui.sobrepeso : imc < 35 ? ui.obesidad1 : imc < 40 ? ui.obesidad2 : ui.obesidad3;
      const aUnidad = (k: number) => r1(imperial ? k / KG_POR_LB : k);
      return {
        imc,
        categoria,
        pesoMin: aUnidad(18.5 * metros * metros),
        pesoMax: aUnidad(24.9 * metros * metros),
        observaciones: [ui.aviso],
      };
    },
    resultado: [
      { clave: "imc", etiqueta: ui.imc, formato: "numero", decimales: 1, destacada: true },
      { clave: "categoria", etiqueta: ui.categoria, formato: "texto" },
      { clave: "pesoMin", etiqueta: ui.pesoMin(unidadPeso), ayuda: ui.rangoAyuda, formato: "numero", decimales: 1 },
      { clave: "pesoMax", etiqueta: ui.pesoMax(unidadPeso), formato: "numero", decimales: 1 },
    ],
  });
}
