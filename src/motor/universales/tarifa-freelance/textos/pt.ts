import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

const base: TextosUi<UiTarifaFreelance> = {
  slug: "valor-hora-freelancer",
  ui: () => ({
    ingreso: "Quanto você quer ganhar líquido por ano",
    ingresoAyuda: "Depois de impostos e gastos. É o seu salário como freelancer.",
    gastos: "Gastos do trabalho por ano",
    gastosAyuda: "Equipamento, programas, internet, cursos, contabilidade, plano de saúde e previdência.",
    impuestos: "Impostos e contribuições estimados (%)",
    impuestosAyuda: "O que vai para impostos sobre o que você fatura menos os gastos. Se não tiver certeza, consulte um contador. 25% é um ponto de partida.",
    diasLibres: "Dias de folga por ano",
    diasLibresAyuda: "Férias, feriados e dias doente. Ninguém paga por eles, então o seu valor precisa cobrir esses dias.",
    diasSemana: "Dias de trabalho por semana",
    horasSemana: "Horas faturáveis por semana",
    horasSemanaAyuda: "Só as horas que você cobra. Buscar clientes, burocracia e estudo não entram. O comum é de 20 a 30 em 40.",
    tarifaHora: "Valor da hora",
    tarifaDia: "Valor da diária",
    facturacionMensual: "Faturamento necessário por mês",
    facturacionAnual: "Faturamento necessário por ano",
    horasAnio: "Horas faturáveis por ano",
    errorIngreso: "Coloque quanto você quer ganhar por ano.",
    errorImpuestos: "Os impostos têm que ficar abaixo de 100%.",
    errorDias: "Com tantos dias de folga, não sobram dias de trabalho no ano.",
    errorHoras: "Coloque quantas horas por semana você consegue faturar.",
    observacionFacturables: "Se cobrar menos que isso, você vai ganhar menos do que planejou ou trabalhar mais horas.",
  }),
};

const portugal = (): Partial<UiTarifaFreelance> => ({
  ingreso: "Quanto quer ganhar líquido por ano",
  ingresoAyuda: "Depois de impostos e despesas. É o seu salário como trabalhador independente.",
  gastos: "Despesas da atividade por ano",
  gastosAyuda: "Equipamento, programas, internet, formação, contabilista, seguro de saúde e PPR.",
  impuestos: "Impostos e contribuições estimados (%)",
  impuestosAyuda:
    "O que vai para IRS e Segurança Social sobre o que fatura menos as despesas. Se não tiver a certeza, pergunte ao seu contabilista. 25% é um ponto de partida.",
  diasLibresAyuda: "Férias, feriados e dias de doença. Ninguém os paga, por isso o seu preço tem de cobrir esses dias.",
  horasSemanaAyuda: "Só as horas que cobra. Procurar clientes, burocracia e formação não contam. O habitual é de 20 a 30 em 40.",
  facturacionMensual: "Faturação necessária por mês",
  facturacionAnual: "Faturação necessária por ano",
  errorIngreso: "Indique quanto quer ganhar por ano.",
  errorImpuestos: "Os impostos têm de ficar abaixo de 100%.",
  errorHoras: "Indique quantas horas por semana consegue faturar.",
  observacionFacturables: "Se cobrar menos do que isto, vai ganhar menos do que planeou ou trabalhar mais horas.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
