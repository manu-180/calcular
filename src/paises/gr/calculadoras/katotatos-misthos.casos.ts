import { definirCasos } from "@/motor/calculo";
import katotatosMisthos from "./katotatos-misthos";

const KYA_2026 = "https://ia37rg02wpsa01.blob.core.windows.net/fek/02/2026/20260201759.pdf";
const KYA_2025 = "https://ia37rg02wpsa01.blob.core.windows.net/fek/02/2025/20250201476.pdf";

export default definirCasos(katotatosMisthos, [
  {
    nombre: "Από 1.4.2026: 920 € και 41,09 €, χωρίς παιδιά",
    origen: {
      tipo: "recalculado",
      url: KYA_2026,
      detalle: "Εισφορές 920 × 13,37% = 123,00. Φορολογητέο 12880 − 1722 = 11158. Φόρος 900 + 1158 × 20% = 1131,60 − 777 = 354,60, / 14 = 25,33. Καθαρά 771,67.",
    },
    fecha: "2026-10-24",
    entrada: { paidia: 0, ilikia: "31" },
    esperado: { miktos: 920, imeromisthio: 41.09, eisforesMina: 123, forosMina: 25.33, katharaMina: 771.67 },
  },
  {
    nombre: "Ένα παιδί: δεύτερο κλιμάκιο 18%",
    origen: { tipo: "recalculado", url: KYA_2026, detalle: "Φόρος 900 + 1158 × 18% = 1108,44 − 900 = 208,44, / 14 = 14,89. Καθαρά 920 − 123 − 14,89 = 782,11." },
    fecha: "2026-10-24",
    entrada: { paidia: 1, ilikia: "31" },
    esperado: { forosMina: 14.89, katharaMina: 782.11 },
  },
  {
    nombre: "31.3.2026: ισχύουν ακόμη 880 € και 39,30 €",
    origen: { tipo: "oficial", url: KYA_2025, detalle: "ΚΥΑ 8233/2025: 880 € και 39,30 € από 1.4.2025. Η νέα ΚΥΑ ισχύει από 1.4.2026." },
    fecha: "2026-03-31",
    entrada: { paidia: 0, ilikia: "31" },
    esperado: { miktos: 880, imeromisthio: 39.3 },
  },
  {
    nombre: "1.4.2026: πρώτη ημέρα του νέου κατώτατου",
    origen: { tipo: "oficial", url: KYA_2026, detalle: "ΚΥΑ 8934/2026: «Η ισχύς της παρούσας άρχεται από 1 Απριλίου 2026»." },
    fecha: "2026-04-01",
    entrada: { paidia: 0, ilikia: "31" },
    esperado: { miktos: 920, imeromisthio: 41.09 },
  },
]);
