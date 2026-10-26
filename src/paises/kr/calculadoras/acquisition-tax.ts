import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { truncar10 } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.acquisition-tax",
  mercado: "kr",
  concepto: "propio",
  slug: "acquisition-tax",
  estado: "publicado",
  requiere: {
    "kr.housing-acquisition-tax": "mapa",
    "kr.housing-acquisition-brackets": "mapa",
    "kr.local-education-tax": "mapa",
    "kr.rural-special-tax": "mapa",
  },
  campos: [
    { id: "gaek", tipo: "moneda", etiqueta: "주택 취득가액(매매가)", min: 0, porDefecto: 700000000 },
    { id: "gwangpyeong", tipo: "si-no", etiqueta: "전용면적이 85제곱미터를 넘어요", porDefecto: false },
  ],
  calcular(e, v) {
    if (e.gaek <= 0) throw new ErrorEntrada("취득가액을 입력하세요.", "gaek");
    const t = v["kr.housing-acquisition-tax"];
    const bajo = enMapa(v["kr.housing-acquisition-brackets"], "low");
    const alto = enMapa(v["kr.housing-acquisition-brackets"], "high");
    let tasa: number;
    if (e.gaek <= bajo) tasa = enMapa(t, "low");
    else if (e.gaek > alto) tasa = enMapa(t, "high");
    // 지방세법 제11조 제1항 제8호 나목: (취득가액 × 2/3억원 − 3) × 1/100, a 4 decimales de la fracción
    // (2 decimales del porcentaje).
    else tasa = Math.round(((e.gaek * 2) / 300000000 - 3) * 100) / 100;
    const impuesto = truncar10((e.gaek * tasa) / 100);
    const edu = v["kr.local-education-tax"];
    const educacion = truncar10((((e.gaek * tasa * enMapa(edu, "rate-factor")) / 100) * enMapa(edu, "rate")) / 10000);
    const rural = v["kr.rural-special-tax"];
    const especial = e.gwangpyeong ? truncar10((e.gaek * enMapa(rural, "base-rate") * enMapa(rural, "rate")) / 10000) : 0;
    const total = impuesto + educacion + especial;
    return { total, tasa, impuesto, educacion, especial, tasaTotal: (total / e.gaek) * 100 };
  },
  resultado: [
    { clave: "total", etiqueta: "취득세 등 합계", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "취득세", formato: "moneda" },
    { clave: "tasa", etiqueta: "취득세율", formato: "porcentaje", decimales: 2 },
    { clave: "educacion", etiqueta: "지방교육세", formato: "moneda" },
    { clave: "especial", etiqueta: "농어촌특별세", formato: "moneda" },
    { clave: "tasaTotal", etiqueta: "합계 세율", formato: "porcentaje", decimales: 2 },
  ],
});
