import { definirCasos } from "@/motor/calculo";
import boletaHonorarios from "./boleta-de-honorarios";

export default definirCasos(boletaHonorarios, [
  {
    nombre: "Boleta de $500.000 en 2026",
    origen: { tipo: "recalculado", detalle: "15,25 % de 500.000 = 76.250. Líquido 423.750." },
    fecha: "2026-10-07",
    entrada: { sentido: "bruto", monto: 500000 },
    esperado: { tasa: 15.25, retencion: 76250, liquido: 423750 },
  },
  {
    nombre: "Último día de 2025",
    origen: { tipo: "recalculado", detalle: "2025: 14,5 %. 500.000 × 14,5 % = 72.500." },
    fecha: "2025-12-31",
    entrada: { sentido: "bruto", monto: 500000 },
    esperado: { tasa: 14.5, retencion: 72500, liquido: 427500 },
  },
  {
    nombre: "Primer día de 2027",
    origen: { tipo: "recalculado", detalle: "2027: 16 %. 500.000 × 16 % = 80.000." },
    fecha: "2027-01-01",
    entrada: { sentido: "bruto", monto: 500000 },
    esperado: { tasa: 16, retencion: 80000, liquido: 420000 },
  },
  {
    nombre: "Del líquido al bruto",
    origen: { tipo: "recalculado", detalle: "100.000 / 0,8475 = 117.994,1 → 117.994. Retención 15,25 % = 17.994,09 → 17.994. Líquido 100.000." },
    fecha: "2026-10-07",
    entrada: { sentido: "liquido", monto: 100000 },
    esperado: { bruto: 117994, retencion: 17994, liquido: 100000 },
  },
]);
