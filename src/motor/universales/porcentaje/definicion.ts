import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { formatearNumero, redondear } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";

export interface UiPorcentaje {
  modo: string;
  modoParte: string;
  modoProporcion: string;
  modoAumento: string;
  modoRebaja: string;
  x: string;
  xAyuda: string;
  y: string;
  resultado: string;
  porcentaje: string;
  diferencia: string;
  errorYCero: string;
  fraseParte: (x: string, y: string, r: string) => string;
  fraseProporcion: (x: string, y: string, p: string) => string;
  fraseAumento: (x: string, y: string, r: string, d: string) => string;
  fraseRebaja: (x: string, y: string, r: string, d: string) => string;
}

const r4 = (n: number) => redondear(n, { decimales: 4, modo: "mitad-arriba" });

export function definir(ctx: ContextoUniversal, ui: UiPorcentaje): DefinicionCalculadora {
  const f = (n: number) => formatearNumero(n, ctx.locale);
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "porcentaje",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      {
        id: "modo",
        tipo: "opcion",
        etiqueta: ui.modo,
        opciones: [
          { valor: "parte", etiqueta: ui.modoParte },
          { valor: "proporcion", etiqueta: ui.modoProporcion },
          { valor: "aumento", etiqueta: ui.modoAumento },
          { valor: "rebaja", etiqueta: ui.modoRebaja },
        ],
        porDefecto: "parte",
      },
      { id: "x", tipo: "numero", etiqueta: ui.x, ayuda: ui.xAyuda, porDefecto: 15 },
      { id: "y", tipo: "numero", etiqueta: ui.y, porDefecto: 200 },
    ],
    calcular(entrada) {
      const { modo, x, y } = entrada;
      let resultado: number | null = null;
      let porcentaje: number | null = null;
      let diferencia: number | null = null;
      let frase: string;
      if (modo === "proporcion") {
        if (y === 0) throw new ErrorEntrada(ui.errorYCero, "y");
        porcentaje = r4((x / y) * 100);
        frase = ui.fraseProporcion(f(x), f(y), f(porcentaje));
      } else if (modo === "parte") {
        resultado = r4((x * y) / 100);
        frase = ui.fraseParte(f(x), f(y), f(resultado));
      } else {
        diferencia = r4((x * y) / 100);
        resultado = r4(modo === "aumento" ? y + diferencia : y - diferencia);
        frase = (modo === "aumento" ? ui.fraseAumento : ui.fraseRebaja)(f(x), f(y), f(resultado), f(diferencia));
      }
      return { resultado, porcentaje, diferencia, observaciones: [frase] };
    },
    resultado: [
      { clave: "resultado", etiqueta: ui.resultado, formato: "numero", destacada: true },
      { clave: "porcentaje", etiqueta: ui.porcentaje, formato: "porcentaje", destacada: true },
      { clave: "diferencia", etiqueta: ui.diferencia, formato: "numero" },
    ],
  });
}
