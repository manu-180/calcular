import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosBn: TextosUi<UiPrestamo> = {
  slug: "loan",
  ui: () => ({
    monto: "ঋণের পরিমাণ",
    tasa: "বার্ষিক সুদের হার (%)",
    tasaAyuda: "চুক্তি বা অফারে লেখা বার্ষিক সুদের হার। চার্জ ও ফি এর মধ্যে ধরা হয়নি।",
    meses: "মেয়াদ (মাস)",
    extra: "প্রতি মাসে বাড়তি পরিশোধ (ঐচ্ছিক)",
    extraAyuda: "আগে ঋণ শেষ করতে প্রতি মাসে কিস্তির সঙ্গে যত টাকা বেশি দেবেন। পুরোটা আসল কমাতে যায়।",
    cuota: "মাসিক কিস্তি (EMI)",
    intereses: "মোট সুদ",
    total: "মোট পরিশোধ",
    mesesReales: "বাড়তি পরিশোধসহ মেয়াদ (মাস)",
    ahorro: "যত সুদ বাঁচবে",
    tabla: "কিস্তির তালিকা",
    colMes: "কিস্তি",
    colPago: "পরিশোধ",
    colInteres: "সুদ",
    colCapital: "আসল",
    colSaldo: "বাকি ঋণ",
    errorMonto: "শূন্যের বেশি একটি পরিমাণ লিখুন।",
    observacionCostos: "এই কিস্তিতে ব্যাংকের বিমা, প্রসেসিং ফি বা অন্য চার্জ ধরা হয়নি। চুক্তির আগে মোট খরচ জেনে নিন।",
    observacionExtra: (meses, ahorro) => `বাড়তি পরিশোধ করলে ঋণ ${cifrasBn(meses)} মাসে শেষ হবে এবং সুদ বাঁচবে ${cifrasBn(ahorro)}।`,
  }),
};
