import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax";

export default definirCasos(calculadora, [
  { nombre: "សេវា 15%", origen: { tipo: "recalculado", detalle: "1,000,000 x 15% = 150,000" }, fecha: "2026-10-01", entrada: { tipo: "service", monto: 1000000 }, esperado: { retencion: 150000, neto: 850000 } },
  { nombre: "អនិវាសនជន 14%", origen: { tipo: "recalculado", detalle: "1,000,000 x 14% = 140,000" }, fecha: "2026-10-01", entrada: { tipo: "nonresident", monto: 1000000 }, esperado: { retencion: 140000 } },
  { nombre: "គណនីកាលកំណត់ 6%", origen: { tipo: "recalculado", detalle: "1,000,000 x 6% = 60,000" }, fecha: "2026-10-01", entrada: { tipo: "fixed-deposit", monto: 1000000 }, esperado: { retencion: 60000 } },
]);
