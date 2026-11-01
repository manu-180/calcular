import { definirCasos } from "@/motor/calculo";
import calculadora from "./jiremsnii-tetgemj";

export default definirCasos(calculadora, [
  { nombre: "1 хүүхэд", origen: { tipo: "recalculado", detalle: "7.1, 7.3, 7.4: 1,050,000 / 21 = 50,000; 120 × 5/7 ≈ 86 өдөр; 4,300,000." }, fecha: "2026-11-01", entrada: { dundaj: 1050000, ikher: false, ajlynOdor: null }, esperado: { niit: 4300000, odor: 86, khonog: 120 } },
  { nombre: "Ихэр", origen: { tipo: "recalculado", detalle: "140 × 5/7 = 100 өдөр × 50,000 = 5,000,000." }, fecha: "2026-11-01", entrada: { dundaj: 1050000, ikher: true, ajlynOdor: null }, esperado: { niit: 5000000, khonog: 140 } },
  { nombre: "Дээд хэмжээ", origen: { tipo: "recalculado", detalle: "19.4: суурь 7,920,000 / 21 × 80 = 30,171,428.57." }, fecha: "2026-11-01", entrada: { dundaj: 12000000, ikher: false, ajlynOdor: 80 }, esperado: { niit: 30171428.57 }, tolerancia: 0.1 },
]);
