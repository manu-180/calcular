import { definirCasos } from "@/motor/calculo";
import calculatorMicrointreprindere from "./calculator-microintreprindere";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";

export default definirCasos(calculatorMicrointreprindere, [
  {
    nombre: "300.000 lei venituri, 180.000 lei cheltuieli, profit distribuit",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Impozit micro 1 % × 300.000 = 3.000 (art. 51). Profit 117.000. Dividende: 16 % × 117.000 = 18.720 (art. 97 alin. 7). Net 98.280. Curs BNR 23.10.2026: 5,3495; 300.000 / 5,3495 = 56.080 euro.",
    },
    fecha: "2026-10-24",
    entrada: { venituri: 300000, cheltuieli: 180000, dividende: true },
    esperado: { impozitMicro: 3000, profit: 117000, impozitDividende: 18720, dividendeNete: 98280, totalImpozite: 21720, curs: 5.3495, venituriEur: 56080.01 },
  },
  {
    nombre: "Fără dividende",
    origen: { tipo: "recalculado", url: CF, detalle: "Impozit micro 1 % × 200.000 = 2.000; profit 200.000 − 150.000 − 2.000 = 48.000." },
    fecha: "2026-10-24",
    entrada: { venituri: 200000, cheltuieli: 150000, dividende: false },
    esperado: { impozitMicro: 2000, profit: 48000, impozitDividende: 0, totalImpozite: 2000 },
  },
  {
    nombre: "Venituri peste plafonul de 100.000 de euro",
    origen: { tipo: "recalculado", url: CF, detalle: "Cu un curs fix de 5 lei, 600.000 lei = 120.000 euro, peste plafonul de 100.000 euro din art. 47." },
    fecha: "2026-10-24",
    entrada: { venituri: 600000, cheltuieli: 500000, dividende: false },
    valores: { "ro.eur": { fecha: "2026-10-23", valor: 5 } },
    esperado: { venituriEur: 120000, impozitMicro: 6000 },
  },
  {
    nombre: "Fără venituri",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără venituri nu există calcul." },
    fecha: "2026-10-24",
    entrada: { venituri: 0, cheltuieli: 0, dividende: false },
    esperaError: true,
  },
]);
