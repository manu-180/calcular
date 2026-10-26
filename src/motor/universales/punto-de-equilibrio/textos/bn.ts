import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosBn: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "break-even",
  ui: () => ({
    fijos: "মাসে স্থায়ী খরচ",
    fijosAyuda: "কিছু বিক্রি না হলেও যা দিতে হয়: দোকান বা অফিস ভাড়া, স্থায়ী বেতন, বিল, সফটওয়্যার।",
    precio: "প্রতি ইউনিটের বিক্রয়মূল্য",
    variable: "প্রতি ইউনিটের পরিবর্তনশীল খরচ",
    variableAyuda: "প্রতিটি বিক্রিতে যা খরচ হয়: কাঁচামাল, মাল কেনা, কমিশন, ডেলিভারি।",
    objetivo: "মাসে লক্ষ্য মুনাফা (ঐচ্ছিক)",
    objetivoAyuda: "খরচ উঠিয়ে বাড়তি কত বিক্রি করতে হবে, তা দেখতে।",
    unidades: "ব্রেক-ইভেনে পৌঁছাতে ইউনিট",
    facturacion: "ব্রেক-ইভেনে পৌঁছাতে বিক্রি",
    contribucion: "প্রতি ইউনিটে অবদান মার্জিন",
    contribucionAyuda: "প্রতিটি বিক্রি স্থায়ী খরচ মেটাতে যা রেখে যায়: দাম বিয়োগ পরিবর্তনশীল খরচ।",
    contribucionPct: "অবদান মার্জিন (%)",
    unidadesObjetivo: "লক্ষ্য মুনাফার জন্য ইউনিট",
    facturacionObjetivo: "লক্ষ্য মুনাফার জন্য বিক্রি",
    errorPrecio: "একটি ইউনিটের বিক্রয়মূল্য লিখুন।",
    errorMargen: "পরিবর্তনশীল খরচ দামের সমান বা বেশি: প্রতিটি বিক্রিতে লোকসান হয়, ব্রেক-ইভেনে কখনো পৌঁছানো যাবে না। দাম বা খরচ আবার দেখুন।",
    observacionRedondeo: "ইউনিট ওপরের দিকে গোল করা হয়েছে, কারণ একটি ইউনিটের অংশ বিক্রি করা যায় না।",
  }),
};
