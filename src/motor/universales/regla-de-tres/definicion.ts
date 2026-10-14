import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { formatearNumero, redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiReglaDeTres {
  tipo: string;
  directa: string;
  inversa: string;
  a: string;
  aAyuda: string;
  b: string;
  c: string;
  x: string;
  errorCero: string;
  fraseDirecta: (a: string, b: string, c: string, x: string) => string;
  fraseInversa: (a: string, b: string, c: string, x: string) => string;
}

const r4 = (n: number) => redondear(n, { decimales: 4, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiReglaDeTres): DefinicionCalculadora {
  const f = (n: number) => formatearNumero(n, ctx.locale);
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "regla-de-tres",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      {
        id: "tipo",
        tipo: "opcion",
        etiqueta: ui.tipo,
        opciones: [
          { valor: "directa", etiqueta: ui.directa },
          { valor: "inversa", etiqueta: ui.inversa },
        ],
        porDefecto: "directa",
      },
      { id: "a", tipo: "numero", etiqueta: ui.a, ayuda: ui.aAyuda, porDefecto: 3 },
      { id: "b", tipo: "numero", etiqueta: ui.b, porDefecto: 600 },
      { id: "c", tipo: "numero", etiqueta: ui.c, porDefecto: 5 },
    ],
    calcular({ tipo, a, b, c }) {
      const divisor = tipo === "directa" ? a : c;
      if (divisor === 0) throw new ErrorEntrada(ui.errorCero, tipo === "directa" ? "a" : "c");
      const x = r4(tipo === "directa" ? (b * c) / a : (a * b) / c);
      const frase = (tipo === "directa" ? ui.fraseDirecta : ui.fraseInversa)(f(a), f(b), f(c), f(x));
      return { x, observaciones: [frase] };
    },
    resultado: [{ clave: "x", etiqueta: ui.x, formato: "numero", destacada: true }],
  });
}
