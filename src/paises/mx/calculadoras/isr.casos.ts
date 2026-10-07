import { definirCasos } from "@/motor/calculo";
import isr from "./isr";

export default definirCasos(isr, [
  {
    nombre: "Quincena de 10,000",
    origen: { tipo: "recalculado", detalle: "Tarifa quincenal 2026, renglón 8651.41: 916.20 + 1348.59 × 21.36 % = 1204.26. Sin subsidio (20266.67 al mes)." },
    fecha: "2026-10-15",
    entrada: { sueldo: 10000, periodo: "quincenal", region: "general" },
    esperado: { limiteInferior: 8651.41, tasa: 21.36, cuotaFija: 916.2, marginal: 288.06, isr: 1204.26, subsidio: 0, retener: 1204.26, tasaEfectiva: 12.04 },
  },
  {
    nombre: "Mes de 10,000 con subsidio",
    origen: { tipo: "recalculado", detalle: "420.95 + (10000 − 7168.52) × 10.88 % = 729.02; subsidio 15.02 % × 3566.22 = 535.65; retención 193.37." },
    fecha: "2026-10-15",
    entrada: { sueldo: 10000, periodo: "mensual", region: "general" },
    esperado: { isr: 729.02, subsidio: 535.65, retener: 193.37 },
  },
  {
    nombre: "Semana de 2,500 con subsidio proporcional",
    origen: { tipo: "recalculado", detalle: "96.95 + (2500 − 1650.68) × 10.88 % = 189.36; subsidio 535.646244 / 30.4 × 7 = 123.34; retención 66.02." },
    fecha: "2026-10-15",
    entrada: { sueldo: 2500, periodo: "semanal", region: "general" },
    esperado: { isr: 189.36, subsidio: 123.34, retener: 66.02 },
  },
  {
    nombre: "Enero de 2026 con el subsidio de transición",
    origen: { tipo: "recalculado", detalle: "Subsidio de enero: 15.59 % × 3439.46 (UMA mensual 2025) = 536.21; 729.02 − 536.21 = 192.81." },
    fecha: "2026-01-20",
    entrada: { sueldo: 10000, periodo: "mensual", region: "general" },
    esperado: { subsidio: 536.21, retener: 192.81 },
  },
  {
    nombre: "Salario mínimo de la frontera norte",
    origen: { tipo: "recalculado", detalle: "440.87 × 30 = 13226.10 al mes, igual al mínimo de la zona: sin retención (LISR art. 96)." },
    fecha: "2026-10-15",
    entrada: { sueldo: 13226.1, periodo: "mensual", region: "frontera-norte" },
    esperado: { retener: 0 },
  },
]);
