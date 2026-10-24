import { definirCasos } from "@/motor/calculo";
import daromadSoligi from "./daromad-soligi-kalkulyatori";

const SK = "https://lex.uz/uz/docs/-4674902";

export default definirCasos(daromadSoligi, [
  {
    nombre: "Rezident, ish haqi 10 000 000",
    origen: { tipo: "recalculado", url: SK, detalle: "381-modda birinchi qismi: 12%; 1 200 000." },
    fecha: "2026-10-24",
    entrada: { daromad: 10000000, turi: "rezident-mehnat" },
    esperado: { soliq: 1200000, stavka: 12, qoladi: 8800000 },
  },
  {
    nombre: "Rezident, dividend 2 000 000",
    origen: { tipo: "recalculado", url: SK, detalle: "381-modda ikkinchi qismi: 5%; 100 000." },
    fecha: "2026-10-24",
    entrada: { daromad: 2000000, turi: "rezident-dividend" },
    esperado: { soliq: 100000, stavka: 5 },
  },
  {
    nombre: "Norezident, dividend 2 000 000",
    origen: { tipo: "recalculado", url: SK, detalle: "382-modda 1-band: 10%; 200 000." },
    fecha: "2026-10-24",
    entrada: { daromad: 2000000, turi: "norezident-dividend" },
    esperado: { soliq: 200000, stavka: 10, qoladi: 1800000 },
  },
]);
