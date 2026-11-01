import { definirCasos } from "@/motor/calculo";
import ijtimoiySoliq from "./ijtimoiy-soliq-kalkulyatori";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(ijtimoiySoliq, [
  {
    nombre: "Bitta xodim, 6 000 000 soʻm",
    origen: { tipo: "recalculado", url: SK, detalle: "405-modda: 6 000 000 × 12% = 720 000; jami 6 720 000; yiliga 80 640 000." },
    fecha: "2026-10-24",
    entrada: { fond: 6000000, xodimlar: 1, tashkilot: "umumiy" },
    esperado: { ijtimoiy: 720000, jamiOylik: 6720000, jamiYillik: 80640000, jshds: 720000, qolga: 5280000 },
  },
  {
    nombre: "5 xodim, har biri 4 000 000 soʻm",
    origen: { tipo: "recalculado", url: SK, detalle: "Fond 20 000 000; 12% = 2 400 000." },
    fecha: "2026-10-24",
    entrada: { fond: 4000000, xodimlar: 5, tashkilot: "umumiy" },
    esperado: { ijtimoiy: 2400000, jamiOylik: 22400000 },
  },
  {
    nombre: "Budjet tashkiloti",
    origen: { tipo: "recalculado", url: SK, detalle: "405-modda 2-band: 25%; 8 000 000 × 25% = 2 000 000." },
    fecha: "2026-10-24",
    entrada: { fond: 8000000, xodimlar: 1, tashkilot: "budjet" },
    esperado: { ijtimoiy: 2000000, stavka: 25 },
  },
]);
