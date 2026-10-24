import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KSh 100,000 gross",
    origen: { tipo: "recalculado", detalle: "100,000 − NSSF 6,000 − SHIF 2,750 − Housing Levy 1,500 − PAYE 19,308.35 = 70,441.65." },
    fecha: "2026-10-17",
    entrada: { bruto: 100000, otraPension: 0, interesHipoteca: 0, primasSeguro: 0 },
    esperado: { neto: 70441.65, paye: 19308.35, nssf: 6000, nssfTier1: 540, nssfTier2: 5460, totalDeducido: 29558.35 },
  },
  {
    nombre: "KSh 30,000 gross",
    origen: { tipo: "recalculado", detalle: "30,000 − 1,800 − 825 − 450 − 731.25 = 26,193.75." },
    fecha: "2026-10-17",
    entrada: { bruto: 30000, otraPension: 0, interesHipoteca: 0, primasSeguro: 0 },
    esperado: { neto: 26193.75, paye: 731.25 },
  },
  {
    nombre: "KSh 20,000 gross, no PAYE",
    origen: { tipo: "recalculado", detalle: "20,000 − 1,200 − 550 − 300 = 17,950." },
    fecha: "2026-10-17",
    entrada: { bruto: 20000, otraPension: 0, interesHipoteca: 0, primasSeguro: 0 },
    esperado: { neto: 17950, paye: 0 },
  },
  {
    nombre: "KSh 150,000 with KSh 10,000 to a pension scheme",
    origen: {
      tipo: "recalculado",
      detalle:
        "NSSF 540 + 6% × 99,000 = 6,480. Pension deducted 16,480. SHIF 4,125. Housing Levy 2,250. Taxable 127,145. Tax 2,400 + 2,083.25 + 94,812 × 30% = 32,926.85. PAYE 30,526.85. Net 150,000 − 6,480 − 4,125 − 2,250 − 30,526.85 − 10,000 = 96,618.15.",
    },
    fecha: "2026-10-17",
    entrada: { bruto: 150000, otraPension: 10000, interesHipoteca: 0, primasSeguro: 0 },
    esperado: { neto: 96618.15, paye: 30526.85, nssf: 6480 },
  },
]);
