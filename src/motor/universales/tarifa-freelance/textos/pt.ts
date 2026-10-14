import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosPt: TextosUi<UiTarifaFreelance> = {
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
