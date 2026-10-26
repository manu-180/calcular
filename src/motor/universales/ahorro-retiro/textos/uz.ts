import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosUz: TextosUi<UiAhorroRetiro> = {
  slug: "pensiya-jamgarmasi-kalkulyatori",
  ui: () => ({
    edadActual: "Hozirgi yoshingiz",
    edadRetiro: "Pensiyaga chiqmoqchi boʻlgan yoshingiz",
    actual: "Hozir jamgʻargan mablagʻingiz",
    aporte: "Har oylik badal",
    rendimiento: "Yillik real daromadlilik (%)",
    rendimientoAyuda: "Investitsiyaning inflyatsiyadan yuqori daromadi. Uzoq muddatda 2% dan 5% gacha ehtiyotkor taxmin hisoblanadi.",
    aniosRenta: "Pensiyada qamrab olinadigan yillar",
    aniosRentaAyuda: "Bu jamgʻarmadan necha yil davomida pul olmoqchisiz.",
    capital: "Pensiyaga chiqqandagi jamgʻarma",
    renta: "Jamgʻarmadan oylik daromad",
    aportado: "Jami qoʻyilgan badallar",
    intereses: "Jami oʻsish",
    tabla: "Yosh boʻyicha oʻsish",
    colEdad: "Yosh",
    colAportado: "Shu paytgacha qoʻyilgan",
    colSaldo: "Jamgʻarma",
    errorEdades: "Pensiyaga chiqish yoshi hozirgi yoshingizdan katta boʻlishi kerak.",
    errorSinAhorro: "Hozirgi jamgʻarmangiz yoki har oylik badalni kiriting.",
    observacionDineroDeHoy: "Summalar bugungi pul qiymatida, chunki daromadlilikdan inflyatsiya allaqachon chiqarilgan.",
    observacionPublica: "Bu faqat shaxsiy jamgʻarmangiz. Davlat pensiyasi yoki olishingiz mumkin boʻlgan boshqa ijtimoiy toʻlovlar kirmaydi.",
  }),
};
