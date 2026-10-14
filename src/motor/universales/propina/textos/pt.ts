import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosPt: TextosUi<UiPropina> = {
  slug: "gorjeta",
  ui: () => ({
    cuenta: "Valor da conta",
    porcentaje: "Gorjeta (%)",
    porcentajeAyuda: "O costume muda de um país para outro e de um lugar para outro. Escolha o que achar justo.",
    personas: "Quantas pessoas vão pagar",
    redondear: "Arredondar a parte de cada um para cima",
    redondearAyuda: "Assim cada um paga um valor redondo. O que sobra vai para a gorjeta.",
    propina: "Gorjeta",
    total: "Total com gorjeta",
    porPersona: "Cada pessoa paga",
    propinaEfectiva: "Gorjeta depois do arredondamento",
    errorPersonas: "Pelo menos uma pessoa precisa pagar.",
    observacionRedondeo: (efectiva) => `Com o arredondamento, a gorjeta fica em ${efectiva}% da conta.`,
  }),
};
