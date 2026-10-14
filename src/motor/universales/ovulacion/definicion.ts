import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora, TablaResultado } from "../../tipos";
import { aDia, aFecha } from "../dias-entre-fechas/fechas";
import type { ContextoUniversal } from "../tipos";

export interface UiOvulacion {
  fum: string;
  fumAyuda: string;
  ciclo: string;
  cicloAyuda: string;
  ovulacion: string;
  fertilDesde: string;
  fertilHasta: string;
  proxima: string;
  tabla: string;
  colRegla: string;
  colDesde: string;
  colHasta: string;
  colOvulacion: string;
  errorCiclo: string;
  aviso: string;
}

// La fase lútea dura unos 14 días en casi todos los ciclos; lo que cambia de un ciclo a otro es la
// primera mitad. Por eso la ovulación se cuenta hacia atrás desde la próxima menstruación.
export const FASE_LUTEA = 14;
const CICLOS_EN_TABLA = 3;

export function ventana(fum: number, ciclo: number) {
  const ovulacion = fum + ciclo - FASE_LUTEA;
  return { ovulacion, desde: ovulacion - 5, hasta: ovulacion + 1, proxima: fum + ciclo };
}

export function definir(ctx: ContextoUniversal, ui: UiOvulacion): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "ovulacion",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "fum", tipo: "fecha", etiqueta: ui.fum, ayuda: ui.fumAyuda, porDefecto: "hoy" },
      { id: "ciclo", tipo: "entero", etiqueta: ui.ciclo, ayuda: ui.cicloAyuda, min: 21, max: 45, porDefecto: 28 },
    ],
    calcular({ fum, ciclo }) {
      if (ciclo < 21 || ciclo > 45 || !Number.isInteger(ciclo)) throw new ErrorEntrada(ui.errorCiclo, "ciclo");
      const inicio = aDia(fum);
      const actual = ventana(inicio, ciclo);
      const filas: (readonly string[])[] = [];
      for (let k = 1; k <= CICLOS_EN_TABLA; k++) {
        const v = ventana(inicio + k * ciclo, ciclo);
        filas.push([aFecha(inicio + k * ciclo), aFecha(v.desde), aFecha(v.hasta), aFecha(v.ovulacion)]);
      }
      const tabla: TablaResultado = {
        tipo: "tabla",
        columnas: [
          { clave: "regla", etiqueta: ui.colRegla, formato: "fecha" },
          { clave: "desde", etiqueta: ui.colDesde, formato: "fecha" },
          { clave: "hasta", etiqueta: ui.colHasta, formato: "fecha" },
          { clave: "ovulacion", etiqueta: ui.colOvulacion, formato: "fecha" },
        ],
        filas,
      };
      return {
        ovulacion: aFecha(actual.ovulacion),
        fertilDesde: aFecha(actual.desde),
        fertilHasta: aFecha(actual.hasta),
        proxima: aFecha(actual.proxima),
        proximos: tabla,
        observaciones: [ui.aviso],
      };
    },
    resultado: [
      { clave: "ovulacion", etiqueta: ui.ovulacion, formato: "fecha", destacada: true },
      { clave: "fertilDesde", etiqueta: ui.fertilDesde, formato: "fecha" },
      { clave: "fertilHasta", etiqueta: ui.fertilHasta, formato: "fecha" },
      { clave: "proxima", etiqueta: ui.proxima, formato: "fecha" },
    ],
    tablas: [{ clave: "proximos", titulo: ui.tabla, filasVisibles: 12 }],
  });
}
