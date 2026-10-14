import { definirCalculadora } from "../../calculo";
import { formatearNumero } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import type { ContextoUniversal } from "../tipos";
import { aDia, aFecha, habilesEntre, mesesYDias } from "./fechas";

export interface UiDiasEntreFechas {
  desde: string;
  hasta: string;
  incluir: string;
  incluirAyuda: string;
  dias: string;
  semanas: string;
  duracionFila: string;
  habiles: string;
  habilesAyuda: string;
  duracion: (anios: number, meses: number, dias: number) => string;
  semanasYDias: (semanas: string, nSemanas: number, dias: number) => string;
  notaHabiles: string;
  notaInvertidas: string;
}

export function definir(ctx: ContextoUniversal, ui: UiDiasEntreFechas): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "dias-entre-fechas",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "desde", tipo: "fecha", etiqueta: ui.desde, porDefecto: "hoy" },
      { id: "hasta", tipo: "fecha", etiqueta: ui.hasta, porDefecto: "2026-12-31" },
      { id: "incluir", tipo: "si-no", etiqueta: ui.incluir, ayuda: ui.incluirAyuda, porDefecto: false },
    ],
    calcular({ desde, hasta, incluir }) {
      const observaciones: string[] = [];
      let a = desde;
      let b = hasta;
      if (aDia(a) > aDia(b)) {
        [a, b] = [b, a];
        observaciones.push(ui.notaInvertidas);
      }
      const inicio = aDia(a);
      const fin = aDia(b) + (incluir ? 1 : 0);
      const dias = fin - inicio;
      const semanas = Math.floor(dias / 7);
      const { meses, dias: resto } = mesesYDias(a, aFecha(fin));
      observaciones.push(ui.notaHabiles);
      return {
        dias,
        semanas,
        semanasTexto: ui.semanasYDias(formatearNumero(semanas, ctx.locale), semanas, dias % 7),
        duracion: ui.duracion(Math.floor(meses / 12), meses % 12, resto),
        habiles: habilesEntre(inicio, fin),
        observaciones,
      };
    },
    resultado: [
      { clave: "dias", etiqueta: ui.dias, formato: "numero", destacada: true },
      { clave: "semanasTexto", etiqueta: ui.semanas, formato: "texto" },
      { clave: "duracion", etiqueta: ui.duracionFila, formato: "texto" },
      { clave: "habiles", etiqueta: ui.habiles, ayuda: ui.habilesAyuda, formato: "numero" },
    ],
  });
}
