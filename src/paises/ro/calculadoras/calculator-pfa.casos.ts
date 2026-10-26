import { definirCasos } from "@/motor/calculo";
import calculatorPfa from "./calculator-pfa";

const CF = "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm";
const BAZA = { pensionar: false, salariat: false, casOptional: false };

export default definirCasos(calculatorPfa, [
  {
    nombre: "Sistem real: 120.000 lei venituri, 20.000 lei cheltuieli",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Salariul minim la 1 ianuarie 2026: 4.050 lei. Net 100.000 ≥ 24 × 4.050 = 97.200, deci CAS 25 % × 97.200 = 24.300. CASS 10 % × 100.000 = 10.000. Impozit 10 % × (100.000 − 24.300 − 10.000) = 6.570 (art. 118). Rămân 59.130 lei.",
    },
    fecha: "2026-10-24",
    entrada: { sistem: "real", venituri: 120000, cheltuieli: 20000, norma: null, ...BAZA },
    esperado: { net: 100000, cas: 24300, cass: 10000, impozit: 6570, ramas: 59130, total: 40870 },
  },
  {
    nombre: "Normă de venit de 30.000 lei",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Sub 12 × 4.050 = 48.600 CAS nu e obligatoriu. CASS 10 % × 30.000 = 3.000. Impozit 10 % din normă (art. 69^2) = 3.000. Rămân 24.000 lei.",
    },
    fecha: "2026-10-24",
    entrada: { sistem: "norma", venituri: null, cheltuieli: null, norma: 30000, ...BAZA },
    esperado: { cas: 0, cass: 3000, impozit: 3000, ramas: 24000 },
  },
  {
    nombre: "Venit net mic: CASS la minimul de 6 salarii",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Net 20.000 < 6 × 4.050 = 24.300, deci CASS 2.430 (art. 174 alin. 6). Se deduce doar CASS pe venitul real, 2.000: impozit 10 % × 18.000 = 1.800. Rămân 15.770 lei.",
    },
    fecha: "2026-10-24",
    entrada: { sistem: "real", venituri: 30000, cheltuieli: 10000, norma: null, ...BAZA },
    esperado: { cas: 0, cass: 2430, impozit: 1800, ramas: 15770 },
  },
  {
    nombre: "Venit net mare: plafonul de 72 de salarii minime la CASS",
    origen: {
      tipo: "recalculado",
      url: CF,
      detalle: "Net 400.000. CAS 24.300. CASS 10 % × 72 × 4.050 = 29.160. Impozit 10 % × (400.000 − 24.300 − 29.160) = 34.654. Rămân 311.886 lei.",
    },
    fecha: "2026-10-24",
    entrada: { sistem: "real", venituri: 450000, cheltuieli: 50000, norma: null, ...BAZA },
    esperado: { cas: 24300, cass: 29160, impozit: 34654, ramas: 311886 },
  },
  {
    nombre: "Pensionar: fără CAS",
    origen: { tipo: "recalculado", url: CF, detalle: "Art. 150 alin. (1): pensionarii nu datorează CAS. Net 60.000: CASS 6.000, impozit 10 % × 54.000 = 5.400. Rămân 48.600 lei." },
    fecha: "2026-10-24",
    entrada: { sistem: "real", venituri: 60000, cheltuieli: 0, norma: null, pensionar: true, salariat: false, casOptional: false },
    esperado: { cas: 0, cass: 6000, impozit: 5400, ramas: 48600 },
  },
  {
    nombre: "Cu salariu: fără diferența de CASS până la 6 salarii minime",
    origen: { tipo: "recalculado", url: CF, detalle: "Art. 174 alin. (7): cu salarii de cel puțin 6 salarii minime nu se datorează diferența. Net 20.000: CASS 2.000, impozit 1.800. Rămân 16.200 lei." },
    fecha: "2026-10-24",
    entrada: { sistem: "real", venituri: 20000, cheltuieli: 0, norma: null, pensionar: false, salariat: true, casOptional: false },
    esperado: { cass: 2000, impozit: 1800, ramas: 16200 },
  },
  {
    nombre: "CAS opțional sub 12 salarii minime",
    origen: { tipo: "recalculado", url: CF, detalle: "Art. 148 alin. (4): baza este 12 × 4.050 = 48.600, CAS 12.150. CASS 2.430. Impozit 10 % × (20.000 − 12.150 − 2.000) = 585. Rămân 4.835 lei." },
    fecha: "2026-10-24",
    entrada: { sistem: "real", venituri: 20000, cheltuieli: 0, norma: null, pensionar: false, salariat: false, casOptional: true },
    esperado: { cas: 12150, cass: 2430, impozit: 585, ramas: 4835 },
  },
  {
    nombre: "Fără venituri",
    origen: { tipo: "recalculado", url: CF, detalle: "Fără venituri nu există calcul." },
    fecha: "2026-10-24",
    entrada: { sistem: "real", venituri: 0, cheltuieli: 0, norma: null, ...BAZA },
    esperaError: true,
  },
]);
