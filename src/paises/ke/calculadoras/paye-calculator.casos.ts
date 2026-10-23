import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

const KRA = "https://www.kra.go.ke/individual/filing-paying/types-of-taxes/paye" as const;

export default definirCasos(calculadora, [
  {
    nombre: "KSh 100,000 a month, no other deductions",
    origen: {
      tipo: "recalculado",
      url: KRA,
      detalle:
        "NSSF 540 + 6% × 91,000 = 6,000. SHIF 2.75% = 2,750. Housing Levy 1.5% = 1,500. Taxable 100,000 − 10,250 = 89,750. Tax 2,400 + 8,333 × 25% + 57,417 × 30% = 21,708.35. Less personal relief 2,400 = 19,308.35.",
    },
    fecha: "2026-10-17",
    entrada: { bruto: 100000, otraPension: 0, fondoMedico: 0, interesHipoteca: 0, primasSeguro: 0 },
    esperado: { paye: 19308.35, gravable: 89750, nssf: 6000, shif: 2750, housingLevy: 1500, impuestoBruto: 21708.35, marginal: 30 },
  },
  {
    nombre: "KSh 30,000 a month reaches the 25% band",
    origen: {
      tipo: "recalculado",
      detalle: "NSSF 540 + 1,260 = 1,800. SHIF 825. Housing Levy 450. Taxable 26,925. Tax 2,400 + 2,925 × 25% = 3,131.25. PAYE 731.25.",
    },
    fecha: "2026-10-17",
    entrada: { bruto: 30000, otraPension: 0, fondoMedico: 0, interesHipoteca: 0, primasSeguro: 0 },
    esperado: { paye: 731.25, gravable: 26925, marginal: 25 },
  },
  {
    nombre: "KSh 20,000 a month pays no PAYE",
    origen: { tipo: "recalculado", detalle: "Taxable 20,000 − 1,200 − 550 − 300 = 17,950. Tax 1,795 is less than the personal relief of 2,400." },
    fecha: "2026-10-17",
    entrada: { bruto: 20000, otraPension: 0, fondoMedico: 0, interesHipoteca: 0, primasSeguro: 0 },
    esperado: { paye: 0, gravable: 17950 },
  },
  {
    nombre: "KSh 1 million with pension at the cap and insurance relief",
    origen: {
      tipo: "recalculado",
      detalle:
        "NSSF 6,480 + pension 30,000 capped at 30,000. SHIF 27,500, Housing Levy 15,000. Taxable 927,500. Tax 2,400 + 2,083.25 + 140,300.10 + 97,500 + 44,625 = 286,908.35. Reliefs 2,400 + 15% × 10,000 = 3,900. PAYE 283,008.35.",
    },
    fecha: "2026-10-17",
    entrada: { bruto: 1000000, otraPension: 30000, fondoMedico: 0, interesHipoteca: 0, primasSeguro: 10000 },
    esperado: { paye: 283008.35, gravable: 927500, nssf: 6480, alivioSeguro: 1500, marginal: 35 },
  },
  {
    nombre: "Insurance relief stops at KSh 5,000 a month",
    origen: { tipo: "recalculado", detalle: "15% of 50,000 is 7,500, capped at 60,000 / 12 = 5,000." },
    fecha: "2026-10-17",
    entrada: { bruto: 200000, otraPension: 0, fondoMedico: 0, interesHipoteca: 0, primasSeguro: 50000 },
    esperado: { alivioSeguro: 5000 },
  },
  {
    nombre: "No pay",
    origen: { tipo: "recalculado", detalle: "Gross pay has to be more than zero." },
    fecha: "2026-10-17",
    entrada: { bruto: 0, otraPension: 0, fondoMedico: 0, interesHipoteca: 0, primasSeguro: 0 },
    esperaError: true,
  },
]);
