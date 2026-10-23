import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { kyuyoShotoku, montoDeFila, shotokuzei } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.income-tax",
  mercado: "jp",
  concepto: "impuesto-renta",
  slug: "income-tax",
  estado: "publicado",
  requiere: {
    "jp.employment-income-deduction": "escala",
    "jp.basic-deduction": "escala",
    "jp.income-tax-brackets": "escala",
    "jp.income-surtax-rate": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "入力する金額",
      opciones: [
        { valor: "kyuyo", etiqueta: "給与収入（源泉徴収票の支払金額）" },
        { valor: "shotoku", etiqueta: "所得金額（事業所得など、経費を引いた後）" },
      ],
      porDefecto: "kyuyo",
    },
    { id: "monto", tipo: "moneda", etiqueta: "金額（年間）", min: 0, porDefecto: 5000000 },
    { id: "shakai", tipo: "moneda", etiqueta: "社会保険料（年間）", min: 0, porDefecto: 720000 },
    { id: "otros", tipo: "moneda", etiqueta: "そのほかの所得控除（生命保険料控除、扶養控除など）", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v) {
    if (entrada.monto <= 0) throw new ErrorEntrada("年間の金額を入力してください。", "monto");
    const shotoku = entrada.tipo === "kyuyo" ? kyuyoShotoku(entrada.monto, v["jp.employment-income-deduction"]) : entrada.monto;
    const kiso = montoDeFila(v["jp.basic-deduction"], shotoku);
    const kojo = Math.min(shotoku, entrada.shakai + entrada.otros + kiso);
    const it = shotokuzei(shotoku - kojo, v["jp.income-tax-brackets"], v["jp.income-surtax-rate"]);
    return {
      total: it.total,
      base: it.base,
      fukko: it.tokubetsu,
      shotoku,
      kiso,
      kazei: it.kazei,
      marginal: it.marginal,
      efectiva: (it.total / entrada.monto) * 100,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "所得税と復興特別所得税の合計（年間）", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "所得税", formato: "moneda" },
    { clave: "fukko", etiqueta: "復興特別所得税", formato: "moneda" },
    { clave: "shotoku", etiqueta: "所得金額", formato: "moneda" },
    { clave: "kiso", etiqueta: "基礎控除", formato: "moneda" },
    { clave: "kazei", etiqueta: "課税される所得金額", formato: "moneda" },
    { clave: "marginal", etiqueta: "適用される最高税率", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "収入に対する税負担率", formato: "porcentaje", decimales: 2 },
  ],
});
