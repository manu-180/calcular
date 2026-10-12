import { definirCasos } from "@/motor/calculo";
import sdi from "./salario-diario-integrado";

export default definirCasos(sdi, [
  {
    nombre: "15,000 al mes con 3 años de antigüedad",
    origen: { tipo: "recalculado", detalle: "Diario 500. Tercer año: 16 días de vacaciones. Factor 1 + (15 + 16 × 25 %) / 365 = 1.0520548. SDI 500 × 1.0520548 = 526.03; × 30 = 15780.90." },
    fecha: "2026-10-15",
    entrada: { sueldo: 15000, periodo: "mensual", antiguedad: 3, region: "general", diasAguinaldo: null, prima: null, otras: null },
    esperado: { diario: 500, vacaciones: 16, factor: 1.0520548, sdi: 526.03, sbc: 526.03, mensual: 15780.9 },
  },
  {
    nombre: "Prestaciones arriba de la ley",
    origen: { tipo: "recalculado", detalle: "Primer año, 30 días de aguinaldo y 50 % de prima: 1 + (30 + 12 × 50 %) / 365 = 1.0986301. 1000 × 1.0986301 + 20 = 1118.63." },
    fecha: "2026-10-15",
    entrada: { sueldo: 1000, periodo: "diario", antiguedad: 1, region: "general", diasAguinaldo: 30, prima: 50, otras: 20 },
    esperado: { factor: 1.0986301, sdi: 1118.63 },
  },
  {
    nombre: "Salario integrado arriba del tope de 25 UMA",
    origen: { tipo: "recalculado", detalle: "4000 × 1.0493151 = 4197.26; tope 25 × 117.31 = 2932.75." },
    fecha: "2026-10-15",
    entrada: { sueldo: 4000, periodo: "diario", antiguedad: 0, region: "general", diasAguinaldo: null, prima: null, otras: null },
    esperado: { sdi: 4197.26, sbc: 2932.75 },
  },
  {
    nombre: "Aguinaldo menor al de ley",
    origen: { tipo: "recalculado", detalle: "LFT art. 87: mínimo 15 días." },
    fecha: "2026-10-15",
    entrada: { sueldo: 1000, periodo: "diario", antiguedad: 1, region: "general", diasAguinaldo: 10, prima: null, otras: null },
    esperaError: true,
  },
]);
