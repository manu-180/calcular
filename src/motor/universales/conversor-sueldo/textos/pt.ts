import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosPt: TextosUi<UiConversorSueldo> = {
  slug: "salario-por-hora",
  ui: () => ({
    monto: "Salário",
    periodo: "O salário é por",
    hora: "Hora",
    dia: "Dia",
    semana: "Semana",
    quincena: "Quinzena (24 por ano)",
    mes: "Mês",
    anio: "Ano",
    horasSemana: "Horas trabalhadas por semana",
    diasSemana: "Dias trabalhados por semana",
    semanasAnio: "Semanas pagas por ano",
    semanasAnioAyuda: "52 se você tem férias remuneradas. Se só recebe pelas semanas que trabalha, tire as outras.",
    porHora: "Por hora",
    porDia: "Por dia",
    porSemana: "Por semana",
    porQuincena: "Por quinzena",
    porMes: "Por mês",
    porAnio: "Por ano",
    errorHoras: "Coloque quantas horas você trabalha por semana.",
    errorSemanas: "As semanas pagas por ano têm que ser mais que zero.",
    observacionBruto: "É o mesmo valor mostrado em outros períodos. Não soma bônus nem desconta impostos.",
  }),
};
