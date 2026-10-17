import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { redondear } from "../../formato";
import type { Campo, DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiPromedio {
  nota: (n: number) => string;
  notaAyuda: string;
  peso: (n: number) => string;
  pesoAyuda: string;
  ponderado: string;
  simple: string;
  cantidad: string;
  sumaPesos: string;
  errorSinNotas: string;
  errorFaltaPeso: string;
  errorFaltaNota: string;
  errorPesosCero: string;
  sinPesos: string;
}

export const MAX_NOTAS = 10;
const EJEMPLO: readonly (readonly [number, number])[] = [
  [7, 20],
  [8, 30],
  [9, 50],
];

const r4 = (n: number) => redondear(n, { decimales: 4, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiPromedio): DefinicionCalculadora {
  const campos: Campo[] = [];
  for (let i = 1; i <= MAX_NOTAS; i++) {
    const ejemplo = EJEMPLO[i - 1];
    campos.push(
      { id: `n${i}`, tipo: "numero", etiqueta: ui.nota(i), requerido: false, ...(i === 1 ? { ayuda: ui.notaAyuda } : {}), ...(ejemplo ? { porDefecto: ejemplo[0] } : {}) },
      { id: `w${i}`, tipo: "numero", etiqueta: ui.peso(i), min: 0, requerido: false, ...(i === 1 ? { ayuda: ui.pesoAyuda } : {}), ...(ejemplo ? { porDefecto: ejemplo[1] } : {}) },
    );
  }
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "promedio",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos,
    calcular(entrada) {
      const e = entrada as Readonly<Record<string, number | null>>;
      const pares: { nota: number; peso: number | null; i: number }[] = [];
      for (let i = 1; i <= MAX_NOTAS; i++) {
        const nota = e[`n${i}`] ?? null;
        const peso = e[`w${i}`] ?? null;
        if (nota === null && peso !== null) throw new ErrorEntrada(ui.errorFaltaNota, `n${i}`);
        if (nota !== null) pares.push({ nota, peso, i });
      }
      if (!pares.length) throw new ErrorEntrada(ui.errorSinNotas, "n1");
      const usaPesos = pares.some((p) => p.peso !== null);
      if (usaPesos) {
        const sinPeso = pares.find((p) => p.peso === null);
        if (sinPeso) throw new ErrorEntrada(ui.errorFaltaPeso, `w${sinPeso.i}`);
      }
      const simple = r4(pares.reduce((s, p) => s + p.nota, 0) / pares.length);
      let ponderado = simple;
      let sumaPesos: number | null = null;
      if (usaPesos) {
        const suma = pares.reduce((s, p) => s + (p.peso ?? 0), 0);
        if (suma <= 0) throw new ErrorEntrada(ui.errorPesosCero, `w${pares[0].i}`);
        ponderado = r4(pares.reduce((s, p) => s + p.nota * (p.peso ?? 0), 0) / suma);
        sumaPesos = r4(suma);
      }
      return { ponderado, simple, cantidad: pares.length, sumaPesos, observaciones: usaPesos ? [] : [ui.sinPesos] };
    },
    resultado: [
      { clave: "ponderado", etiqueta: ui.ponderado, formato: "numero", destacada: true },
      { clave: "simple", etiqueta: ui.simple, formato: "numero" },
      { clave: "cantidad", etiqueta: ui.cantidad, formato: "numero" },
      { clave: "sumaPesos", etiqueta: ui.sumaPesos, formato: "numero" },
    ],
  });
}
