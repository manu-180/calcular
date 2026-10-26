import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiHormigon } from "../definicion";

export const textosBn: TextosUi<UiHormigon> = {
  slug: "concrete-calculator",
  ui: () => ({
    largo: (u) => `দৈর্ঘ্য (${cifrasBn(u)})`,
    ancho: (u) => `প্রস্থ (${cifrasBn(u)})`,
    espesor: (u) => `পুরুত্ব (${cifrasBn(u)})`,
    espesorAyuda: "উঠান বা হাঁটার পথের ঢালাই সাধারণত ১০ সেন্টিমিটার (৪ ইঞ্চি) পুরু হয়। গাড়ি চলার জায়গায় ১২ থেকে ১৫ সেন্টিমিটার।",
    margen: "বাড়তি অংশ (%)",
    margenAyuda: "অসমান জমি আর পড়ে নষ্ট হওয়ার জন্য। সাধারণত ৫% থেকে ১০%।",
    bolsa: (u) => `সিমেন্টের এক বস্তার ওজন (${cifrasBn(u)})`,
    volumen: (u) => `সঠিক আয়তন (${cifrasBn(u)})`,
    volumenTotal: (u) => `কত কংক্রিট লাগবে (${cifrasBn(u)})`,
    volumenPies: "কত কংক্রিট লাগবে (ঘনফুট)",
    cemento: (u) => `সিমেন্ট (${cifrasBn(u)})`,
    bolsas: "সিমেন্টের বস্তা",
    arena: (u) => `বালি (${cifrasBn(u)})`,
    piedra: (u) => `খোয়া বা পাথর (${cifrasBn(u)})`,
    agua: (u) => (u === "L" ? "পানি (লিটার)" : "পানি (গ্যালন)"),
    errorMedida: "এই মাপটি শূন্যের বেশি হতে হবে।",
    aviso:
      "উপকরণের হিসাবটি সাধারণ কাজের ১:২:৩ মিশ্রণ ধরে একটি নির্দেশনা (প্রতি ঘনমিটারে প্রায় ৩৫০ কেজি সিমেন্ট)। মিশ্রণের অনুপাত, কাজের ধরন আর স্থানীয় উপকরণে এটি বদলায়। কাজ শুরুর আগে প্রকৌশলী বা ঠিকাদারের সঙ্গে মিলিয়ে নিন।",
  }),
};
