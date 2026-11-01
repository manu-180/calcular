import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosBn: TextosUi<UiPresupuesto> = {
  slug: "budget",
  ui: () => ({
    ingreso: "মাসিক হাতে পাওয়া আয়",
    ingresoAyuda: "কর ও অন্যান্য কর্তন বাদ দিয়ে প্রতি মাসে যত টাকা হাতে বা হিসাবে আসে।",
    pctNecesidades: "প্রয়োজনীয় খরচ (%)",
    pctNecesidadesAyuda: "বাসাভাড়া, খাবার, বিদ্যুৎ-গ্যাস-পানি, যাতায়াত, চিকিৎসা ও ঋণের ন্যূনতম কিস্তি।",
    pctGustos: "শখের খরচ (%)",
    pctGustosAyuda: "বাইরে খাওয়া, অপ্রয়োজনীয় কেনাকাটা, সাবস্ক্রিপশন ও বেড়ানো।",
    pctAhorro: "সঞ্চয় (%)",
    pctAhorroAyuda: "জরুরি তহবিল, লক্ষ্যের সঞ্চয়, অবসরের জমা ও ঋণের আগাম পরিশোধ।",
    necesidades: "প্রয়োজনীয় খরচ",
    gustos: "শখের খরচ",
    ahorro: "সঞ্চয়",
    ahorroAnual: "বছরে মোট সঞ্চয়",
    errorIngreso: "মাসিক হাতে পাওয়া আয় লিখুন।",
    errorSuma: (suma) => `তিনটি শতাংশের যোগফল ${cifrasBn(suma)}%। যোগফল ১০০% হতে হবে।`,
    observacionAhorroBajo: "সঞ্চয় ১০%-এর কম হলে হঠাৎ খরচ সামলানোর সুযোগ প্রায় থাকে না। সম্ভব হলে শখের খরচ একটু কমান।",
  }),
};
