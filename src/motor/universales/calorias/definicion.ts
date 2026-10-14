import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { formatearNumero, redondear } from "../../formato";
import type { Campo, DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiCalorias {
  sexo: string;
  mujer: string;
  hombre: string;
  edad: string;
  peso: (unidad: string) => string;
  altura: (unidad: string) => string;
  pies: string;
  pulgadas: string;
  actividad: string;
  sedentaria: string;
  ligera: string;
  moderada: string;
  alta: string;
  muyAlta: string;
  objetivo: string;
  mantener: string;
  bajar: string;
  subir: string;
  basal: string;
  basalAyuda: string;
  mantenimiento: string;
  calObjetivo: string;
  calObjetivoAyuda: string;
  errorEdad: string;
  errorPeso: string;
  errorAltura: string;
  notaMinimo: (kcal: string) => string;
  aviso: string;
}

export const FACTORES = { sedentaria: 1.2, ligera: 1.375, moderada: 1.55, alta: 1.725, muyAlta: 1.9 } as const;
export const DEFICIT = 500;
export const SUPERAVIT = 300;
// Pisos habituales de ingesta sin supervisión médica; por debajo, la calculadora no baja más.
const MINIMO = { mujer: 1200, hombre: 1500 } as const;
const KG_POR_LB = 0.45359237;
const CM_POR_PULGADA = 2.54;

export function mifflin(sexo: "mujer" | "hombre", edad: number, kg: number, cm: number): number {
  return 10 * kg + 6.25 * cm - 5 * edad + (sexo === "hombre" ? 5 : -161);
}

const r0 = (n: number) => redondear(n, { decimales: 0, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiCalorias): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const medidas: Campo[] = imperial
    ? [
        { id: "peso", tipo: "numero", etiqueta: ui.peso("lb"), min: 0, porDefecto: 150 },
        { id: "pies", tipo: "entero", etiqueta: ui.pies, min: 0, max: 8, porDefecto: 5 },
        { id: "pulgadas", tipo: "numero", etiqueta: ui.pulgadas, min: 0, max: 11.99, porDefecto: 6 },
      ]
    : [
        { id: "peso", tipo: "numero", etiqueta: ui.peso("kg"), min: 0, porDefecto: 65 },
        { id: "altura", tipo: "numero", etiqueta: ui.altura("cm"), min: 0, porDefecto: 165 },
      ];
  const campos: Campo[] = [
    {
      id: "sexo",
      tipo: "opcion",
      etiqueta: ui.sexo,
      opciones: [
        { valor: "mujer", etiqueta: ui.mujer },
        { valor: "hombre", etiqueta: ui.hombre },
      ],
      porDefecto: "mujer",
    },
    { id: "edad", tipo: "entero", etiqueta: ui.edad, min: 15, max: 100, porDefecto: 30 },
    ...medidas,
    {
      id: "actividad",
      tipo: "opcion",
      etiqueta: ui.actividad,
      opciones: [
        { valor: "sedentaria", etiqueta: ui.sedentaria },
        { valor: "ligera", etiqueta: ui.ligera },
        { valor: "moderada", etiqueta: ui.moderada },
        { valor: "alta", etiqueta: ui.alta },
        { valor: "muyAlta", etiqueta: ui.muyAlta },
      ],
      porDefecto: "ligera",
    },
    {
      id: "objetivo",
      tipo: "opcion",
      etiqueta: ui.objetivo,
      opciones: [
        { valor: "mantener", etiqueta: ui.mantener },
        { valor: "bajar", etiqueta: ui.bajar },
        { valor: "subir", etiqueta: ui.subir },
      ],
      porDefecto: "mantener",
    },
  ];
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "calorias",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos,
    calcular(entrada) {
      const e = entrada as Readonly<Record<string, number | string | null>>;
      const sexo = e.sexo === "hombre" ? "hombre" : "mujer";
      const edad = Number(e.edad ?? 0);
      const peso = Number(e.peso ?? 0);
      const cm = imperial ? (Number(e.pies ?? 0) * 12 + Number(e.pulgadas ?? 0)) * CM_POR_PULGADA : Number(e.altura ?? 0);
      if (edad < 15 || edad > 100) throw new ErrorEntrada(ui.errorEdad, "edad");
      if (peso <= 0) throw new ErrorEntrada(ui.errorPeso, "peso");
      if (cm <= 0) throw new ErrorEntrada(ui.errorAltura, imperial ? "pies" : "altura");
      const kg = imperial ? peso * KG_POR_LB : peso;
      const factor = FACTORES[(e.actividad as keyof typeof FACTORES) ?? "ligera"] ?? FACTORES.ligera;
      const basalExacto = mifflin(sexo, edad, kg, cm);
      const mantenimientoExacto = basalExacto * factor;
      const observaciones: string[] = [];
      let objetivo: number | null = null;
      if (e.objetivo === "bajar") {
        objetivo = r0(Math.max(mantenimientoExacto - DEFICIT, MINIMO[sexo]));
        if (mantenimientoExacto - DEFICIT < MINIMO[sexo]) observaciones.push(ui.notaMinimo(formatearNumero(MINIMO[sexo], ctx.locale)));
      } else if (e.objetivo === "subir") {
        objetivo = r0(mantenimientoExacto + SUPERAVIT);
      }
      observaciones.push(ui.aviso);
      return { basal: r0(basalExacto), mantenimiento: r0(mantenimientoExacto), objetivo, observaciones };
    },
    resultado: [
      { clave: "mantenimiento", etiqueta: ui.mantenimiento, formato: "numero", decimales: 0, destacada: true },
      { clave: "objetivo", etiqueta: ui.calObjetivo, ayuda: ui.calObjetivoAyuda, formato: "numero", decimales: 0 },
      { clave: "basal", etiqueta: ui.basal, ayuda: ui.basalAyuda, formato: "numero", decimales: 0 },
    ],
  });
}
