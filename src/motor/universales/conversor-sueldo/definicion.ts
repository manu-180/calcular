import { definirCalculadora, ErrorEntrada } from "../../calculo";
import type { DefinicionCalculadora } from "../../tipos";
import { montoEjemplo, type ContextoUniversal } from "../tipos";

export interface UiConversorSueldo {
  monto: string;
  periodo: string;
  hora: string;
  dia: string;
  semana: string;
  quincena: string;
  mes: string;
  anio: string;
  horasSemana: string;
  diasSemana: string;
  semanasAnio: string;
  semanasAnioAyuda: string;
  porHora: string;
  porDia: string;
  porSemana: string;
  porQuincena: string;
  porMes: string;
  porAnio: string;
  errorHoras: string;
  errorSemanas: string;
  observacionBruto: string;
}

export type Periodo = "hora" | "dia" | "semana" | "quincena" | "mes" | "anio";

export interface Jornada {
  horasSemana: number;
  diasSemana: number;
  semanasAnio: number;
}

// Todo pasa por el monto anual. Quincena y mes salen del año (÷ 24 y ÷ 12), no de la semana: un mes
// tiene 4,33 semanas, no 4.
export function anual(monto: number, periodo: Periodo, j: Jornada): number {
  switch (periodo) {
    case "hora":
      return monto * j.horasSemana * j.semanasAnio;
    case "dia":
      return monto * j.diasSemana * j.semanasAnio;
    case "semana":
      return monto * j.semanasAnio;
    case "quincena":
      return monto * 24;
    case "mes":
      return monto * 12;
    case "anio":
      return monto;
  }
}

export function definir(ctx: ContextoUniversal, ui: UiConversorSueldo): DefinicionCalculadora {
  return definirCalculadora({
    id: ctx.id,
    mercado: ctx.mercado,
    concepto: "conversor-sueldo",
    slug: ctx.slug,
    estado: ctx.estado,
    requiere: {},
    campos: [
      { id: "monto", tipo: "moneda", etiqueta: ui.monto, min: 0, porDefecto: montoEjemplo(ctx, 2000) },
      {
        id: "periodo",
        tipo: "opcion",
        etiqueta: ui.periodo,
        opciones: [
          { valor: "hora", etiqueta: ui.hora },
          { valor: "dia", etiqueta: ui.dia },
          { valor: "semana", etiqueta: ui.semana },
          { valor: "quincena", etiqueta: ui.quincena },
          { valor: "mes", etiqueta: ui.mes },
          { valor: "anio", etiqueta: ui.anio },
        ],
        porDefecto: "mes",
      },
      { id: "horasSemana", tipo: "numero", etiqueta: ui.horasSemana, min: 0, max: 168, porDefecto: 40 },
      { id: "diasSemana", tipo: "entero", etiqueta: ui.diasSemana, min: 1, max: 7, porDefecto: 5 },
      { id: "semanasAnio", tipo: "numero", etiqueta: ui.semanasAnio, ayuda: ui.semanasAnioAyuda, min: 1, max: 52, porDefecto: 52 },
    ],
    calcular(entrada, _valores, { redondear }) {
      if (entrada.horasSemana <= 0) throw new ErrorEntrada(ui.errorHoras, "horasSemana");
      if (entrada.semanasAnio <= 0) throw new ErrorEntrada(ui.errorSemanas, "semanasAnio");
      const a = anual(entrada.monto, entrada.periodo, entrada);
      return {
        porHora: redondear(a / (entrada.horasSemana * entrada.semanasAnio)),
        porDia: redondear(a / (entrada.diasSemana * entrada.semanasAnio)),
        porSemana: redondear(a / entrada.semanasAnio),
        porQuincena: redondear(a / 24),
        porMes: redondear(a / 12),
        porAnio: redondear(a),
        observaciones: [ui.observacionBruto],
      };
    },
    resultado: [
      { clave: "porHora", etiqueta: ui.porHora, formato: "moneda", destacada: true },
      { clave: "porDia", etiqueta: ui.porDia, formato: "moneda" },
      { clave: "porSemana", etiqueta: ui.porSemana, formato: "moneda" },
      { clave: "porQuincena", etiqueta: ui.porQuincena, formato: "moneda" },
      { clave: "porMes", etiqueta: ui.porMes, formato: "moneda", destacada: true },
      { clave: "porAnio", etiqueta: ui.porAnio, formato: "moneda" },
    ],
  });
}
