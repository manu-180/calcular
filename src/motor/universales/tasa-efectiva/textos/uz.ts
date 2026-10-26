import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosUz: TextosUi<UiTasaEfectiva> = {
  slug: "samarali-foiz-stavkasi",
  ui: () => ({
    direccion: "Qaysi stavka sizda bor?",
    nominalAEfectiva: "Yillik nominal stavka (samaralisiga oʻtkazish)",
    efectivaANominal: "Yillik samarali stavka (nominalga oʻtkazish)",
    tasa: "Yillik stavka (%)",
    tasaAyuda: "Taklif yoki shartnomada qanday yozilgan boʻlsa, shunday kiriting.",
    capitalizacion: "Foizlarni kapitallashtirish",
    capitalizacionAyuda: "Foiz qarz yoki omonat summasiga qanchalik tez-tez qoʻshilishi. Kredit va kredit kartalarda odatda har oy.",
    mensual: "Har oy (yiliga 12 marta)",
    trimestral: "Har chorakda (yiliga 4 marta)",
    semestral: "Har yarim yilda (yiliga 2 marta)",
    diaria: "Har kuni (yiliga 365 marta)",
    efectiva: "Yillik samarali foiz stavkasi",
    nominal: "Yillik nominal foiz stavkasi",
    periodica: "Bir davr uchun stavka",
    errorNegativa: "Stavka manfiy boʻlishi mumkin emas. Noldan boshlab raqam kiriting.",
    observacionDiferencia: (puntos) => `Foizga ham foiz hisoblangani uchun samarali stavka nominal stavkadan yuqori. Farq, foiz punktida: ${puntos}.`,
  }),
};
