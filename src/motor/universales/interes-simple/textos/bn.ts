import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosBn: TextosUi<UiInteresSimple> = {
  slug: "simple-interest",
  ui: () => ({
    capital: "আসল",
    tasa: "বার্ষিক সুদের হার (%)",
    tiempo: "সময়",
    unidad: "সময়ের একক",
    dias: "দিন",
    meses: "মাস",
    anios: "বছর",
    base: "বছরে কত দিন ধরা হবে (দিনে হিসাব করলে)",
    baseAyuda: "কিছু আর্থিক প্রতিষ্ঠান বছরকে ৩৬০ দিন ধরে। নিশ্চিত না হলে ৩৬৫ রেখে দিন।",
    base365: "৩৬৫ দিন",
    base360: "৩৬০ দিন",
    interes: "সুদ",
    montoFinal: "আসল ও সুদ মিলিয়ে মোট",
    tasaPeriodo: "পুরো সময়ের সুদের হার",
    errorCapital: "শূন্যের বেশি আসল লিখুন।",
  }),
};
