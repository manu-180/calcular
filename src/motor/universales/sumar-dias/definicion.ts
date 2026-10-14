import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { aDia, aFecha, diaDeSemana, esHabil } from "../comun/fechas";
import type { ContextoUniversal } from "../tipos";

export interface UiSumarDias {
  fecha: string;
  operacion: string;
  sumar: string;
  restar: string;
  dias: string;
  tipo: string;
  corridos: string;
  habiles: string;
  resultado: string;
  diaSemana: string;
  diasCorridos: string;
  // Domingo primero, como Date.getUTCDay.
  nombresDias: readonly [string, string, string, string, string, string, string];
  errorDias: string;
  notaHabiles: string;
}

const MAX_DIAS = 36_500;

export function definir(ctx: ContextoUniversal, ui: UiSumarDias): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "sumar-dias",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "fecha", tipo: "fecha", etiqueta: ui.fecha, porDefecto: "hoy" },
      {
        id: "operacion",
        tipo: "opcion",
        etiqueta: ui.operacion,
        opciones: [
          { valor: "sumar", etiqueta: ui.sumar },
          { valor: "restar", etiqueta: ui.restar },
        ],
        porDefecto: "sumar",
      },
      { id: "dias", tipo: "entero", etiqueta: ui.dias, min: 0, max: MAX_DIAS, porDefecto: 30 },
      {
        id: "tipo",
        tipo: "opcion",
        etiqueta: ui.tipo,
        opciones: [
          { valor: "corridos", etiqueta: ui.corridos },
          { valor: "habiles", etiqueta: ui.habiles },
        ],
        porDefecto: "corridos",
      },
    ],
    calcular({ fecha, operacion, dias, tipo }) {
      if (dias < 0 || dias > MAX_DIAS || !Number.isInteger(dias)) throw new ErrorEntrada(ui.errorDias, "dias");
      const paso = operacion === "restar" ? -1 : 1;
      const inicio = aDia(fecha);
      let fin = inicio + paso * dias;
      if (tipo === "habiles") {
        fin = inicio;
        for (let contados = 0; contados < dias; ) {
          fin += paso;
          if (esHabil(fin)) contados++;
        }
      }
      return {
        resultado: aFecha(fin),
        diaSemana: ui.nombresDias[diaDeSemana(fin)],
        diasCorridos: Math.abs(fin - inicio),
        observaciones: tipo === "habiles" ? [ui.notaHabiles] : [],
      };
    },
    resultado: [
      { clave: "resultado", etiqueta: ui.resultado, formato: "fecha", destacada: true },
      { clave: "diaSemana", etiqueta: ui.diaSemana, formato: "texto" },
      { clave: "diasCorridos", etiqueta: ui.diasCorridos, formato: "numero" },
    ],
  });
}
