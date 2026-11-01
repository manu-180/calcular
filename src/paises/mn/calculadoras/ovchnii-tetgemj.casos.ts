import { definirCasos } from "@/motor/calculo";
import calculadora from "./ovchnii-tetgemj";

export default definirCasos(calculadora, [
  { nombre: "70 сар, 10 өдөр", origen: { tipo: "recalculado", detalle: "4.1: 60-119 сар = 55%. 1,050,000 / 21 = 50,000 × 55% = 27,500 × 10 = 275,000. 5.1: эхний 5 өдөр ажил олгогч." }, fecha: "2026-11-01", entrada: { dundaj: 1050000, sar: 70, odor: 10 }, esperado: { niit: 275000, khuvi: 55, ajilOlgogch: 137500, san: 137500 } },
  { nombre: "180 сар, 3 өдөр", origen: { tipo: "recalculado", detalle: "75%: 37,500 × 3 = 112,500; бүгд ажил олгогчоос." }, fecha: "2026-11-01", entrada: { dundaj: 1050000, sar: 180, odor: 3 }, esperado: { niit: 112500, san: 0 } },
  { nombre: "2 сар", origen: { tipo: "recalculado", detalle: "3.1: эрхгүй." }, fecha: "2026-11-01", entrada: { dundaj: 1050000, sar: 2, odor: 3 }, esperaError: true },
]);
