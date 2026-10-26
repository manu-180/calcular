import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosUz: TextosUi<UiInteresCompuesto> = {
  slug: "murakkab-foiz-kalkulyatori",
  ui: () => ({
    capital: "Boshlangʻich summa",
    aporte: "Har oylik toʻldirish (ixtiyoriy)",
    aporteAyuda: "Har oy qoʻshadigan summangiz. U har oyning oxirida qoʻshiladi.",
    tasa: "Yillik foiz stavkasi (%)",
    anios: "Muddat (yil)",
    capitalizacion: "Kapitallashtirish",
    anual: "Har yili",
    semestral: "Har yarim yilda",
    trimestral: "Har chorakda",
    mensual: "Har oy",
    diaria: "Har kuni",
    saldo: "Yakuniy summa",
    aportado: "Jami qoʻyilgan mablagʻ",
    intereses: "Olingan foizlar",
    tabla: "Yillar boʻyicha oʻsish",
    colAnio: "Yil",
    colAportado: "Qoʻyilgan mablagʻ",
    colIntereses: "Foizlar",
    colSaldo: "Yil oxiridagi summa",
    errorSinDinero: "Boshlangʻich summa yoki har oylik toʻldirishni kiriting.",
    observacionIntereses: (porcentaje) => `Yakuniy summaning foizlardan iborat ulushi: ${porcentaje}%.`,
  }),
};
