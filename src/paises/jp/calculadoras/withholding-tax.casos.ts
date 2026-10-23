import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax";

export default definirCasos(calculadora, [
  {
    nombre: "原稿料150万円（国税庁の例）",
    origen: { tipo: "oficial", url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2795.htm", detalle: "(150万円−100万円)×20.42%＋102,100円＝204,200円。" },
    fecha: "2026-10-17",
    entrada: { monto: 1500000, iva: false },
    esperado: { retencion: 204200, cobro: 1295800 },
  },
  {
    nombre: "報酬10万円、消費税を区分",
    origen: { tipo: "recalculado", detalle: "源泉徴収 100,000×10.21%＝10,210円。消費税10,000円。振込額 110,000−10,210＝99,790円。" },
    fecha: "2026-10-17",
    entrada: { monto: 100000, iva: true },
    esperado: { retencion: 10210, shohizei: 10000, factura: 110000, cobro: 99790 },
  },
  {
    nombre: "報酬33,333円（1円未満切捨て）",
    origen: { tipo: "recalculado", detalle: "33,333×10.21%＝3,403.29→3,403円。" },
    fecha: "2026-10-17",
    entrada: { monto: 33333, iva: false },
    esperado: { retencion: 3403, cobro: 29930 },
  },
]);
