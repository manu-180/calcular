import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosUz: TextosUi<UiDescuento> = {
  slug: "chegirma-kalkulyatori",
  ui: () => ({
    precio: "Boshlangʻich narx",
    descuento: "Chegirma (%)",
    segundoDescuento: "Qoʻshimcha chegirma (%)",
    segundoDescuentoAyuda: "Birinchi chegirma ustiga yana chegirma boʻlsa, shu yerga kiriting.",
    ahorro: "Tejaganingiz",
    final: "Chegirmali narx",
    descuentoTotal: "Umumiy chegirma",
    errorMayorA100: "Chegirma yuz foizdan oshmasligi kerak.",
    observacionDoble: (efectivo) => `Ketma-ket ikki chegirma oddiy qoʻshilmaydi. Umumiy chegirma: ${efectivo}%.`,
  }),
};
