import { definirCasos } from "@/motor/calculo";
import calculadora from "./consumption-tax";

export default definirCasos(calculadora, [
  {
    nombre: "税抜き1万円、標準税率",
    origen: { tipo: "recalculado", detalle: "10,000×1.10＝11,000。消費税額1,000のうち国税 1,000×7.8/10＝780、地方消費税220。" },
    fecha: "2026-10-17",
    entrada: { monto: 10000, modo: "sin", tasa: "standard" },
    esperado: { conImpuesto: 11000, sinImpuesto: 10000, impuesto: 1000, kokuzei: 780, chiho: 220, tasa: 10 },
  },
  {
    nombre: "税込み1,080円、軽減税率",
    origen: { tipo: "recalculado", detalle: "1,080÷1.08＝1,000。消費税額80のうち国税 80×6.24/8＝62.4→62、地方消費税18。" },
    fecha: "2026-10-17",
    entrada: { monto: 1080, modo: "con", tasa: "reduced" },
    esperado: { conImpuesto: 1080, sinImpuesto: 1000, impuesto: 80, kokuzei: 62, chiho: 18, tasa: 8 },
  },
  {
    nombre: "税込み1,000円、標準税率（端数あり）",
    origen: { tipo: "recalculado", detalle: "1,000÷1.10＝909.09…を切り上げて910。消費税額90。国税 90.909…×0.78＝70.9→70、地方消費税20。" },
    fecha: "2026-10-17",
    entrada: { monto: 1000, modo: "con", tasa: "standard" },
    esperado: { sinImpuesto: 910, impuesto: 90, kokuzei: 70, chiho: 20 },
  },
  {
    nombre: "金額0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { monto: 0, modo: "sin", tasa: "standard" },
    esperaError: true,
  },
]);
