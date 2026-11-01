import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosUz: TextosUi<UiSumarDias> = {
  slug: "sanaga-kun-qoshish",
  ui: () => ({
    fecha: "Boshlanish sanasi",
    operacion: "Amal",
    sumar: "Kun qoʻshish",
    restar: "Kun ayirish",
    dias: "Kunlar soni",
    tipo: "Kunlar turi",
    corridos: "Kalendar kunlari",
    habiles: "Ish kunlari (dushanbadan jumagacha)",
    resultado: "Natija sanasi",
    diaSemana: "Hafta kuni",
    diasCorridos: "Jami kalendar kunlari",
    nombresDias: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
    errorDias: "Kunlar soni butun son boʻlishi va 100 yildan oshmasligi kerak.",
    notaHabiles: "Ish kunlarida shanba va yakshanba tashlab ketiladi, bayram kunlari esa yoʻq. Oraliqda bayram boʻlsa, uni alohida qoʻshing.",
  }),
};
