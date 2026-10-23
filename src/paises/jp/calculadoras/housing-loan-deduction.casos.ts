import { definirCasos } from "@/motor/calculo";
import calculadora from "./housing-loan-deduction";

export default definirCasos(calculadora, [
  {
    nombre: "ZEH水準、年末残高3,000万円",
    origen: { tipo: "recalculado", detalle: "30,000,000×0.7%＝210,000。控除限度額24.5万円以下なので210,000円。控除期間13年。" },
    fecha: "2026-10-17",
    entrada: { zandaka: 30000000, tipo: "zeh", familia: false, impuesto: null },
    esperado: { kojo: 210000, limite: 245000, anios: 13, delImpuesto: null },
  },
  {
    nombre: "ZEH水準、残高4,000万円、子育て世帯",
    origen: { tipo: "oficial", url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1211-1.htm", detalle: "特例対象個人のZEH水準省エネ住宅は控除限度額31.5万円（注2）。40,000,000×0.7%＝280,000円。所得税150,000円なら所得税から150,000円、残り130,000円。" },
    fecha: "2026-10-17",
    entrada: { zandaka: 40000000, tipo: "zeh", familia: true, impuesto: 150000 },
    esperado: { kojo: 280000, limite: 315000, delImpuesto: 150000, resto: 130000 },
  },
  {
    nombre: "省エネ基準適合住宅、残高3,500万円",
    origen: { tipo: "oficial", url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1211-1.htm", detalle: "令和8年・令和9年入居の省エネ基準適合住宅は控除限度額14万円。35,000,000×0.7%＝245,000円は限度額を超えるので140,000円。" },
    fecha: "2026-10-17",
    entrada: { zandaka: 35000000, tipo: "energy", familia: false, impuesto: null },
    esperado: { kojo: 140000, limite: 140000, anios: 13 },
  },
  {
    nombre: "その他の住宅は10年",
    origen: { tipo: "oficial", url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1211-1.htm", detalle: "（注6）令和5年12月31日までに建築確認を受けたその他の住宅は、控除限度額14万円で10年間。15,000,000×0.7%＝105,000円。" },
    fecha: "2026-10-17",
    entrada: { zandaka: 15000000, tipo: "other", familia: true, impuesto: null },
    esperado: { kojo: 105000, limite: 140000, anios: 10 },
  },
]);
