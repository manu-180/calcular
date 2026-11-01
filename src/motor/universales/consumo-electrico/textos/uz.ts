import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosUz: TextosUi<UiConsumoElectrico> = {
  slug: "elektr-energiyasi-kalkulyatori",
  ui: () => ({
    potencia: "Jihoz quvvati (Vt)",
    potenciaAyuda: "U yorliqda yoki qoʻllanmada vattlarda (Vt) yozilgan. kVt koʻrsatilgan boʻlsa, qiymatni 1000 marta koʻpaytiring.",
    cantidad: "Bir xil jihozlar soni",
    horas: "Kuniga ishlash soati",
    dias: "Oyiga ishlatiladigan kunlar",
    precio: "1 kVt·soat narxi",
    precioAyuda: "Elektr energiyasi hisobvaragʻingizda koʻrsatilgan tarif. Toʻliq xarajatni bilmoqchi boʻlsangiz, soliqlar bilan kiriting.",
    kwhDia: "Kunlik sarf (kVt·soat)",
    kwhMes: "Oylik sarf (kVt·soat)",
    kwhAnio: "Yillik sarf (kVt·soat)",
    costoDia: "Kunlik xarajat",
    costoMes: "Oylik xarajat",
    costoAnio: "Yillik xarajat",
    errorHoras: "Sutkada 24 soat bor: ishlash vaqti 0 va 24 soat oraligʻida boʻlishi kerak.",
  }),
};
