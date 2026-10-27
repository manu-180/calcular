import { definirCasos } from "@/motor/calculo";
import calculadora from "./presumptive-tax-calculator";

const FOLLETO = "https://www.mra.mw/admin/storage/downloads/Presumptive_Tri-Fold_English_2023-2024.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "MRA table: K5,000,000 turnover",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Above K4,000,000 but not exceeding K7,000,000: K110,000, or K27,500 per quarter." },
    fecha: "2026-10-27",
    entrada: { ventas: 5000000 },
    esperado: { anual: 110000, trimestral: 27500 },
  },
  {
    nombre: "MRA table: K8,000,000 turnover",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Above K7,000,000 but not exceeding K10,000,000: K170,000, or K42,500 per quarter." },
    fecha: "2026-10-27",
    entrada: { ventas: 8000000 },
    esperado: { anual: 170000, trimestral: 42500 },
  },
  {
    nombre: "MRA table: K12,500,000 turnover",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Above K10,000,000 but not exceeding K12,500,000: K225,000, or K56,250 per quarter." },
    fecha: "2026-10-27",
    entrada: { ventas: 12500000 },
    esperado: { anual: 225000, trimestral: 56250 },
  },
  {
    nombre: "K3,000,000 turnover pays nothing",
    origen: { tipo: "oficial", url: FOLLETO, detalle: "Less than K4,000,000: K0." },
    fecha: "2026-10-27",
    entrada: { ventas: 3000000 },
    esperado: { anual: 0, trimestral: 0 },
  },
  {
    nombre: "K7,000,000 is in the K110,000 band",
    origen: { tipo: "recalculado", detalle: "The band runs up to and including K7,000,000." },
    fecha: "2026-10-27",
    entrada: { ventas: 7000000 },
    esperado: { anual: 110000 },
  },
  {
    nombre: "Above K12.5 million is rejected",
    origen: { tipo: "recalculado", detalle: "Presumptive tax applies up to K12,500,000 a year." },
    fecha: "2026-10-27",
    entrada: { ventas: 13000000 },
    esperaError: true,
  },
]);
