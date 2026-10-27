import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

const MRA = "https://www.mra.mw/";

export default definirCasos(calculadora, [
  {
    nombre: "MRA PAYE calculator: K500,000 a month",
    origen: { tipo: "oficial", url: MRA, detalle: "The PAYE calculator on mra.mw returns PAYE of K99,000 and net pay of K401,000." },
    fecha: "2026-10-27",
    entrada: { bruto: 500000 },
    esperado: { paye: 99000, neto: 401000, banda1: 0, banda2: 99000, banda3: 0, marginal: 30 },
  },
  {
    nombre: "MRA PAYE calculator: K2,000,000 a month",
    origen: { tipo: "oficial", url: MRA, detalle: "The PAYE calculator on mra.mw returns PAYE of K570,500 and net pay of K1,429,500." },
    fecha: "2026-10-27",
    entrada: { bruto: 2000000 },
    esperado: { paye: 570500, neto: 1429500, banda2: 420000, banda3: 150500, marginal: 35 },
  },
  {
    nombre: "MRA PAYE calculator: K15,000,000 a month",
    origen: { tipo: "oficial", url: MRA, detalle: "The PAYE calculator on mra.mw returns PAYE of K5,370,500 and net pay of K9,629,500." },
    fecha: "2026-10-27",
    entrada: { bruto: 15000000 },
    esperado: { paye: 5370500, neto: 9629500, banda4: 2000000, marginal: 40 },
  },
  {
    nombre: "K170,000 pays no PAYE",
    origen: { tipo: "recalculado", detalle: "The whole amount sits in the 0% band." },
    fecha: "2026-10-27",
    entrada: { bruto: 170000 },
    esperado: { paye: 0, neto: 170000, marginal: 0 },
  },
  {
    nombre: "Zero pay is rejected",
    origen: { tipo: "recalculado", detalle: "Gross pay has to be above zero." },
    fecha: "2026-10-27",
    entrada: { bruto: 0 },
    esperaError: true,
  },
]);
