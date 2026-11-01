import { definirCasos } from "@/motor/calculo";
import calculadora from "./khalagdsany-tetgemj";

export default definirCasos(calculadora, [
  { nombre: "3 жил", origen: { tipo: "recalculado", detalle: "82.1.2: 2 сар × 1,500,000 = 3,000,000." }, fecha: "2026-11-01", entrada: { undsen: 1500000, jil: 3 }, esperado: { tetgemj: 3000000, sar: 2 } },
  { nombre: "10 жил яг", origen: { tipo: "recalculado", detalle: "82.1.4: 4 сар." }, fecha: "2026-11-01", entrada: { undsen: 1000000, jil: 10 }, esperado: { sar: 4 } },
  { nombre: "6 сар", origen: { tipo: "recalculado", detalle: "82.1.1: 1 сар." }, fecha: "2026-11-01", entrada: { undsen: 1000000, jil: 0.5 }, esperado: { sar: 1 } },
  { nombre: "3 сар", origen: { tipo: "recalculado", detalle: "Зургаан сараас бага." }, fecha: "2026-11-01", entrada: { undsen: 1000000, jil: 0.25 }, esperado: { sar: 0, tetgemj: 0 } },
]);
