import { definirCasos } from "@/motor/calculo";
import calculadora from "./gift-tax";

export default definirCasos(calculadora, [
  {
    nombre: "500万円、一般税率（国税庁の例）",
    origen: { tipo: "oficial", url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/zoyo/4408.htm", detalle: "500万円−110万円＝390万円。390万円×20%−25万円＝53万円。" },
    fecha: "2026-10-17",
    entrada: { monto: 5000000, tipo: "general" },
    esperado: { kazei: 3900000, impuesto: 530000, marginal: 20 },
  },
  {
    nombre: "500万円、特例税率（国税庁の例）",
    origen: { tipo: "oficial", url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/zoyo/4408.htm", detalle: "390万円×15%−10万円＝48.5万円。" },
    fecha: "2026-10-17",
    entrada: { monto: 5000000, tipo: "special" },
    esperado: { kazei: 3900000, impuesto: 485000, marginal: 15 },
  },
  {
    nombre: "110万円以下は非課税",
    origen: { tipo: "recalculado", detalle: "基礎控除110万円以下なので課税価格0、贈与税0。" },
    fecha: "2026-10-17",
    entrada: { monto: 1000000, tipo: "general" },
    esperado: { kazei: 0, impuesto: 0 },
  },
  {
    nombre: "5,000万円、特例税率",
    origen: { tipo: "recalculado", detalle: "課税価格48,900,000。速算表 48,900,000×55%−640万円＝20,495,000。" },
    fecha: "2026-10-17",
    entrada: { monto: 50000000, tipo: "special" },
    esperado: { kazei: 48900000, impuesto: 20495000, marginal: 55 },
  },
]);
