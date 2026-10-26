import { definirCasos } from "@/motor/calculo";
import posobieNaRozhdenie from "./posobie-na-rozhdenie";

const SK = "https://adilet.zan.kz/rus/docs/K2300000224";

export default definirCasos(posobieNaRozhdenie, [
  {
    nombre: "Первый ребенок в 2026 году",
    origen: { tipo: "recalculado", url: SK, detalle: "Статья 80: 38 МРП × 4325 = 164 350." },
    fecha: "2026-10-24",
    entrada: { ocherednost: "1-3", deti: 1 },
    esperado: { vsego: 164350, mrpKolichestvo: 38 },
  },
  {
    nombre: "Четвертый ребенок",
    origen: { tipo: "recalculado", url: SK, detalle: "63 МРП × 4325 = 272 475." },
    fecha: "2026-10-24",
    entrada: { ocherednost: "4", deti: 1 },
    esperado: { vsego: 272475 },
  },
  {
    nombre: "Двойня",
    origen: { tipo: "recalculado", url: SK, detalle: "Пособие на каждого ребенка: 2 × 164 350 = 328 700." },
    fecha: "2026-10-24",
    entrada: { ocherednost: "1-3", deti: 2 },
    esperado: { vsego: 328700, naRebenka: 164350 },
  },
]);
