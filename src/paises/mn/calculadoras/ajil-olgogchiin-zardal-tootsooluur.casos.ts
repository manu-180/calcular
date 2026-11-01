import { definirCasos } from "@/motor/calculo";
import calculadora from "./ajil-olgogchiin-zardal-tootsooluur";

export default definirCasos(calculadora, [
  { nombre: "2 сая, эхний түвшин", origen: { tipo: "recalculado", detalle: "8.5 + 1 + 0.5 + 0.5 + ЭМД 2 = 12.5% = 250,000." }, fecha: "2026-11-01", entrada: { bruto: 2000000, tuvshin: "1" }, esperado: { shimtgel: 250000, niit: 2250000, ajilguidel: 10000, osol: 10000, emd: 40000 } },
  { nombre: "2 сая, гуравдугаар түвшин", origen: { tipo: "recalculado", detalle: "8.5 + 1 + 2.5 + 0.5 + ЭМД 2 = 14.5% = 290,000." }, fecha: "2026-11-01", entrada: { bruto: 2000000, tuvshin: "3" }, esperado: { shimtgel: 290000, osol: 50000 } },
  { nombre: "Ханш 2026 оны сүүлчийн өдөр", origen: { tipo: "recalculado", detalle: "2026-12-31: 8.5 + 1 + 1.5 + 0.5 + 2 = 13.5% = 135,000." }, fecha: "2026-12-31", entrada: { bruto: 1000000, tuvshin: "2" }, esperado: { shimtgel: 135000 } },
]);
