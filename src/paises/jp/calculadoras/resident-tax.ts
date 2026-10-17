import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { juminzei, kyuyoShotoku } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.resident-tax",
  mercado: "jp",
  concepto: "propio",
  slug: "resident-tax",
  estado: "publicado",
  requiere: {
    "jp.employment-income-deduction": "escala",
    "jp.resident-basic-deduction": "escala",
    "jp.resident-tax-rate": "numero",
    "jp.resident-tax-per-capita": "numero",
    "jp.forest-environment-tax": "numero",
    "jp.resident-adjustment": "mapa",
    "jp.resident-adjustment-rate": "numero",
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
    { id: "monto", tipo: "moneda", etiqueta: "前年の金額（年間）", min: 0, porDefecto: 5000000 },
    { id: "shakai", tipo: "moneda", etiqueta: "前年に払った社会保険料", min: 0, porDefecto: 720000 },
    { id: "otros", tipo: "moneda", etiqueta: "そのほかの所得控除（住民税の額）", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("前年の金額を入力してください。", "monto");
    const shotoku = entrada.tipo === "kyuyo" ? kyuyoShotoku(entrada.monto, v["jp.employment-income-deduction"]) : entrada.monto;
    const jm = juminzei({
      shotoku,
      kojo: entrada.shakai + entrada.otros,
      kisoEscala: v["jp.resident-basic-deduction"],
      tasa: v["jp.resident-tax-rate"],
      kintowari: v["jp.resident-tax-per-capita"],
      shinrin: v["jp.forest-environment-tax"],
      ajuste: v["jp.resident-adjustment"],
      tasaAjuste: v["jp.resident-adjustment-rate"],
    });
    return {
      total: jm.total,
      mensual: redondear(jm.total / 12),
      shotokuwari: jm.shotokuwari,
      kintowari: jm.kintowari,
      chosei: jm.chosei,
      kazei: jm.kazei,
      shotoku,
      observaciones: ["均等割の額や非課税になる所得の基準は市区町村によって違うことがあります。正確な額は市区町村から届く税額決定通知書でご確認ください。"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "住民税（年額）", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "1か月あたり（12回の特別徴収）", formato: "moneda" },
    { clave: "shotokuwari", etiqueta: "所得割", formato: "moneda" },
    { clave: "kintowari", etiqueta: "均等割と森林環境税", formato: "moneda" },
    { clave: "chosei", etiqueta: "調整控除", formato: "moneda" },
    { clave: "kazei", etiqueta: "課税所得金額", formato: "moneda" },
    { clave: "shotoku", etiqueta: "所得金額", formato: "moneda" },
  ],
});
