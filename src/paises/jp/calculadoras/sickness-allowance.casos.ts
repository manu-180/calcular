import { definirCasos } from "@/motor/calculo";
import calculadora from "./sickness-allowance";

export default definirCasos(calculadora, [
  {
    nombre: "平均17万円、30日休業（協会けんぽの例の日額）",
    origen: { tipo: "oficial", url: "https://www.kyoukaikenpo.or.jp/g3/sb3040/r139/", detalle: "1日あたり 17万円÷30≒5,670円×2/3＝3,780円。待期3日を除く27日で102,060円。" },
    fecha: "2026-10-17",
    entrada: { promedio: 170000, dias: 30, salario: 0 },
    esperado: { diario: 3780, pagados: 27, total: 102060 },
  },
  {
    nombre: "給与の一部が支払われた場合",
    origen: { tipo: "recalculado", detalle: "日額6,667円、給与日額2,000円なので差額4,667円。10日休んで待期3日を除く7日、32,669円。" },
    fecha: "2026-10-17",
    entrada: { promedio: 300000, dias: 10, salario: 2000 },
    esperado: { diario: 6667, porDia: 4667, pagados: 7, total: 32669 },
  },
  {
    nombre: "3日以内の休業",
    origen: { tipo: "recalculado", detalle: "待期3日のみなので支給はありません。" },
    fecha: "2026-10-17",
    entrada: { promedio: 300000, dias: 3, salario: 0 },
    esperado: { pagados: 0, total: 0 },
  },
]);
