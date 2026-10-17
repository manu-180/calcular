import { conVariantes } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

const base: TextosUi<UiIva> = {
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

const portugal = (): Partial<UiIva> => ({
  operacion: "O que quer fazer?",
  agregar: "Somar o IVA a um preço sem IVA",
  quitar: "Tirar o IVA de um preço que já o inclui",
  montoAyuda: "Sem IVA se for somar; com IVA se for tirar.",
  otraTasa: "Outra taxa de IVA (%)",
  otraTasaAyuda: "Opcional. Se o produto tem taxa intermédia ou reduzida, indique-a aqui. Se não, aplica-se a taxa normal.",
  neto: "Preço sem IVA",
  impuesto: "IVA",
  total: "Preço com IVA",
  errorTasa: "A taxa de IVA não é válida.",
});

export const textosPt = conVariantes(base, { "pt-PT": portugal });
