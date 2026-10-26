import { definirCasos } from "@/motor/calculo";
import ishHaqi from "./ish-haqi-kalkulyatori";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(ishHaqi, [
  {
    nombre: "6 000 000 soʻm, rezident, korxona",
    origen: { tipo: "recalculado", url: SK, detalle: "381-modda: 6 000 000 × 12% = 720 000; qoʻlga 5 280 000. 405-modda: ijtimoiy soliq 720 000." },
    fecha: "2026-10-24",
    entrada: { maosh: 6000000, rezident: "rezident", tashkilot: "umumiy" },
    esperado: { soliq: 720000, sof: 5280000, ijtimoiy: 720000, jamiXarajat: 6720000, yillikSof: 63360000 },
  },
  {
    nombre: "4 500 000 soʻm, budjet tashkiloti",
    origen: { tipo: "recalculado", url: SK, detalle: "381-modda: 540 000 soliq; 405-modda: budjet tashkiloti 25% = 1 125 000." },
    fecha: "2026-10-24",
    entrada: { maosh: 4500000, rezident: "rezident", tashkilot: "budjet" },
    esperado: { soliq: 540000, sof: 3960000, ijtimoiy: 1125000 },
  },
  {
    nombre: "Norezident, 10 000 000 soʻm",
    origen: { tipo: "recalculado", url: SK, detalle: "382-modda 3-band: mehnat daromadi 12% = 1 200 000." },
    fecha: "2026-10-24",
    entrada: { maosh: 10000000, rezident: "norezident", tashkilot: "umumiy" },
    esperado: { soliq: 1200000, sof: 8800000, stavka: 12 },
  },
  {
    nombre: "Toq summa yaxlitlanadi",
    origen: { tipo: "recalculado", url: SK, detalle: "1 234 567 × 12% = 148 148,04 → 148 148; qoʻlga 1 086 419." },
    fecha: "2026-10-24",
    entrada: { maosh: 1234567, rezident: "rezident", tashkilot: "umumiy" },
    esperado: { soliq: 148148, sof: 1086419 },
  },
  {
    nombre: "Nol maosh xato",
    origen: { tipo: "recalculado", url: SK, detalle: "Summasiz hisoblab boʻlmaydi." },
    fecha: "2026-10-24",
    entrada: { maosh: 0, rezident: "rezident", tashkilot: "umumiy" },
    esperaError: true,
  },
]);
