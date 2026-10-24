import { definirCasos } from "@/motor/calculo";
import calculadora from "./resident-tax";

export default definirCasos(calculadora, [
  {
    nombre: "給与収入500万円、社会保険料72万円",
    origen: {
      tipo: "recalculado",
      detalle: "給与所得3,560,000。課税所得 3,560,000−720,000−430,000＝2,410,000×10%＝241,000。200万円超なので調整控除 50,000×5%＝2,500。所得割238,500＋均等割4,000＋森林環境税1,000＝243,500。月額20,292。",
    },
    fecha: "2026-10-17",
    entrada: { tipo: "kyuyo", monto: 5000000, shakai: 720000, otros: 0 },
    esperado: { kazei: 2410000, chosei: 2500, shotokuwari: 238500, kintowari: 5000, total: 243500, mensual: 20292 },
  },
  {
    nombre: "給与収入200万円、社会保険料30万円",
    origen: {
      tipo: "recalculado",
      detalle: "給与所得控除740,000で給与所得1,260,000。課税所得 1,260,000−300,000−430,000＝530,000×10%＝53,000。200万円以下なので調整控除 min(50,000, 530,000)×5%＝2,500。所得割50,500＋5,000＝55,500。",
    },
    fecha: "2026-10-17",
    entrada: { tipo: "kyuyo", monto: 2000000, shakai: 300000, otros: 0 },
    esperado: { shotoku: 1260000, kazei: 530000, shotokuwari: 50500, total: 55500 },
  },
  {
    nombre: "所得40万円（所得割なし）",
    origen: { tipo: "recalculado", detalle: "所得400,000は基礎控除430,000以下なので課税所得0、所得割0。均等割と森林環境税の5,000だけです。" },
    fecha: "2026-10-17",
    entrada: { tipo: "shotoku", monto: 400000, shakai: 0, otros: 0 },
    esperado: { kazei: 0, shotokuwari: 0, chosei: 0, total: 5000 },
  },
  {
    nombre: "金額0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { tipo: "kyuyo", monto: 0, shakai: 0, otros: 0 },
    esperaError: true,
  },
]);
