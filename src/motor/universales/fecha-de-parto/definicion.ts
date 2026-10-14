import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { aDia, aFecha } from "../comun/fechas";
import type { ContextoUniversal } from "../tipos";

export interface UiFechaDeParto {
  metodo: string;
  fum: string;
  concepcion: string;
  fecha: string;
  fechaAyuda: string;
  ciclo: string;
  cicloAyuda: string;
  fpp: string;
  edadGestacional: string;
  trimestre: string;
  faltan: string;
  fechaConcepcion: string;
  semanasYDias: (semanas: number, dias: number) => string;
  trimestres: readonly [string, string, string];
  errorFutura: string;
  errorCiclo: string;
  notaPasada: string;
  aviso: string;
}

export const DURACION = 280;
const MAX_GESTACION = 42 * 7;

export function definir(ctx: ContextoUniversal, ui: UiFechaDeParto): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "fecha-de-parto",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      {
        id: "metodo",
        tipo: "opcion",
        etiqueta: ui.metodo,
        opciones: [
          { valor: "fum", etiqueta: ui.fum },
          { valor: "concepcion", etiqueta: ui.concepcion },
        ],
        porDefecto: "fum",
      },
      { id: "fecha", tipo: "fecha", etiqueta: ui.fecha, ayuda: ui.fechaAyuda, porDefecto: "hoy" },
      { id: "ciclo", tipo: "entero", etiqueta: ui.ciclo, ayuda: ui.cicloAyuda, min: 20, max: 45, porDefecto: 28 },
    ],
    calcular({ metodo, fecha, ciclo }, _valores, { fecha: hoy }) {
      if (ciclo < 20 || ciclo > 45) throw new ErrorEntrada(ui.errorCiclo, "ciclo");
      const dia = aDia(fecha);
      const diaHoy = aDia(hoy);
      if (dia > diaHoy) throw new ErrorEntrada(ui.errorFutura, "fecha");
      // La regla de Naegele supone ciclos de 28 días con ovulación el día 14. Se corre la FUM
      // equivalente según el ciclo (o desde la concepción, 14 días antes) y desde ahí todo es igual.
      const fumEquivalente = metodo === "concepcion" ? dia - 14 : dia + (ciclo - 28);
      const parto = fumEquivalente + DURACION;
      const transcurridos = Math.max(0, diaHoy - fumEquivalente);
      const observaciones: string[] = [];
      let semanas: number | null = null;
      let dias: number | null = null;
      let edadGestacional: string | null = null;
      let trimestre: string | null = null;
      let faltan: number | null = null;
      if (transcurridos > MAX_GESTACION) {
        observaciones.push(ui.notaPasada);
      } else {
        semanas = Math.floor(transcurridos / 7);
        dias = transcurridos % 7;
        edadGestacional = ui.semanasYDias(semanas, dias);
        trimestre = ui.trimestres[semanas < 14 ? 0 : semanas < 28 ? 1 : 2];
        faltan = Math.max(0, parto - diaHoy);
      }
      observaciones.push(ui.aviso);
      return {
        fpp: aFecha(parto),
        edadGestacional,
        trimestre,
        faltan,
        fechaConcepcion: aFecha(fumEquivalente + 14),
        semanas,
        dias,
        observaciones,
      };
    },
    resultado: [
      { clave: "fpp", etiqueta: ui.fpp, formato: "fecha", destacada: true },
      { clave: "edadGestacional", etiqueta: ui.edadGestacional, formato: "texto" },
      { clave: "trimestre", etiqueta: ui.trimestre, formato: "texto" },
      { clave: "faltan", etiqueta: ui.faltan, formato: "numero" },
      { clave: "fechaConcepcion", etiqueta: ui.fechaConcepcion, formato: "fecha" },
    ],
  });
}
