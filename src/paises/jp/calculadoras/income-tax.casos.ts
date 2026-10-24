import { definirCasos } from "@/motor/calculo";
import calculadora from "./income-tax";

export default definirCasos(calculadora, [
  {
    nombre: "課税所得700万円（国税庁の計算例）",
    origen: {
      tipo: "oficial",
      url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2260.htm",
      detalle: "国税庁の例：課税される所得金額7,000,000円×0.23−636,000円＝974,000円。所得800万円、基礎控除62万円、社会保険料38万円で課税所得700万円。復興特別所得税20,454円、合計は100円未満切捨てで994,400円。",
    },
    fecha: "2026-10-17",
    entrada: { tipo: "shotoku", monto: 8000000, shakai: 380000, otros: 0 },
    esperado: { kazei: 7000000, base: 974000, fukko: 20454, total: 994400, kiso: 620000, marginal: 23 },
  },
  {
    nombre: "給与収入500万円、社会保険料72万円",
    origen: {
      tipo: "recalculado",
      detalle: "給与所得 5,000,000−(5,000,000×20%＋440,000)＝3,560,000。基礎控除1,040,000。課税所得 3,560,000−720,000−1,040,000＝1,800,000×5%＝90,000。復興1,890。合計91,800。",
    },
    fecha: "2026-10-17",
    entrada: { tipo: "kyuyo", monto: 5000000, shakai: 720000, otros: 0 },
    esperado: { shotoku: 3560000, kiso: 1040000, kazei: 1800000, base: 90000, fukko: 1890, total: 91800, marginal: 5 },
  },
  {
    nombre: "事業所得1,000万円",
    origen: {
      tipo: "recalculado",
      detalle: "基礎控除620,000。課税所得 10,000,000−1,000,000−500,000−620,000＝7,880,000×23%−636,000＝1,176,400。復興24,704。合計1,201,100。",
    },
    fecha: "2026-10-17",
    entrada: { tipo: "shotoku", monto: 10000000, shakai: 1000000, otros: 500000 },
    esperado: { kazei: 7880000, base: 1176400, total: 1201100, marginal: 23 },
  },
  {
    nombre: "金額0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { tipo: "kyuyo", monto: 0, shakai: 0, otros: 0 },
    esperaError: true,
  },
]);
