import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosBn: TextosUi<UiPromedio> = {
  slug: "weighted-average",
  ui: () => ({
    nota: (n) => `নম্বর ${cifrasBn(n)}`,
    notaAyuda: "নম্বর বা মানের সাথে তার ভার লিখুন। যে সারি লাগবে না, সেটি খালি রাখুন।",
    peso: (n) => `ভার ${cifrasBn(n)}`,
    pesoAyuda: "শতাংশ, ক্রেডিট বা কতবার, যেকোনোটি দিতে পারেন। ভার না দিলে সব মান সমান ভারে হিসাব হবে।",
    ponderado: "ভারযুক্ত গড়",
    simple: "সাধারণ গড়",
    cantidad: "মানের সংখ্যা",
    sumaPesos: "মোট ভার",
    errorSinNotas: "অন্তত একটি মান লিখুন।",
    errorFaltaPeso: "এই মানের কোনো ভার নেই। ভার ব্যবহার করলে প্রতিটি মানের পাশে লিখুন।",
    errorFaltaNota: "এই ভারের কোনো মান নেই। মান লিখুন, নয়তো ভারটি মুছে দিন।",
    errorPesosCero: "মোট ভার শূন্য। অন্তত একটি ভার শূন্যের চেয়ে বড় দিন।",
    sinPesos: "ভার না থাকলে ভারযুক্ত গড় আর সাধারণ গড় একই হয়।",
  }),
};
