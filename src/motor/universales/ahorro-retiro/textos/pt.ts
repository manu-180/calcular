import { conVariantes, PT_LUSOFONIA } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

const base: TextosUi<UiAhorroRetiro> = {
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

const portugal = (): Partial<UiAhorroRetiro> => ({
  edadActual: "A sua idade hoje",
  edadRetiro: "Idade em que se quer reformar",
  actual: "O que já tem poupado",
  aporte: "Poupança mensal",
  aniosRenta: "Anos de reforma a cobrir",
  aniosRentaAyuda: "Durante quantos anos quer viver destas poupanças.",
  capital: "Poupanças ao reformar-se",
  renta: "Rendimento mensal dessas poupanças",
  aportado: "Total poupado",
  colAportado: "Poupado até aqui",
  colSaldo: "Poupanças",
  errorEdades: "A idade da reforma tem de ser maior do que a sua idade hoje.",
  errorSinAhorro: "Indique o que já tem poupado ou uma poupança mensal.",
  observacionPublica: "Aqui entram só as suas poupanças. Não inclui a pensão da Segurança Social que possa receber.",
});

// Fuera de Portugal (Angola, Mozambique, Cabo Verde...) la norma es la europea, pero los impuestos y
// la seguridad social tienen otro nombre: lo propio de Portugal se dice en palabras de cualquier país.
const lusofonia = (): Partial<UiAhorroRetiro> => ({
  observacionPublica: "Aqui entram só as suas poupanças. Não inclui a pensão pública que possa receber.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal, [PT_LUSOFONIA]: lusofonia });
