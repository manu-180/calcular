import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-allowance-tax";

export default definirCasos(calculadora, [
  {
    nombre: "勤続30年、退職金2,000万円",
    origen: {
      tipo: "recalculado",
      detalle: "退職所得控除 800万円＋70万円×10年＝1,500万円（国税庁の例2）。(2,000万−1,500万)×1/2＝250万円。所得税 97,500＋55,000＝152,500×102.1%＝155,702。住民税 250万×10%＝250,000。手取り19,594,298。",
    },
    fecha: "2026-10-17",
    entrada: { monto: 20000000, anios: 30, discapacidad: false },
    esperado: { kojo: 15000000, shotoku: 2500000, shotokuzei: 155702, juminzei: 250000, neto: 19594298 },
  },
  {
    nombre: "勤続10年2か月（11年）、退職金500万円",
    origen: {
      tipo: "oficial",
      url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1420.htm",
      detalle: "国税庁の例1：勤続年数11年の退職所得控除は40万円×11年＝440万円。(500万−440万)×1/2＝30万円。所得税15,000×102.1%＝15,315、住民税30,000。",
    },
    fecha: "2026-10-17",
    entrada: { monto: 5000000, anios: 11, discapacidad: false },
    esperado: { kojo: 4400000, shotoku: 300000, shotokuzei: 15315, juminzei: 30000 },
  },
  {
    nombre: "勤続3年、退職金600万円（短期退職手当等）",
    origen: {
      tipo: "recalculado",
      detalle: "控除 max(120万, 80万)＝120万円。超過480万円のうち300万円は1/2で150万円、残り180万円はそのまま、退職所得330万円。所得税 3,300,000×20%−427,500＝232,500×102.1%＝237,382。住民税330,000。",
    },
    fecha: "2026-10-17",
    entrada: { monto: 6000000, anios: 3, discapacidad: false },
    esperado: { kojo: 1200000, shotoku: 3300000, shotokuzei: 237382, juminzei: 330000 },
  },
  {
    nombre: "退職金が控除額以下",
    origen: { tipo: "recalculado", detalle: "勤続20年の控除800万円に対し退職金700万円なので税金はかかりません。" },
    fecha: "2026-10-17",
    entrada: { monto: 7000000, anios: 20, discapacidad: false },
    esperado: { kojo: 8000000, shotoku: 0, impuestos: 0, neto: 7000000 },
  },
]);
