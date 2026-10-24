import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { juminzei, kyuyoShotoku, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.furusato-nozei",
  mercado: "jp",
  concepto: "propio",
  slug: "furusato-nozei",
  estado: "publicado",
  requiere: {
    "jp.employment-income-deduction": "escala",
    "jp.income-tax-brackets": "escala",
    "jp.income-surtax-rate": "numero",
    "jp.resident-basic-deduction": "escala",
    "jp.resident-tax-rate": "numero",
    "jp.resident-tax-per-capita": "numero",
    "jp.forest-environment-tax": "numero",
    "jp.resident-adjustment": "mapa",
    "jp.resident-adjustment-rate": "numero",
    "jp.furusato-cap-rate": "numero",
    "jp.furusato-basic-rate": "numero",
    "jp.furusato-self-pay": "numero",
  },
  campos: [
    { id: "kyuyo", tipo: "moneda", etiqueta: "その年の給与収入（見込み）", min: 0, porDefecto: 5000000 },
    { id: "shakai", tipo: "moneda", etiqueta: "社会保険料（1年分）", min: 0, porDefecto: 720000 },
    { id: "otros", tipo: "moneda", etiqueta: "そのほかの所得控除（住民税の額）", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    if (entrada.kyuyo <= 0) throw new ErrorEntrada("給与収入を入力してください。", "kyuyo");
    const ajuste = v["jp.resident-adjustment"];
    const shotoku = kyuyoShotoku(entrada.kyuyo, v["jp.employment-income-deduction"]);
    const jm = juminzei({
      shotoku,
      kojo: entrada.shakai + entrada.otros,
      kisoEscala: v["jp.resident-basic-deduction"],
      tasa: v["jp.resident-tax-rate"],
      kintowari: v["jp.resident-tax-per-capita"],
      shinrin: v["jp.forest-environment-tax"],
      ajuste,
      tasaAjuste: v["jp.resident-adjustment-rate"],
    });
    const base = jm.kazei - ajuste.gap;
    const tasaRenta = base < 0 ? 0 : tasaMarginal(v["jp.income-tax-brackets"], base);
    const proporcion = Math.round((100 - v["jp.furusato-basic-rate"] - (tasaRenta * (100 + v["jp.income-surtax-rate"])) / 100) * 1000) / 1000;
    const limite = jm.shotokuwari > 0 ? Math.floor((jm.shotokuwari * v["jp.furusato-cap-rate"]) / proporcion) + v["jp.furusato-self-pay"] : 0;
    return {
      limite,
      shotokuwari: jm.shotokuwari,
      tasaRenta,
      proporcion,
      autopago: v["jp.furusato-self-pay"],
      observaciones: ["住宅ローン控除や医療費控除などがあると上限は変わります。上限ぎりぎりではなく、少し余裕を持たせた額にするのがおすすめです。"],
    };
  },
  resultado: [
    { clave: "limite", etiqueta: "自己負担2,000円で寄附できる上限の目安", formato: "moneda", destacada: true },
    { clave: "shotokuwari", etiqueta: "住民税の所得割額", formato: "moneda" },
    { clave: "tasaRenta", etiqueta: "所得税の税率", formato: "porcentaje", decimales: 0 },
    { clave: "proporcion", etiqueta: "特例控除の控除割合", formato: "porcentaje", decimales: 3 },
    { clave: "autopago", etiqueta: "自己負担額", formato: "moneda" },
  ],
});
