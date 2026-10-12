import { definirCasos } from "@/motor/calculo";
import plazoFijo from "./plazo-fijo";

export default definirCasos(plazoFijo, [
  {
    nombre: "S/ 10,000 a un año con TEA de 5 %",
    origen: { tipo: "recalculado", detalle: "360 días: 10,000 × (1.05^(360/360) − 1) = 500. TEM = 1.05^(30/360) − 1 = 0.4074 %." },
    fecha: "2026-10-12",
    entrada: { capital: 10000, tea: 5, dias: 360 },
    esperado: { interes: 500, total: 10500, tem: 0.4074, cobertura: 123000 },
    tolerancia: 0.0001,
  },
  {
    nombre: "S/ 50,000 a 180 días con TEA de 6 %",
    origen: { tipo: "recalculado", detalle: "50,000 × (1.06^0.5 − 1) = 50,000 × 0.0295630 = 1,478.15." },
    fecha: "2026-10-12",
    entrada: { capital: 50000, tea: 6, dias: 180 },
    esperado: { interes: 1478.15, total: 51478.15 },
  },
  {
    nombre: "Depósito por encima de la cobertura del FSD",
    origen: { tipo: "recalculado", detalle: "150,000 × 4 % a 360 días = 6,000; total 156,000 > S/ 123,000 (FSD, setiembre a noviembre de 2026)." },
    fecha: "2026-10-12",
    entrada: { capital: 150000, tea: 4, dias: 360 },
    esperado: { interes: 6000, total: 156000 },
  },
]);
