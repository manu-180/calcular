import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-calculator";

const SIN = { extras: 0, dependientes: "0", otrasDeducciones: 0 } as const;

export default definirCasos(calculadora, [
  {
    nombre: "Rs 30,000 basic, no PAYE",
    origen: {
      tipo: "recalculado",
      detalle: "CSG 1.5% × 30,000 = 450. NSF 1% × 29,710 (ceiling) = 297.10. 13 × 30,000 = 390,000 is inside the 0% band. Net 30,000 − 450 − 297.10 = 29,252.90.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 30000, ...SIN },
    esperado: { neto: 29252.9, paye: 0, csg: 450, nsf: 297.1 },
  },
  {
    nombre: "Rs 60,000 basic, CSG at 3%",
    origen: {
      tipo: "recalculado",
      detalle: "CSG 3% × 60,000 = 1,800. NSF 297.10. 13 × 60,000 = 780,000: 10% × 280,000 = 28,000; 28,000 / 13 = 2,153.85, rounded down to 2,153. Net 60,000 − 1,800 − 297.10 − 2,153 = 55,749.90.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 60000, ...SIN },
    esperado: { neto: 55749.9, paye: 2153, csg: 1800, tasaCsg: 3, marginal: 10 },
  },
  {
    nombre: "Rs 100,000 basic with 2 dependents",
    origen: {
      tipo: "recalculado",
      detalle: "13 × 100,000 − 190,000 = 1,110,000. Tax 50,000 + 20% × 110,000 = 72,000; / 13 = 5,538.46 → 5,538. CSG 3,000, NSF 297.10. Net 91,164.90.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 100000, extras: 0, dependientes: "2", otrasDeducciones: 0 },
    esperado: { neto: 91164.9, paye: 5538, marginal: 20 },
  },
  {
    nombre: "Rs 1,000,000 a month reaches the 35% band",
    origen: {
      tipo: "recalculado",
      detalle: "13 × 1,000,000 = 13,000,000. Tax 50,000 + 20% × 11,000,000 + 35% × 1,000,000 = 2,600,000; / 13 = 200,000. CSG 30,000, NSF 297.10. Net 769,702.90.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 1000000, ...SIN },
    esperado: { neto: 769702.9, paye: 200000, marginal: 35 },
  },
  {
    nombre: "Rs 40,000 basic and Rs 5,000 overtime",
    origen: {
      tipo: "recalculado",
      detalle: "CSG 1.5% × 40,000 = 600 (overtime left out). NSF 297.10. 13 × 45,000 = 585,000: 10% × 85,000 = 8,500; / 13 = 653.85 → 653. Net 45,000 − 600 − 297.10 − 653 = 43,449.90.",
    },
    fecha: "2026-10-24",
    entrada: { basico: 40000, extras: 5000, dependientes: "0", otrasDeducciones: 0 },
    esperado: { neto: 43449.9, paye: 653, csg: 600, bruto: 45000 },
  },
  {
    nombre: "No salary",
    origen: { tipo: "recalculado", detalle: "A basic salary of zero is rejected." },
    fecha: "2026-10-24",
    entrada: { basico: 0, ...SIN },
    esperaError: true,
  },
]);
