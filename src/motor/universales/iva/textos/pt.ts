import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosPt: TextosUi<UiIva> = {
  slug: "calculadora-de-iva",
  ui: () => ({
    operacion: "O que você quer fazer?",
    agregar: "Somar o imposto a um preço sem imposto",
    quitar: "Tirar o imposto de um preço que já o inclui",
    monto: "Preço",
    montoAyuda: "Sem imposto se for somar; com imposto se for tirar.",
    otraTasa: "Outra taxa de imposto (%)",
    otraTasaAyuda: "Opcional. Se o produto tem uma taxa reduzida, coloque aqui. Se não, vale a taxa normal.",
    neto: "Preço sem imposto",
    impuesto: "Imposto (IVA ou equivalente)",
    total: "Preço com imposto",
    tasaUsada: "Taxa aplicada",
    errorTasa: "A taxa de imposto não é válida.",
  }),
};
