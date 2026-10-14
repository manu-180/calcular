import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosPt: TextosUi<UiAhorroRetiro> = {
  slug: "calculadora-de-aposentadoria",
  ui: () => ({
    edadActual: "Sua idade hoje",
    edadRetiro: "Idade em que quer se aposentar",
    actual: "O que você já tem guardado",
    aporte: "Aporte mensal",
    rendimiento: "Rendimento real anual (%)",
    rendimientoAyuda: "O que o investimento rende acima da inflação. De 2% a 5% é uma hipótese prudente no longo prazo.",
    aniosRenta: "Anos de aposentadoria a cobrir",
    aniosRentaAyuda: "Por quantos anos você quer viver dessa reserva.",
    capital: "Reserva ao se aposentar",
    renta: "Renda mensal dessa reserva",
    aportado: "Total aportado",
    intereses: "Crescimento total",
    tabla: "Crescimento por idade",
    colEdad: "Idade",
    colAportado: "Aportado até aqui",
    colSaldo: "Reserva",
    errorEdades: "A idade de aposentadoria tem que ser maior que a sua idade hoje.",
    errorSinAhorro: "Coloque o que já tem guardado ou um aporte mensal.",
    observacionDineroDeHoy: "Os valores estão em dinheiro de hoje, porque o rendimento já desconta a inflação.",
    observacionPublica: "Aqui entra só a sua reserva própria. Não inclui a aposentadoria pública que você possa receber.",
  }),
};
