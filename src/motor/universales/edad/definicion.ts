import { definirCalculadora, ErrorEntrada } from "../../calculo";
import { formatearNumero } from "../../formato";
import type { DefinicionCalculadora } from "../../tipos";
import { aDia, aFecha, mesesYDias, sumarMeses } from "../comun/fechas";
import type { ContextoUniversal } from "../tipos";

export interface UiEdad {
  nacimiento: string;
  referencia: string;
  referenciaAyuda: string;
  edad: string;
  anios: string;
  totalMeses: string;
  totalSemanas: string;
  totalDias: string;
  proximo: string;
  faltan: string;
  cumplira: string;
  duracion: (anios: number, meses: number, dias: number) => string;
  errorFutura: string;
  cumpleHoy: (anios: string) => string;
  nota29: string;
}

export function definir(ctx: ContextoUniversal, ui: UiEdad): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "edad",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "nacimiento", tipo: "fecha", etiqueta: ui.nacimiento, min: "1900-01-01", porDefecto: "1990-05-15" },
      { id: "referencia", tipo: "fecha", etiqueta: ui.referencia, ayuda: ui.referenciaAyuda, porDefecto: "hoy" },
    ],
    calcular({ nacimiento, referencia }) {
      const inicio = aDia(nacimiento);
      const fin = aDia(referencia);
      if (inicio > fin) throw new ErrorEntrada(ui.errorFutura, "nacimiento");
      const { meses, dias } = mesesYDias(nacimiento, referencia);
      const anios = Math.floor(meses / 12);
      const totalDias = fin - inicio;
      const esHoy = meses % 12 === 0 && dias === 0 && totalDias > 0;
      const proximoDia = esHoy ? fin : sumarMeses(nacimiento, (anios + 1) * 12);
      const observaciones: string[] = [];
      if (esHoy) observaciones.push(ui.cumpleHoy(formatearNumero(anios, ctx.locale)));
      if (nacimiento.endsWith("-02-29")) observaciones.push(ui.nota29);
      return {
        edad: ui.duracion(anios, meses % 12, dias),
        anios,
        totalMeses: meses,
        totalSemanas: Math.floor(totalDias / 7),
        totalDias,
        proximo: aFecha(proximoDia),
        faltan: proximoDia - fin,
        cumplira: esHoy ? anios : anios + 1,
        observaciones,
      };
    },
    resultado: [
      { clave: "edad", etiqueta: ui.edad, formato: "texto", destacada: true },
      { clave: "anios", etiqueta: ui.anios, formato: "numero" },
      { clave: "totalMeses", etiqueta: ui.totalMeses, formato: "numero" },
      { clave: "totalSemanas", etiqueta: ui.totalSemanas, formato: "numero" },
      { clave: "totalDias", etiqueta: ui.totalDias, formato: "numero" },
      { clave: "proximo", etiqueta: ui.proximo, formato: "fecha" },
      { clave: "faltan", etiqueta: ui.faltan, formato: "numero" },
      { clave: "cumplira", etiqueta: ui.cumplira, formato: "numero" },
    ],
  });
}
