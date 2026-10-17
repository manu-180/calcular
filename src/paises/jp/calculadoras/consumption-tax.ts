import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const abajo = (n: number) => Math.floor(n + 1e-7);
const arriba = (n: number) => Math.ceil(n - 1e-7);

export default definirCalculadora({
  id: "jp.consumption-tax",
  mercado: "jp",
  concepto: "iva",
  slug: "consumption-tax",
  estado: "publicado",
  requiere: {
    "jp.consumption-tax-standard": "numero",
    "jp.consumption-tax-reduced": "numero",
    "jp.consumption-tax-national-standard": "numero",
    "jp.consumption-tax-national-reduced": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "金額", min: 0, porDefecto: 10000 },
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "入力した金額",
      opciones: [
        { valor: "sin", etiqueta: "税抜き価格（本体価格）" },
        { valor: "con", etiqueta: "税込み価格" },
      ],
      porDefecto: "sin",
    },
    {
      id: "tasa",
      tipo: "opcion",
      etiqueta: "税率",
      opciones: [
        { valor: "standard", etiqueta: "標準税率（10％）" },
        { valor: "reduced", etiqueta: "軽減税率（8％、飲食料品・新聞）" },
      ],
      porDefecto: "standard",
    },
  ],
  calcular(entrada, v) {
    if (entrada.monto <= 0) throw new ErrorEntrada("金額を入力してください。", "monto");
    const reducido = entrada.tasa === "reduced";
    const tasa = reducido ? v["jp.consumption-tax-reduced"] : v["jp.consumption-tax-standard"];
    const nacional = reducido ? v["jp.consumption-tax-national-reduced"] : v["jp.consumption-tax-national-standard"];
    const sinImpuesto = entrada.modo === "sin" ? entrada.monto : (entrada.monto * 100) / (100 + tasa);
    const conImpuesto = entrada.modo === "sin" ? (entrada.monto * (100 + tasa)) / 100 : entrada.monto;
    const impuesto = conImpuesto - sinImpuesto;
    const kokuzei = (impuesto * nacional) / tasa;
    const total = abajo(conImpuesto) - arriba(sinImpuesto);
    return {
      conImpuesto: abajo(conImpuesto),
      sinImpuesto: arriba(sinImpuesto),
      impuesto: total,
      kokuzei: abajo(kokuzei),
      chiho: total - abajo(kokuzei),
      tasa,
      observaciones: ["1円未満の端数は、税込み価格は切り捨て、税抜き価格は切り上げで表示しています。端数の処理はお店や請求書によって違うことがあります。"],
    };
  },
  resultado: [
    { clave: "conImpuesto", etiqueta: "税込み価格", formato: "moneda", destacada: true },
    { clave: "sinImpuesto", etiqueta: "税抜き価格", formato: "moneda" },
    { clave: "impuesto", etiqueta: "消費税額（地方消費税を含む）", formato: "moneda" },
    { clave: "kokuzei", etiqueta: "うち消費税（国税）", formato: "moneda" },
    { clave: "chiho", etiqueta: "うち地方消費税", formato: "moneda" },
    { clave: "tasa", etiqueta: "税率", formato: "porcentaje", decimales: 0 },
  ],
});
