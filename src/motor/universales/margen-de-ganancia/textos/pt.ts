import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

const base: TextosUi<UiMargenDeGanancia> = {
  slug: "margem-de-lucro",
  ui: () => ({
    modo: "O que você quer calcular?",
    modoPrecio: "A margem, pelo custo e o preço",
    modoMargen: "O preço para uma margem desejada",
    modoMarkup: "O preço para um markup desejado",
    costo: "Custo unitário",
    costoAyuda: "Quanto custa comprar ou produzir uma unidade, sem os impostos que você repassa ao cliente.",
    precio: "Preço de venda",
    precioAyuda: "Só se for calcular a margem. Sem impostos.",
    objetivo: "Margem ou markup desejado (%)",
    objetivoAyuda: "Só se for calcular o preço.",
    precioResultado: "Preço de venda",
    margen: "Margem de lucro",
    margenAyuda: "O lucro em porcentagem do preço de venda.",
    markup: "Markup",
    markupAyuda: "O lucro em porcentagem do custo.",
    ganancia: "Lucro por unidade",
    errorCosto: "Coloque o custo de uma unidade.",
    errorFaltaPrecio: "Coloque o preço de venda para calcular a margem.",
    errorFaltaObjetivo: "Coloque a margem ou o markup que você quer atingir.",
    errorMargen100: "A margem tem que ficar abaixo de 100%: isso seria o preço inteiro como lucro, sem custo nenhum.",
    observacionPerdida: "Com esse preço você vende abaixo do custo: perde dinheiro em cada venda.",
  }),
};

const portugal = (): Partial<UiMargenDeGanancia> => ({
  modo: "O que quer calcular?",
  costoAyuda: "Quanto custa comprar ou produzir uma unidade, sem os impostos que repercute no cliente.",
  margenAyuda: "O lucro em percentagem do preço de venda.",
  markupAyuda: "O lucro em percentagem do custo.",
  errorCosto: "Indique o custo de uma unidade.",
  errorFaltaPrecio: "Indique o preço de venda para calcular a margem.",
  errorFaltaObjetivo: "Indique a margem ou o markup que quer atingir.",
  observacionPerdida: "Com esse preço vende abaixo do custo: perde dinheiro em cada venda.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
