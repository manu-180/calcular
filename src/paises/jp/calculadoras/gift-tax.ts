import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { piso, tasaMarginal } from "../lib/impuestos";

export default definirCalculadora({
  id: "jp.gift-tax",
  mercado: "jp",
  concepto: "propio",
  slug: "gift-tax",
  estado: "publicado",
  requiere: {
    "jp.gift-tax-basic-exemption": "numero",
    "jp.gift-tax-general": "escala",
    "jp.gift-tax-special": "escala",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "1年間にもらった財産の合計額", min: 0, porDefecto: 5000000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "だれから、だれへの贈与ですか",
      opciones: [
        { valor: "special", etiqueta: "父母や祖父母から、1月1日時点で18歳以上の子や孫へ（特例税率）" },
        { valor: "general", etiqueta: "それ以外（夫婦間、兄弟間、18歳未満の子への贈与など、一般税率）" },
      ],
      porDefecto: "special",
    },
  ],
  calcular(entrada, v) {
    if (entrada.monto <= 0) throw new ErrorEntrada("もらった財産の額を入力してください。", "monto");
    const escala = entrada.tipo === "special" ? v["jp.gift-tax-special"] : v["jp.gift-tax-general"];
    const kazei = Math.max(0, entrada.monto - v["jp.gift-tax-basic-exemption"]);
    const impuesto = piso(aplicarEscalaMarginal(escala, kazei));
    return {
      impuesto,
      kazei,
      neto: entrada.monto - impuesto,
      marginal: tasaMarginal(escala, kazei),
      efectiva: (impuesto / entrada.monto) * 100,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "贈与税額", formato: "moneda", destacada: true },
    { clave: "kazei", etiqueta: "基礎控除後の課税価格", formato: "moneda" },
    { clave: "neto", etiqueta: "税引き後に残る額", formato: "moneda" },
    { clave: "marginal", etiqueta: "適用される最高税率", formato: "porcentaje", decimales: 0 },
    { clave: "efectiva", etiqueta: "もらった額に対する税負担率", formato: "porcentaje", decimales: 2 },
  ],
});
