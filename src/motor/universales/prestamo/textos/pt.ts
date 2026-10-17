import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

const base: TextosUi<UiPrestamo> = {
  slug: "simulador-de-emprestimo",
  ui: () => ({
    monto: "Valor do empréstimo",
    tasa: "Taxa de juros anual (%)",
    tasaAyuda: "A taxa nominal ao ano da proposta. Se ela vier ao mês, multiplique por 12. Tarifas não estão incluídas.",
    meses: "Prazo em meses",
    extra: "Valor extra por mês (opcional)",
    extraAyuda: "O que você somaria a cada mês para quitar antes. Tudo vai para abater a dívida.",
    cuota: "Parcela mensal",
    intereses: "Total de juros",
    total: "Total pago",
    mesesReales: "Meses para quitar com o valor extra",
    ahorro: "Juros que você economiza",
    tabla: "Tabela de amortização",
    colMes: "Mês",
    colPago: "Parcela",
    colInteres: "Juros",
    colCapital: "Amortização",
    colSaldo: "Saldo devedor",
    errorMonto: "Coloque um valor maior que zero.",
    observacionCostos: "A parcela não inclui seguros, tarifas nem impostos que a instituição pode somar. Peça o custo total antes de assinar.",
    observacionExtra: (meses, ahorro) => `Com o valor extra você quita em ${meses} meses e economiza ${ahorro} de juros.`,
  }),
};

const portugal = (): Partial<UiPrestamo> => ({
  monto: "Montante do empréstimo",
  tasa: "Taxa de juro anual (TAN, %)",
  tasaAyuda: "A TAN da proposta. Se vier ao mês, multiplique por 12. As comissões não estão incluídas.",
  extraAyuda: "O que somaria todos os meses para liquidar mais cedo. Vai tudo para amortizar a dívida.",
  cuota: "Prestação mensal",
  mesesReales: "Meses para liquidar com o valor extra",
  ahorro: "Juros que poupa",
  colPago: "Prestação",
  colSaldo: "Capital em dívida",
  errorMonto: "Indique um valor maior que zero.",
  observacionCostos: "A prestação não inclui seguros, comissões nem impostos que a instituição possa somar. Peça a TAEG antes de assinar.",
  observacionExtra: (meses, ahorro) => `Com o valor extra, liquida em ${meses} meses e poupa ${ahorro} de juros.`,
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
