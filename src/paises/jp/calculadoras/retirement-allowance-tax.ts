import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cien, piso, sen } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.retirement-allowance-tax",
  mercado: "jp",
  concepto: "propio",
  slug: "retirement-allowance-tax",
  estado: "publicado",
  requiere: {
    "jp.retirement-deduction": "mapa",
    "jp.income-tax-brackets": "escala",
    "jp.income-surtax-rate": "numero",
    "jp.retirement-resident-rates": "mapa",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "退職金の額（税引き前）", min: 0, porDefecto: 20000000 },
    { id: "anios", tipo: "entero", etiqueta: "勤続年数（1年未満の端数は1年に切り上げ）", min: 1, max: 60, porDefecto: 30 },
    { id: "discapacidad", tipo: "si-no", etiqueta: "障害者になったことが直接の原因で退職しました", porDefecto: false },
  ],
  calcular(entrada, v) {
    if (entrada.monto <= 0) throw new ErrorEntrada("退職金の額を入力してください。", "monto");
    const d = v["jp.retirement-deduction"];
    const porAnios = entrada.anios <= 20 ? d["per-year-to-20"] * entrada.anios : d["per-year-to-20"] * 20 + d["per-year-over-20"] * (entrada.anios - 20);
    const kojo = Math.max(porAnios, d.minimum) + (entrada.discapacidad ? d.disability : 0);
    const exceso = Math.max(0, entrada.monto - kojo);
    const corto = entrada.anios <= 5;
    const tope = d["short-term-limit"];
    const mitad = corto ? Math.min(exceso, tope) / 2 + Math.max(0, exceso - tope) : exceso / 2;
    const shotoku = sen(mitad);
    const base = piso(aplicarEscalaMarginal(v["jp.income-tax-brackets"], shotoku));
    const shotokuzei = piso((base * (100 + v["jp.income-surtax-rate"])) / 100);
    const r = v["jp.retirement-resident-rates"];
    const juminzei = cien((shotoku * r.municipal) / 100) + cien((shotoku * r.prefectural) / 100);
    const observaciones = ["「退職所得の受給に関する申告書」を出していない場合は、退職金の20.42％が源泉徴収され、確定申告で精算します。"];
    if (corto) observaciones.push("勤続5年以下の短期退職手当等として、300万円を超える部分には2分の1の計算をしていません。");
    return {
      neto: entrada.monto - shotokuzei - juminzei,
      kojo,
      shotoku,
      shotokuzei,
      juminzei,
      impuestos: shotokuzei + juminzei,
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "税引き後の退職金", formato: "moneda", destacada: true },
    { clave: "impuestos", etiqueta: "税金の合計", formato: "moneda" },
    { clave: "shotokuzei", etiqueta: "所得税と復興特別所得税", formato: "moneda" },
    { clave: "juminzei", etiqueta: "住民税", formato: "moneda" },
    { clave: "kojo", etiqueta: "退職所得控除額", formato: "moneda" },
    { clave: "shotoku", etiqueta: "退職所得の金額", formato: "moneda" },
  ],
});
