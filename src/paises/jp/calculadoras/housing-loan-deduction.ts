import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { cien } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.housing-loan-deduction",
  mercado: "jp",
  concepto: "propio",
  slug: "housing-loan-deduction",
  estado: "publicado",
  requiere: {
    "jp.housing-loan-limit": "mapa",
    "jp.housing-loan-rate": "numero",
    "jp.housing-loan-years": "mapa",
  },
  campos: [
    { id: "zandaka", tipo: "moneda", etiqueta: "住宅ローンの年末残高", min: 0, porDefecto: 30000000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "住宅の区分（令和8年・令和9年に新築等に入居）",
      opciones: [
        { valor: "certified", etiqueta: "認定住宅（長期優良住宅・低炭素住宅）" },
        { valor: "zeh", etiqueta: "ZEH水準省エネ住宅" },
        { valor: "energy", etiqueta: "省エネ基準適合住宅" },
        { valor: "other", etiqueta: "その他の住宅（令和5年12月31日までに建築確認）" },
      ],
      porDefecto: "zeh",
    },
    { id: "familia", tipo: "si-no", etiqueta: "40歳未満で配偶者がいる、配偶者が40歳未満、または19歳未満の扶養親族がいる", porDefecto: false },
    { id: "impuesto", tipo: "moneda", etiqueta: "その年の所得税額（わかる場合）", min: 0, requerido: false },
  ],
  calcular(entrada, v) {
    if (entrada.zandaka <= 0) throw new ErrorEntrada("年末残高を入力してください。", "zandaka");
    const limites = v["jp.housing-loan-limit"];
    const conFamilia = entrada.familia && entrada.tipo !== "other";
    const limite = enMapa(limites, conFamilia ? `${entrada.tipo}-family` : entrada.tipo);
    const calculado = (entrada.zandaka * v["jp.housing-loan-rate"]) / 100;
    const kojo = cien(Math.min(calculado, limite));
    const anios = enMapa(v["jp.housing-loan-years"], entrada.tipo);
    const observaciones: string[] = [];
    let delImpuesto: number | null = null;
    let resto: number | null = null;
    if (entrada.impuesto !== null) {
      delImpuesto = Math.min(kojo, entrada.impuesto);
      resto = kojo - delImpuesto;
      if (resto > 0) observaciones.push("所得税から引ききれない分は、一定の上限まで翌年度の住民税から差し引かれます。");
    }
    if (entrada.familia && entrada.tipo === "other") observaciones.push("その他の住宅には、特例対象個人の上乗せはありません。");
    return { kojo, limite, anios, delImpuesto, resto, observaciones };
  },
  resultado: [
    { clave: "kojo", etiqueta: "1年分の控除額", formato: "moneda", destacada: true },
    { clave: "limite", etiqueta: "各年の控除限度額", formato: "moneda" },
    { clave: "anios", etiqueta: "控除期間", formato: "anios" },
    { clave: "delImpuesto", etiqueta: "所得税から引ける額", formato: "moneda" },
    { clave: "resto", etiqueta: "所得税から引ききれない額", formato: "moneda" },
  ],
});
