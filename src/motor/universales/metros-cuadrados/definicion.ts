import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { Campo, DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiMetrosCuadrados {
  forma: (n: number) => string;
  formaAyuda: string;
  ninguna: string;
  rectangulo: string;
  triangulo: string;
  circulo: string;
  medidaA: (n: number, u: string) => string;
  medidaAAyuda: string;
  medidaB: (n: number, u: string) => string;
  total: (u: string) => string;
  equivale: (u: string) => string;
  parcial: (n: number, u: string) => string;
  errorMedida: string;
}

export const MAX_SUPERFICIES = 5;
export const FT2_POR_M2 = 10.7639104;
const r2 = (n: number) => redondear(n, { decimales: 2, modo: "mitad-arriba" });

export function area(forma: string, a: number, b: number): number {
  if (forma === "circulo") return Math.PI * (a / 2) ** 2;
  if (forma === "triangulo") return (a * b) / 2;
  return a * b;
}

export function definir(ctx: ContextoUniversal, ui: UiMetrosCuadrados): DefinicionCalculadora {
  const imperial = ctx.unidades === "imperial";
  const ul = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const otra = imperial ? "m²" : "ft²";
  const campos: Campo[] = [];
  for (let i = 1; i <= MAX_SUPERFICIES; i++) {
    const primera = i === 1;
    campos.push(
      {
        id: `forma${i}`,
        tipo: "opcion",
        etiqueta: ui.forma(i),
        ...(primera ? { ayuda: ui.formaAyuda } : {}),
        opciones: [
          ...(primera ? [] : [{ valor: "ninguna", etiqueta: ui.ninguna }]),
          { valor: "rectangulo", etiqueta: ui.rectangulo },
          { valor: "triangulo", etiqueta: ui.triangulo },
          { valor: "circulo", etiqueta: ui.circulo },
        ],
        porDefecto: primera ? "rectangulo" : "ninguna",
      },
      { id: `a${i}`, tipo: "numero", etiqueta: ui.medidaA(i, ul), ...(primera ? { ayuda: ui.medidaAAyuda, porDefecto: imperial ? 15 : 5 } : {}), min: 0, requerido: false },
      { id: `b${i}`, tipo: "numero", etiqueta: ui.medidaB(i, ul), ...(primera ? { porDefecto: imperial ? 12 : 4 } : {}), min: 0, requerido: false },
    );
  }
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "metros-cuadrados",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos,
    calcular(entrada) {
      const e = entrada as Readonly<Record<string, number | string | null>>;
      const parciales: Record<string, number | null> = {};
      let total = 0;
      for (let i = 1; i <= MAX_SUPERFICIES; i++) {
        const forma = String(e[`forma${i}`] ?? "ninguna");
        parciales[`s${i}`] = null;
        if (forma === "ninguna") continue;
        const a = Number(e[`a${i}`] ?? 0);
        const b = Number(e[`b${i}`] ?? 0);
        if (a <= 0) throw new ErrorEntrada(ui.errorMedida, `a${i}`);
        if (forma !== "circulo" && b <= 0) throw new ErrorEntrada(ui.errorMedida, `b${i}`);
        const s = area(forma, a, b);
        parciales[`s${i}`] = r2(s);
        total += s;
      }
      return {
        total: r2(total),
        equivale: r2(imperial ? total / FT2_POR_M2 : total * FT2_POR_M2),
        s1: parciales.s1,
        s2: parciales.s2,
        s3: parciales.s3,
        s4: parciales.s4,
        s5: parciales.s5,
      };
    },
    resultado: [
      { clave: "total", etiqueta: ui.total(us), formato: "numero", destacada: true },
      { clave: "equivale", etiqueta: ui.equivale(otra), formato: "numero" },
      { clave: "s1", etiqueta: ui.parcial(1, us), formato: "numero" },
      { clave: "s2", etiqueta: ui.parcial(2, us), formato: "numero" },
      { clave: "s3", etiqueta: ui.parcial(3, us), formato: "numero" },
      { clave: "s4", etiqueta: ui.parcial(4, us), formato: "numero" },
      { clave: "s5", etiqueta: ui.parcial(5, us), formato: "numero" },
    ],
  });
}
