import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosBn: TextosUi<UiConsumoElectrico> = {
  slug: "electricity-cost",
  ui: () => ({
    potencia: "যন্ত্রের ক্ষমতা (ওয়াট)",
    potenciaAyuda: "যন্ত্রের লেবেল বা ম্যানুয়ালে ওয়াটে (W) লেখা থাকে। kW লেখা থাকলে ১০০০ দিয়ে গুণ করুন।",
    cantidad: "একই রকম কয়টি যন্ত্র",
    horas: "দিনে কত ঘণ্টা চলে",
    dias: "মাসে কত দিন চলে",
    precio: "প্রতি ইউনিটের (kWh) দাম",
    precioAyuda: "বিদ্যুৎ বিলে প্রতি ইউনিটের দাম লেখা থাকে। পুরো খরচ জানতে ভ্যাটসহ দামটি দিন।",
    kwhDia: "দৈনিক খরচ (ইউনিট)",
    kwhMes: "মাসিক খরচ (ইউনিট)",
    kwhAnio: "বার্ষিক খরচ (ইউনিট)",
    costoDia: "দৈনিক বিল",
    costoMes: "মাসিক বিল",
    costoAnio: "বার্ষিক বিল",
    errorHoras: "দিনে ২৪ ঘণ্টা: ব্যবহারের সময় ০ থেকে ২৪ ঘণ্টার মধ্যে হতে হবে।",
  }),
};
