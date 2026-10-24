import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosBn: TextosUi<UiTasaEfectiva> = {
  slug: "apr-to-apy",
  ui: () => ({
    direccion: "আপনার জানা হার",
    nominalAEfectiva: "নামিক বার্ষিক হার (কার্যকর হারে রূপান্তর)",
    efectivaANominal: "কার্যকর বার্ষিক হার (নামিক হারে রূপান্তর)",
    tasa: "বার্ষিক হার (%)",
    tasaAyuda: "অফার বা চুক্তিতে যেভাবে লেখা আছে, সেভাবেই লিখুন।",
    capitalizacion: "চক্রবৃদ্ধির সময়কাল",
    capitalizacionAyuda: "কত দিন পরপর সুদ আসলের সঙ্গে যোগ হয়। লোন ও ক্রেডিট কার্ডে সাধারণত প্রতি মাসে।",
    mensual: "মাসিক (বছরে ১২ বার)",
    trimestral: "ত্রৈমাসিক (বছরে ৪ বার)",
    semestral: "ষাণ্মাসিক (বছরে ২ বার)",
    diaria: "দৈনিক (বছরে ৩৬৫ বার)",
    efectiva: "কার্যকর বার্ষিক হার",
    nominal: "নামিক বার্ষিক হার",
    periodica: "প্রতি সময়কালের হার",
    errorNegativa: "সুদের হার ঋণাত্মক হতে পারে না। শূন্য বা তার বেশি একটি সংখ্যা লিখুন।",
    observacionDiferencia: (puntos) => `সুদের ওপর সুদ যোগ হয় বলে কার্যকর হার নামিক হারের চেয়ে ${cifrasBn(puntos)} পয়েন্ট বেশি।`,
  }),
};
