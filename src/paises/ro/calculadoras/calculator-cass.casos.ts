import { definirCasos } from "@/motor/calculo";
import calculatorCass from "./calculator-cass";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(calculatorCass, [
  {
    nombre: "Chirii, dividende și dobânzi: treapta de 12 salarii minime",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Chirii 36.000 − 20 % = 28.800; dividende 50.000 − 16 % = 42.000; dobânzi 5.000 − 10 % = 4.500. Total 75.300, între 48.600 și 97.200: baza 12 × 4.050 = 48.600, CASS 4.860 (art. 170 alin. 3 și 4).",
    },
    fecha: "2026-10-24",
    entrada: { chirii: 36000, dividende: 50000, dobanzi: 5000, drepturi: 0, altele: 0 },
    esperado: { total: 75300, bazaCass: 48600, cass: 4860, prag: 24300 },
  },
  {
    nombre: "Sub primul prag",
    origen: { tipo: "recalculado", url: CF, detalle: "Dobânzi 20.000 − 10 % = 18.000 < 24.300: fără CASS." },
    fecha: "2026-10-24",
    entrada: { chirii: 0, dividende: 0, dobanzi: 20000, drepturi: 0, altele: 0 },
    esperado: { cass: 0, bazaCass: 0 },
  },
  {
    nombre: "Drepturi de autor și alte venituri: treapta maximă",
    origen: { tipo: "recalculado", url: CF, detalle: "Drepturi 150.000 − 40 % = 90.000, plus 10.000 = 100.000 ≥ 97.200: baza 97.200, CASS 9.720." },
    fecha: "2026-10-24",
    entrada: { chirii: 0, dividende: 0, dobanzi: 0, drepturi: 150000, altele: 10000 },
    esperado: { bazaCass: 97200, cass: 9720 },
  },
  {
    nombre: "Fără venituri",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără venituri nu există calcul." },
    fecha: "2026-10-24",
    entrada: { chirii: 0, dividende: 0, dobanzi: 0, drepturi: 0, altele: 0 },
    esperaError: true,
  },
]);
