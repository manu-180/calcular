import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "লিটার" : "গ্যালন");

export const textosBn: TextosUi<UiPintura> = {
  slug: "paint-calculator",
  ui: () => ({
    modo: "আপনার কাছে কোন মাপ আছে?",
    modoMedidas: "দেয়ালের দৈর্ঘ্য আর উচ্চতা",
    modoSuperficie: "মোট ক্ষেত্রফল",
    largo: (u) => `দেয়ালগুলোর মোট দৈর্ঘ্য (${cifrasBn(u)})`,
    largoAyuda: "যে দেয়ালগুলো রং করবেন সেগুলোর দৈর্ঘ্য যোগ করে দিন। একটি ঘরের ক্ষেত্রে চারপাশের মাপ।",
    alto: (u) => `দেয়ালের উচ্চতা (${cifrasBn(u)})`,
    superficie: (u) => `রং করার ক্ষেত্রফল (${cifrasBn(u)})`,
    aberturas: (u) => `বাদ দেওয়ার দরজা-জানালা (${cifrasBn(u)})`,
    aberturasAyuda: "একটি দরজা প্রায় ২ m² (২১ ft²), আর সাধারণ একটি জানালা ১ থেকে ২ m²।",
    manos: "কয় কোট রং",
    rendimiento: (u) => `রঙের কভারেজ (${cifrasBn(u)})`,
    rendimientoAyuda: "রঙের কৌটায় লেখা থাকে: প্রতি কোটে কতটা জায়গা ঢাকে। না জানলে প্রস্তাবিত মানটি রাখুন।",
    recomendado: (u) => `কত রং কিনবেন (${volumen(u)})`,
    recomendadoAyuda: "টাচআপ আর রোলারে লেগে থাকা রঙের জন্য ১০% বেশি ধরা আছে।",
    necesario: (u) => `ঠিক যতটা লাগবে (${volumen(u)})`,
    neta: (u) => `রং করার ক্ষেত্রফল (${cifrasBn(u)})`,
    errorMedidas: "দেয়ালের দৈর্ঘ্য আর উচ্চতা দিন।",
    errorSuperficie: "রং করার ক্ষেত্রফল দিন।",
    errorAberturas: "দরজা-জানালা পুরো দেয়াল জুড়ে থাকতে পারে না।",
    errorRendimiento: "কভারেজ শূন্যের বেশি হতে হবে।",
  }),
};
