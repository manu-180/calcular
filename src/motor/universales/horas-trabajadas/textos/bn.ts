import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosBn: TextosUi<UiHorasTrabajadas> = {
  slug: "time-card",
  ui: () => ({
    dias: ["সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার", "রবিবার"],
    entrada: (dia) => `${cifrasBn(dia)}: শুরু`,
    salida: (dia) => `${cifrasBn(dia)}: শেষ`,
    horarioAyuda: "যেদিন কাজ করেননি, সেদিনের ঘর ফাঁকা রাখুন। মধ্যরাতের পরে শেষ হলে সেটি একই শিফট হিসেবে ধরা হয়।",
    pausa: "দিনে বিনা বেতনের বিরতি (মিনিট)",
    pausaAyuda: "দুপুরের খাবার বা বিশ্রামের যে সময়ের বেতন হয় না। কাজের প্রতিটি দিন থেকে এটি বাদ যায়।",
    pagoHora: "ঘণ্টাপ্রতি মজুরি",
    umbral: "সপ্তাহে নিয়মিত কাজের ঘণ্টা (ঐচ্ছিক)",
    umbralAyuda: "এর বেশি ঘণ্টা ওভারটাইম হারে ধরা হয়। ওভারটাইম না থাকলে ফাঁকা রাখুন।",
    recargo: "ওভারটাইমে বাড়তি হার (%)",
    recargoAyuda: "প্রতি ওভারটাইম ঘণ্টায় কত বেশি দেওয়া হয়। ৫০% মানে দেড় গুণ।",
    horasTotales: "মোট কাজের ঘণ্টা",
    horasReloj: "ঘণ্টা ও মিনিটে",
    horasNormales: "নিয়মিত ঘণ্টা",
    horasExtra: "ওভারটাইম ঘণ্টা",
    pagoNormal: "নিয়মিত মজুরি",
    pagoExtra: "ওভারটাইম মজুরি",
    pagoTotal: "সপ্তাহের মোট মজুরি",
    tabla: "দিনভিত্তিক হিসাব",
    colDia: "দিন",
    colEntrada: "শুরু",
    colSalida: "শেষ",
    colHoras: "ঘণ্টা",
    errorFaltaSalida: (dia) => `${cifrasBn(dia)} এর শেষের সময় দেওয়া হয়নি।`,
    errorFaltaEntrada: (dia) => `${cifrasBn(dia)} এর শুরুর সময় দেওয়া হয়নি।`,
    errorIguales: (dia) => `${cifrasBn(dia)} এর শুরু আর শেষের সময় একই।`,
    errorPausa: (dia) => `বিরতির সময় ${cifrasBn(dia)} এর শিফটের সমান বা বেশি।`,
    errorSinDias: "অন্তত একটি দিনের শুরু ও শেষের সময় দিন।",
    observacionNoche: "কিছু শিফট পরের দিন শেষ হয়েছে: সেগুলো পুরোটা শুরুর দিনেই ধরা হয়েছে।",
    observacionGenerico: "এটি একটি সাধারণ হিসাব। সর্বোচ্চ কাজের ঘণ্টা, ওভারটাইমের নিয়ম আর রাত বা ছুটির দিনের কাজের মজুরি আইন ও আপনার চুক্তির ওপর নির্ভর করে।",
  }),
};
