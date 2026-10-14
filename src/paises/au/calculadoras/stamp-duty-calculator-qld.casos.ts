import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator-qld";

export default definirCasos(calculadora, [
  {
    nombre: "QRO example: $850,000 investment property",
    origen: {
      tipo: "oficial",
      url: "https://qro.qld.gov.au/duties/transfer-duty/calculate/rates/",
      detalle: "$17,325 + $4.50 for every $100 in $310,000 ($13,950) = $31,275.",
    },
    fecha: "2026-10-14",
    entrada: { valor: 850000, vivienda: false, primeraVivienda: false, nueva: false },
    esperado: { duty: 31275, general: 31275 },
  },
  {
    nombre: "$500,000 home",
    origen: { tipo: "recalculado", detalle: "Home concession: $3,500 + 1,500 × $3.50 = 8,750. General: 1,050 + 4,250 × 3.50 = 15,925." },
    fecha: "2026-10-14",
    entrada: { valor: 500000, vivienda: true, primeraVivienda: false, nueva: false },
    esperado: { duty: 8750, general: 15925, ahorro: 7175 },
  },
  {
    nombre: "First home, established, $750,000",
    origen: { tipo: "recalculado", detalle: "Home concession: 10,150 + 2,100 × 4.50 = 19,600. First home concession for $750,000 to $759,999.99: 8,675. Duty 10,925." },
    fecha: "2026-10-14",
    entrada: { valor: 750000, vivienda: true, primeraVivienda: true, nueva: false },
    esperado: { duty: 10925 },
  },
  {
    nombre: "First home, established, $500,000",
    origen: { tipo: "recalculado", detalle: "Home concession 8,750 minus 17,350 concession: nil." },
    fecha: "2026-10-14",
    entrada: { valor: 500000, vivienda: true, primeraVivienda: true, nueva: false },
    esperado: { duty: 0 },
  },
  {
    nombre: "First home, new, $900,000",
    origen: { tipo: "recalculado", detalle: "Full first home (new home) concession from 1 May 2025, no price cap." },
    fecha: "2026-10-14",
    entrada: { valor: 900000, vivienda: true, primeraVivienda: true, nueva: true },
    esperado: { duty: 0 },
  },
  {
    nombre: "Part of $100 counts as $100",
    origen: { tipo: "recalculado", detalle: "75,050.50: 1,050 + one part of $100 × $3.50 = 1,053.50." },
    fecha: "2026-10-14",
    entrada: { valor: 75050.5, vivienda: false, primeraVivienda: false, nueva: false },
    esperado: { duty: 1053.5 },
  },
]);
