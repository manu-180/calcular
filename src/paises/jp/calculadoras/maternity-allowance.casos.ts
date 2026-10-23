import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-allowance";

export default definirCasos(calculadora, [
  {
    nombre: "平均17万円（協会けんぽの例）",
    origen: { tipo: "oficial", url: "https://www.kyoukaikenpo.or.jp/benefit/childbirth/001/index.html", detalle: "17万円÷30≒5,670円（10円未満四捨五入）、5,670円×2/3＝3,780円。産前42日＋産後56日＝98日で370,440円。" },
    fecha: "2026-10-17",
    entrada: { promedio: 170000, multiple: false, retraso: 0 },
    esperado: { base: 5670, diario: 3780, dias: 98, total: 370440 },
  },
  {
    nombre: "平均30万円",
    origen: { tipo: "recalculado", detalle: "300,000÷30＝10,000円、×2/3＝6,666.7→6,667円。98日で653,366円。" },
    fecha: "2026-10-17",
    entrada: { promedio: 300000, multiple: false, retraso: 0 },
    esperado: { diario: 6667, total: 653366 },
  },
  {
    nombre: "多胎妊娠、予定日より5日遅れ",
    origen: { tipo: "recalculado", detalle: "産前98日＋遅れた5日＋産後56日＝159日。6,667円×159日＝1,060,053円。" },
    fecha: "2026-10-17",
    entrada: { promedio: 300000, multiple: true, retraso: 5 },
    esperado: { dias: 159, total: 1060053 },
  },
]);
