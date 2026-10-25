import { definirCasos } from "@/motor/calculo";
import forosEleftheronEpangelmation from "./foros-eleftheron-epangelmation";

const KFE = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100198.pdf";

export default definirCasos(forosEleftheronEpangelmation, [
  {
    nombre: "30.000 € έσοδα, 5.000 € έξοδα, 1η κατηγορία",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle: "Εισφορές (250,77 + 10) × 12 = 3129,24. Κέρδος 21870,76. Φόρος 900 + 2000 + 1870,76 × 26% = 3386,40 (χωρίς μείωση του άρθρου 16).",
    },
    fecha: "2026-10-24",
    entrada: { esoda: 30000, exoda: 5000, kategoria: "1", anergia: true, paidia: 0, ilikia: "31" },
    esperado: { eisfores: 3129.24, kerdos: 21870.76, foros: 3386.4, kathara: 18484.36 },
  },
  {
    nombre: "60.000 € έσοδα, 3η κατηγορία, δύο παιδιά",
    origen: {
      tipo: "recalculado",
      url: KFE,
      detalle: "Εισφορές (360,63 + 10) × 12 = 4447,56. Κέρδος 45552,44. Φόρος 900 + 1600 + 2200 + 3400 + 5552,44 × 39% = 10265,45.",
    },
    fecha: "2026-10-24",
    entrada: { esoda: 60000, exoda: 10000, kategoria: "3", anergia: true, paidia: 2, ilikia: "31" },
    esperado: { kerdos: 45552.44, foros: 10265.45 },
  },
  {
    nombre: "Χωρίς έσοδα",
    origen: { tipo: "recalculado", url: KFE, detalle: "Χωρίς έσοδα δεν υπάρχει υπολογισμός." },
    fecha: "2026-10-24",
    entrada: { esoda: 0, exoda: 0, kategoria: "1", anergia: true, paidia: 0, ilikia: "31" },
    esperaError: true,
  },
]);
