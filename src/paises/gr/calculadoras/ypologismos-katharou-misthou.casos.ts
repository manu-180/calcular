import { definirCasos } from "@/motor/calculo";
import ypologismosKatharouMisthou from "./ypologismos-katharou-misthou";

const KFE = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100198.pdf";

export default definirCasos(ypologismosKatharouMisthou, [
  {
    nombre: "1.500 € μικτά, χωρίς παιδιά, ΚΠΚ 101",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle:
        "Εισφορές 1500 × 13,37% = 200,55. Έτος 14 × 1500 = 21000, εισφορές 2807,70, φορολογητέο 18192,30. Κλίμακα 900 + 8192,30 × 20% = 2538,46. Μείωση 777 − 6192,30 × 2% = 653,15. Φόρος 1885,31 / 14 = 134,67. Καθαρά 1164,78.",
    },
    fecha: "2026-10-24",
    entrada: { miktos: 1500, paidia: 0, ilikia: "31", kpk: "101" },
    esperado: { eisforesMina: 200.55, forologiteo: 18192.3, forosKlimakas: 2538.46, meiosi: 653.15, forosEtous: 1885.31, forosMina: 134.67, katharaMina: 1164.78 },
  },
  {
    nombre: "1.500 € μικτά με δύο παιδιά: δεύτερο κλιμάκιο 16%",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle: "Κλίμακα 900 + 8192,30 × 16% = 2210,77. Μείωση 1120 − 123,85 = 996,15. Φόρος 1214,62 / 14 = 86,76. Καθαρά 1500 − 200,55 − 86,76 = 1212,69.",
    },
    fecha: "2026-10-24",
    entrada: { miktos: 1500, paidia: 2, ilikia: "31", kpk: "101" },
    esperado: { forosKlimakas: 2210.77, meiosi: 996.15, forosEtous: 1214.62, katharaMina: 1212.69 },
  },
  {
    nombre: "Νέος έως 25 ετών, 1.200 € μικτά: μηδενικός φόρος μέχρι 20.000 €",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle: "Εισφορές 160,44. Φορολογητέο 16800 − 2246,16 = 14553,84, κάτω από 20000: συντελεστής 0. Καθαρά 1200 − 160,44 = 1039,56.",
    },
    fecha: "2026-10-24",
    entrada: { miktos: 1200, paidia: 0, ilikia: "ews-25", kpk: "101" },
    esperado: { forosEtous: 0, katharaMina: 1039.56 },
  },
  {
    nombre: "8.000 € μικτά: πάνω από το ανώτατο όριο εισφορών",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle:
        "Εισφορές 7761,94 × 13,37% = 1037,77. Φορολογητέο 112000 − 14528,78 = 97471,22. Κλίμακα 16700 + 37471,22 × 44% = 33187,34. Μείωση 777 − 1709,42 < 0, άρα 0. Φόρος 33187,34 / 14 = 2370,52. Καθαρά 4591,71.",
    },
    fecha: "2026-10-24",
    entrada: { miktos: 8000, paidia: 0, ilikia: "31", kpk: "101" },
    esperado: { eisforesMina: 1037.77, forosKlimakas: 33187.34, meiosi: 0, forosMina: 2370.52, katharaMina: 4591.71 },
  },
  {
    nombre: "Πέντε παιδιά: τρίτο κλιμάκιο 16% και μείωση χωρίς περιορισμό",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle: "Φορολογητέο 35000 − 4679,50 = 30320,50. Κλίμακα 0 + 0 + 10000 × 16% + 320,50 × 34% = 1708,97. Μείωση 1780, περιορίζεται στον φόρο. Φόρος 0. Καθαρά 2500 − 334,25 = 2165,75.",
    },
    fecha: "2026-10-24",
    entrada: { miktos: 2500, paidia: 5, ilikia: "31", kpk: "101" },
    esperado: { forosKlimakas: 1708.97, meiosi: 1708.97, forosEtous: 0, katharaMina: 2165.75 },
  },
  {
    nombre: "Μισθός μηδέν",
    origen: { tipo: "recalculado", url: KFE, detalle: "Χωρίς μισθό δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { miktos: 0, paidia: 0, ilikia: "31", kpk: "101" },
    esperaError: true,
  },
]);
