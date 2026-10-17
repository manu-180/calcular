import { conVariantes } from "../../comun/locales";
import { segunTrato, type TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

const base: TextosUi<UiConversorSueldo> = {
  slug: "sueldo-por-hora",
  ui: (trato) => ({
    monto: "Sueldo",
    periodo: "El sueldo es por",
    hora: "Hora",
    dia: "Día",
    semana: "Semana",
    quincena: "Quincena",
    mes: "Mes",
    anio: "Año",
    horasSemana: "Horas de trabajo por semana",
    diasSemana: "Días de trabajo por semana",
    semanasAnio: "Semanas pagadas por año",
    semanasAnioAyuda: segunTrato(trato, {
      tu: "52 si te pagan las vacaciones. Si cobras solo las semanas que trabajas, resta las que no.",
      usted: "52 si le pagan las vacaciones. Si cobra solo las semanas que trabaja, reste las que no.",
      vos: "52 si te pagan las vacaciones. Si cobrás solo las semanas que trabajás, restá las que no.",
    }),
    porHora: "Por hora",
    porDia: "Por día",
    porSemana: "Por semana",
    porQuincena: "Por quincena",
    porMes: "Por mes",
    porAnio: "Por año",
    errorHoras: segunTrato(trato, {
      tu: "Escribe cuántas horas trabajas por semana.",
      usted: "Escriba cuántas horas trabaja por semana.",
      vos: "Escribí cuántas horas trabajás por semana.",
    }),
    errorSemanas: "Las semanas pagadas por año tienen que ser más de cero.",
    observacionBruto:
      "Es la misma cifra pasada a otros períodos. No suma pagos extra (como aguinaldo o bonos) ni descuenta impuestos.",
  }),
};

const espana = (): Partial<UiConversorSueldo> => ({
  horasSemana: "Horas de trabajo a la semana",
  diasSemana: "Días de trabajo a la semana",
  semanasAnio: "Semanas pagadas al año",
  semanasAnioAyuda: "52 si te pagan las vacaciones. Si cobras solo las semanas que trabajas, resta las que no.",
  porDia: "Al día",
  porSemana: "A la semana",
  porQuincena: "A la quincena",
  porMes: "Al mes",
  porAnio: "Al año",
  errorHoras: "Escribe cuántas horas trabajas a la semana.",
  errorSemanas: "Las semanas pagadas al año tienen que ser más de cero.",
  observacionBruto: "Es la misma cifra pasada a otros periodos. No suma pagas extra ni bonus, ni descuenta impuestos.",
});

export const textosEs = conVariantes(base, { "es-ES": espana });
