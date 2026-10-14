import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosPt: TextosUi<UiDescuento> = {
  slug: "desconto",
  ui: () => ({
    precio: "Preço original",
    descuento: "Desconto (%)",
    segundoDescuento: "Segundo desconto (%)",
    segundoDescuentoAyuda: "Se houver outro desconto em cima do primeiro, coloque aqui.",
    ahorro: "Quanto você economiza",
    final: "Preço final",
    descuentoTotal: "Desconto total",
    errorMayorA100: "Um desconto não pode passar de 100%.",
    observacionDoble: (efectivo) => `Dois descontos seguidos não se somam: no total são ${efectivo}% a menos.`,
  }),
};
