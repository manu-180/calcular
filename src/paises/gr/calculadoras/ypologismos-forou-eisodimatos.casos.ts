import { definirCasos } from "@/motor/calculo";
import ypologismosForouEisodimatos from "./ypologismos-forou-eisodimatos";

const KFE = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2025/20250100198.pdf";
const MEIOSI = "https://ia37rg02wpsa01.blob.core.windows.net/fek/01/2023/20230100136.pdf";

export default definirCasos(ypologismosForouEisodimatos, [
  {
    nombre: "20.000 €, χωρίς παιδιά",
    origen: { tipo: "recalculado", url: KFE, detalle: "10000 × 9% + 10000 × 20% = 2900. Μείωση 777 − 8000 × 2% = 617. Φόρος 2283." },
    fecha: "2026-10-24",
    entrada: { eisodima: 20000, paidia: 0, ilikia: "31" },
    esperado: { forosKlimakas: 2900, meiosi: 617, foros: 2283, oriakos: 20 },
  },
  {
    nombre: "20.000 €, ένα παιδί",
    origen: { tipo: "recalculado", url: KFE, detalle: "900 + 10000 × 18% = 2700. Μείωση 900 − 160 = 740. Φόρος 1960." },
    fecha: "2026-10-24",
    entrada: { eisodima: 20000, paidia: 1, ilikia: "31" },
    esperado: { forosKlimakas: 2700, meiosi: 740, foros: 1960 },
  },
  {
    nombre: "50.000 €, έξι παιδιά: τρίτο κλιμάκιο 14% και μείωση 2.000 €",
    origen: {
      tipo: "recalculado",
      url: MEIOSI,
      detalle: "0 + 0 + 10000 × 14% + 10000 × 34% + 10000 × 39% = 8700. Μείωση 1780 + 220 = 2000, χωρίς περιορισμό (5 παιδιά και άνω). Φόρος 6700.",
    },
    fecha: "2026-10-24",
    entrada: { eisodima: 50000, paidia: 6, ilikia: "31" },
    esperado: { forosKlimakas: 8700, meiosi: 2000, foros: 6700 },
  },
  {
    nombre: "25.000 €, 28 ετών: 9% στα δύο πρώτα κλιμάκια",
    origen: { tipo: "recalculado", url: KFE, detalle: "20000 × 9% + 5000 × 26% = 3100. Μείωση 777 − 260 = 517. Φόρος 2583." },
    fecha: "2026-10-24",
    entrada: { eisodima: 25000, paidia: 0, ilikia: "26-30" },
    esperado: { forosKlimakas: 3100, meiosi: 517, foros: 2583 },
  },
  {
    nombre: "Αρνητικό εισόδημα",
    origen: { tipo: "recalculado", url: KFE, detalle: "Το φορολογητέο δεν μπορεί να είναι αρνητικό." },
    fecha: "2026-10-24",
    entrada: { eisodima: -100, paidia: 0, ilikia: "31" },
    esperaError: true,
  },
]);
