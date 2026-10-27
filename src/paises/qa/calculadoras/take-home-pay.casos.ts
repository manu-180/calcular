import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Expatriate with QAR 12,000 basic, 4,000 housing and 1,000 other",
    origen: { tipo: "recalculado", detalle: "No GRSIA contribution for expatriates and no tax on salaries: 12,000 + 4,000 + 1,000 = 17,000." },
    fecha: "2026-10-26",
    entrada: { basico: 12000, vivienda: 4000, otros: 1000, qatari: false, social: null },
    esperado: { neto: 17000, bruto: 17000, aporte: 0, anual: 204000 },
  },
  {
    nombre: "Qatari with housing above the cap",
    origen: { tipo: "recalculado", detalle: "Law 1/2022 art. 11-12: base 20,000 + 2,000 social + min(8,000; 6,000) = 28,000. 7% = 1,960. Gross 20,000 + 8,000 + 500 + 2,000 = 30,500. Net 28,540." },
    fecha: "2026-10-26",
    entrada: { basico: 20000, vivienda: 8000, otros: 500, qatari: true, social: 2000 },
    esperado: { base: 28000, aporte: 1960, bruto: 30500, neto: 28540 },
  },
  {
    nombre: "Qatari above the QAR 100,000 contribution cap",
    origen: { tipo: "recalculado", detalle: "Base 110,000 capped at 100,000. 7% = 7,000. Net 110,000 - 7,000 = 103,000." },
    fecha: "2026-10-26",
    entrada: { basico: 110000, vivienda: 0, otros: 0, qatari: true, social: 0 },
    esperado: { base: 100000, aporte: 7000, neto: 103000 },
  },
  {
    nombre: "Basic salary of zero is not valid",
    origen: { tipo: "recalculado", detalle: "basico = 0." },
    fecha: "2026-10-26",
    entrada: { basico: 0, vivienda: 0, otros: 0, qatari: false, social: null },
    esperaError: true,
  },
]);
