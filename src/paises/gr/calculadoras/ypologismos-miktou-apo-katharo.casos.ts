import { definirCasos } from "@/motor/calculo";
import ypologismosMiktouApoKatharo from "./ypologismos-miktou-apo-katharo";

const KFE = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100198.pdf";

export default definirCasos(ypologismosMiktouApoKatharo, [
  {
    nombre: "1.000 € καθαρά, χωρίς παιδιά, ΚΠΚ 101",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle:
        "Μικτός 1256,13: εισφορές 167,94, φορολογητέο 14 × 1088,19 = 15234,66, κλίμακα 900 + 5234,66 × 20% = 1946,93, μείωση 777 − 64,69 = 712,31, φόρος 1234,62 / 14 = 88,19. Καθαρά 1256,13 − 167,94 − 88,19 = 1000. Με 1256,12 βγαίνει 999,99.",
    },
    fecha: "2026-10-24",
    entrada: { kathara: 1000, paidia: 0, ilikia: "31", kpk: "101" },
    esperado: { miktos: 1256.13, eisforesMina: 167.94, forosMina: 88.19, katharaMina: 1000 },
  },
  {
    nombre: "1.200 € καθαρά, ένα παιδί, ΚΠΚ 103",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle: "Μικτός 1470,33: εισφορές 10,37% = 152,47, φόρος του έτους 1650,01 / 14 = 117,86. Καθαρά 1470,33 − 152,47 − 117,86 = 1200.",
    },
    fecha: "2026-10-24",
    entrada: { kathara: 1200, paidia: 1, ilikia: "31", kpk: "103" },
    esperado: { miktos: 1470.33, katharaMina: 1200 },
  },
  {
    nombre: "Καθαρός μηδέν",
    origen: { tipo: "recalculado", url: KFE, detalle: "Χωρίς ποσό δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { kathara: 0, paidia: 0, ilikia: "31", kpk: "101" },
    esperaError: true,
  },
]);
