import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosBn: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "বিলের পরিমাণ",
    porcentaje: "টিপস (%)",
    porcentajeAyuda: "টিপস দেওয়ার রীতি দেশ আর জায়গাভেদে আলাদা। যে হার আপনার কাছে ঠিক মনে হয়, সেটি বেছে নিন।",
    personas: "কতজন মিলে দেবেন",
    redondear: "জনপ্রতি অঙ্ক পূর্ণ সংখ্যায় বাড়িয়ে নিন",
    redondearAyuda: "সবাই যেন গোল অঙ্কে টাকা দিতে পারেন। বাড়তি অংশটুকু টিপসে যোগ হয়।",
    propina: "টিপস",
    total: "টিপসসহ মোট",
    porPersona: "জনপ্রতি",
    propinaEfectiva: "পূর্ণ সংখ্যা করার পর টিপস",
    errorPersonas: "অন্তত একজনকে বিল দিতে হবে।",
    observacionRedondeo: (efectiva) => `গোল অঙ্ক করার পর টিপস দাঁড়ায় বিলের ${cifrasBn(efectiva)}%।`,
  }),
};
