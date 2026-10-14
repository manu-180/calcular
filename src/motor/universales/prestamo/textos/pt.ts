import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosPt: TextosUi<UiPrestamo> = {
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
