import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cien, kyuyoShotoku, montoDeFila, piso, sen } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.year-end-adjustment",
  mercado: "jp",
  concepto: "propio",
  slug: "year-end-adjustment",
  estado: "publicado",
  requiere: {
    "jp.employment-income-deduction": "escala",
    "jp.basic-deduction": "escala",
    "jp.income-tax-brackets": "escala",
    "jp.income-surtax-rate": "numero",
  },
  campos: [
    { id: "kyuyo", tipo: "moneda", etiqueta: "1年間の給与収入（賞与を含む）", min: 0, porDefecto: 5000000 },
    { id: "shakai", tipo: "moneda", etiqueta: "給与から引かれた社会保険料（1年分）", min: 0, porDefecto: 720000 },
    { id: "otros", tipo: "moneda", etiqueta: "そのほかの所得控除（生命保険料控除、扶養控除など）", min: 0, porDefecto: 0 },
    { id: "jutaku", tipo: "moneda", etiqueta: "住宅借入金等特別控除の額", min: 0, porDefecto: 0 },
    { id: "gensen", tipo: "moneda", etiqueta: "1年間に源泉徴収された所得税", min: 0, porDefecto: 120000 },
  ],
  calcular(entrada, v) {
    if (entrada.kyuyo <= 0) throw new ErrorEntrada("1年間の給与収入を入力してください。", "kyuyo");
    const shotoku = kyuyoShotoku(entrada.kyuyo, v["jp.employment-income-deduction"]);
    const kiso = montoDeFila(v["jp.basic-deduction"], shotoku);
    const kazei = sen(shotoku - Math.min(shotoku, entrada.shakai + entrada.otros + kiso));
    const sanshutsu = piso(aplicarEscalaMarginal(v["jp.income-tax-brackets"], kazei));
    const trasPrestamo = Math.max(0, sanshutsu - entrada.jutaku);
    const nenzei = cien((trasPrestamo * (100 + v["jp.income-surtax-rate"])) / 100);
    const diferencia = entrada.gensen - nenzei;
    return {
      diferencia,
      nenzei,
      kazei,
      shotoku,
      kiso,
      resultado: diferencia > 0 ? "還付（戻ってくる）" : diferencia < 0 ? "不足（追加で徴収）" : "過不足なし",
    };
  },
  resultado: [
    { clave: "diferencia", etiqueta: "還付される額（マイナスは不足額）", formato: "moneda", destacada: true },
    { clave: "resultado", etiqueta: "精算の結果", formato: "texto" },
    { clave: "nenzei", etiqueta: "年税額（復興特別所得税を含む）", formato: "moneda" },
    { clave: "kazei", etiqueta: "課税給与所得金額", formato: "moneda" },
    { clave: "shotoku", etiqueta: "給与所得控除後の給与等の金額", formato: "moneda" },
    { clave: "kiso", etiqueta: "基礎控除", formato: "moneda" },
  ],
});
