import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-service-calculator";

const base = { salario: 30000000, sesenta: false };
export default definirCasos(calculadora, [
  { nombre: "20 años completos", origen: { tipo: "recalculado", detalle: "Art. 51: 20 × 30 M." }, fecha: "2026-11-01", entrada: { ...base, anios: 20, caso: "full" }, esperado: { tenencia: 600000000, meses: 20 } },
  { nombre: "Deja el trabajo a los 5 años", origen: { tipo: "recalculado", detalle: "Art. 52.2: 50 % de 5 × 30 M." }, fecha: "2026-11-01", entrada: { ...base, anios: 5, caso: "left" }, esperado: { tenencia: 75000000 } },
  { nombre: "Deja a los 12 años", origen: { tipo: "recalculado", detalle: "75 % de 12 meses = 9 meses." }, fecha: "2026-11-01", entrada: { ...base, anios: 12, caso: "left" }, esperado: { tenencia: 270000000, meses: 9 } },
  { nombre: "Deja a los 18 años", origen: { tipo: "recalculado", detalle: "85 % de 18 = 15,3 meses." }, fecha: "2026-11-01", entrada: { ...base, anios: 18, caso: "left" }, esperado: { tenencia: 459000000, meses: 15.3 } },
  { nombre: "Incapacidad con 3 años", origen: { tipo: "recalculado", detalle: "Art. 51.2: mínimo 20 meses." }, fecha: "2026-11-01", entrada: { ...base, anios: 3, caso: "disability" }, esperado: { meses: 20, tenencia: 600000000 } },
  { nombre: "Fallecimiento con 2 años", origen: { tipo: "recalculado", detalle: "Art. 51.5: mínimo 6 meses." }, fecha: "2026-11-01", entrada: { ...base, anios: 2, caso: "death" }, esperado: { meses: 6, tenencia: 180000000 } },
  { nombre: "24 años y 60 de edad", origen: { tipo: "recalculado", detalle: "24 + medio mes × 4 = 26 meses." }, fecha: "2026-11-01", entrada: { salario: 30000000, anios: 24, caso: "full", sesenta: true }, esperado: { meses: 26, extra: 2, tenencia: 780000000 } },
]);
