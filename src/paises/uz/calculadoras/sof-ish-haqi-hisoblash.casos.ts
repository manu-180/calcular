import { definirCasos } from "@/motor/calculo";
import sofIshHaqi from "./sof-ish-haqi-hisoblash";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(sofIshHaqi, [
  {
    nombre: "Qoʻlga 5 280 000 soʻm",
    origen: { tipo: "recalculado", url: SK, detalle: "381-modda: 5 280 000 / 0,88 = 6 000 000; soliq 720 000; ijtimoiy soliq 12% = 720 000." },
    fecha: "2026-10-24",
    entrada: { sof: 5280000, tashkilot: "umumiy" },
    esperado: { yalpi: 6000000, soliq: 720000, olinadi: 5280000, ijtimoiy: 720000, jamiXarajat: 6720000 },
  },
  {
    nombre: "Qoʻlga 5 000 000 soʻm, toq summa",
    origen: { tipo: "recalculado", url: SK, detalle: "5 000 000 / 0,88 = 5 681 818,2 → 5 681 818; soliq 681 818,16 → 681 818; qoʻlga 5 000 000." },
    fecha: "2026-10-24",
    entrada: { sof: 5000000, tashkilot: "umumiy" },
    esperado: { yalpi: 5681818, soliq: 681818, olinadi: 5000000 },
  },
  {
    nombre: "Budjet tashkiloti, qoʻlga 3 960 000",
    origen: { tipo: "recalculado", url: SK, detalle: "Yalpi 4 500 000; 405-modda: 25% = 1 125 000." },
    fecha: "2026-10-24",
    entrada: { sof: 3960000, tashkilot: "budjet" },
    esperado: { yalpi: 4500000, ijtimoiy: 1125000, jamiXarajat: 5625000 },
  },
]);
