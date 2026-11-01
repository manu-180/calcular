import { definirCasos } from "@/motor/calculo";
import calculadora from "./ndsh-tootsooluur";

export default definirCasos(calculadora, [
  { nombre: "2 сая", origen: { tipo: "recalculado", detalle: "Ажилтан 9.5% = 190,000 + ЭМД 40,000. Ажил олгогч 12.5% = 250,000." }, fecha: "2026-11-01", entrada: { bruto: 2000000, tuvshin: "1" }, esperado: { ajiltan: 230000, ajilOlgogch: 250000, niit: 480000 } },
  { nombre: "Дээд хэмжээ давсан", origen: { tipo: "recalculado", detalle: "Суурь 7,920,000 × 9.5% = 752,400; ЭМД 200,000. Ажил олгогч 10,000,000 × 12.5% = 1,250,000." }, fecha: "2026-11-01", entrada: { bruto: 10000000, tuvshin: "1" }, esperado: { ajiltanNdsh: 752400, ajiltanEmd: 200000, ajilOlgogch: 1250000, tope: 7920000 } },
]);
