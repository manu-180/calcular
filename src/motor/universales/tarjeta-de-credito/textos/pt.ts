import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const base: TextosUi<UiTarjetaDeCredito> = {
  slug: "quitar-cartao-de-credito",
  ui: () => ({
    saldo: "Saldo devedor do cartão",
    tasa: "Taxa de juros anual (%)",
    tasaAyuda: "Está na fatura. Se ela mostrar a taxa ao mês, multiplique por 12.",
    modo: "Como você vai pagar?",
    modoFijo: "Um valor fixo por mês",
    modoMinimo: "O pagamento mínimo",
    pagoFijo: "Pagamento mensal fixo",
    minimoPorcentaje: "Pagamento mínimo (% do saldo)",
    minimoPorcentajeAyuda: "O que o emissor do cartão pede por mês. Se não tiver certeza, 5% é um valor comum.",
    minimoPiso: "Pagamento mínimo nunca abaixo de",
    meses: "Meses para quitar",
    intereses: "Juros que você paga",
    total: "Total pago",
    primerPago: "Primeiro pagamento mínimo",
    tabla: "Plano mês a mês",
    colMes: "Mês",
    colPago: "Pagamento",
    colInteres: "Juros",
    colCapital: "Amortização",
    colSaldo: "Saldo",
    errorSaldo: "Coloque o saldo que você deve no cartão.",
    errorFaltaPago: "Coloque quanto você vai pagar por mês.",
    errorNoCubre: (interes) => `Com esse pagamento o saldo nunca diminui: só os juros do primeiro mês são ${interes}. Aumente o pagamento.`,
    errorMuyLargo: "Com esse pagamento você levaria mais de 50 anos para quitar. Aumente o pagamento.",
    observacionAnios: (anios, meses) => {
      const a = anios === "1" ? "1 ano" : `${anios} anos`;
      const m = meses === "0" ? "" : meses === "1" ? " e 1 mês" : ` e ${meses} meses`;
      return `Isso dá ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Se você pagar sempre ${pago}, o mesmo que o primeiro mínimo, termina em ${meses} meses e economiza ${ahorro} de juros.`,
    observacionNoGastar: "A conta supõe que você não faz compras novas no cartão enquanto paga a dívida.",
  }),
};

const portugal = (): Partial<UiTarjetaDeCredito> => ({
  saldo: "Dívida do cartão",
  tasa: "Taxa de juro anual (TAN, %)",
  tasaAyuda: "Está no extrato. Se aparecer a taxa ao mês, multiplique por 12.",
  modo: "Como vai pagar?",
  minimoPorcentajeAyuda: "O que o banco pede todos os meses. Se não tiver a certeza, 5% é um valor habitual.",
  meses: "Meses para liquidar",
  intereses: "Juros que paga",
  errorSaldo: "Indique quanto deve no cartão.",
  errorFaltaPago: "Indique quanto vai pagar por mês.",
  errorNoCubre: (interes) => `Com esse pagamento a dívida nunca diminui: só os juros do primeiro mês são ${interes}. Aumente o pagamento.`,
  errorMuyLargo: "Com esse pagamento demoraria mais de 50 anos a liquidar. Aumente o pagamento.",
  observacionFijo: (pago, meses, ahorro) =>
    `Se pagar sempre ${pago}, o mesmo que o primeiro mínimo, termina em ${meses} meses e poupa ${ahorro} de juros.`,
  observacionNoGastar: "A conta parte do princípio de que não faz compras novas com o cartão enquanto paga a dívida.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
