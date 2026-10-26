import { definirCasos } from "@/motor/calculo";
import indemnizatieDeMaternitate from "./indemnizatie-de-maternitate";

const CNAS = "https://cnas.gov.md/ro/servicii/servicii/indemnizatii/indemnizatie-de-maternitate-femeilor-asigurate-si-sotiilor-aflate-la";

export default definirCasos(indemnizatieDeMaternitate, [
  {
    nombre: "20.000 de lei, naștere fără complicații",
    origen: { tipo: "recalculado", url: CNAS, detalle: "CNAS: 100 % din baza de calcul, pe 126 de zile calendaristice." },
    fecha: "2026-10-26",
    entrada: { venit: 20000, nastere: "normala" },
    esperado: { lunar: 20000, zile: 126 },
  },
  {
    nombre: "Venit peste plafon, naștere complicată",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Plafon 5 × 17.400 = 87.000; 140 de zile la nașteri complicate sau gemeni." },
    fecha: "2026-10-26",
    entrada: { venit: 120000, nastere: "complicata" },
    esperado: { lunar: 87000, zile: 140, baza: 87000 },
  },
  {
    nombre: "Venit zero",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Fără venit asigurat nu există bază de calcul." },
    fecha: "2026-10-26",
    entrada: { venit: 0, nastere: "normala" },
    esperaError: true,
  },
]);
