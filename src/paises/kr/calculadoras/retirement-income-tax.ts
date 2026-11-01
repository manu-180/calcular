import { aplicarEscala, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { impuestoBasico, piso, truncar10 } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.retirement-income-tax",
  mercado: "kr",
  concepto: "propio",
  slug: "retirement-income-tax",
  estado: "publicado",
  requiere: {
    "kr.retirement-years-deduction": "mapa",
    "kr.retirement-converted-deduction": "escala",
    "kr.income-tax-brackets": "escala",
    "kr.local-income-tax-rate": "numero",
  },
  campos: [
    { id: "toejik", tipo: "moneda", etiqueta: "퇴직급여(퇴직금, 세전)", min: 0, porDefecto: 50000000 },
    { id: "geunsok", tipo: "entero", etiqueta: "근속연수", min: 1, max: 60, porDefecto: 10, ayuda: "1년 미만의 기간은 1년으로 올려서 넣으세요." },
  ],
  calcular(e, v) {
    if (e.toejik <= 0) throw new ErrorEntrada("퇴직급여를 입력하세요.", "toejik");
    if (e.geunsok < 1) throw new ErrorEntrada("근속연수는 1년 이상이어야 해요.", "geunsok");
    const m = v["kr.retirement-years-deduction"];
    const n = e.geunsok;
    let porAnios: number;
    if (n <= 5) porAnios = enMapa(m, "hasta5") * n;
    else if (n <= 10) porAnios = enMapa(m, "base10") + enMapa(m, "hasta10") * (n - 5);
    else if (n <= 20) porAnios = enMapa(m, "base20") + enMapa(m, "hasta20") * (n - 10);
    else porAnios = enMapa(m, "base30") + enMapa(m, "mas20") * (n - 20);
    porAnios = Math.min(porAnios, e.toejik);
    const convertido = piso(((e.toejik - porAnios) * 12) / n);
    const deduccionConvertida = Math.min(convertido, piso(aplicarEscala(v["kr.retirement-converted-deduction"], convertido)));
    const base = convertido - deduccionConvertida;
    const impuestoConvertido = impuestoBasico(base, v["kr.income-tax-brackets"]);
    const impuesto = truncar10((impuestoConvertido / 12) * n);
    const local = truncar10((impuesto * v["kr.local-income-tax-rate"]) / 100);
    return {
      total: impuesto + local,
      impuesto,
      local,
      porAnios,
      convertido,
      deduccionConvertida,
      base,
      impuestoConvertido,
      neto: e.toejik - impuesto - local,
      efectiva: ((impuesto + local) / e.toejik) * 100,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "퇴직소득세와 지방소득세 합계", formato: "moneda", destacada: true },
    { clave: "impuesto", etiqueta: "퇴직소득세", formato: "moneda" },
    { clave: "local", etiqueta: "지방소득세", formato: "moneda" },
    { clave: "neto", etiqueta: "세후 퇴직금", formato: "moneda" },
    { clave: "efectiva", etiqueta: "실효세율", formato: "porcentaje", decimales: 2 },
    { clave: "porAnios", etiqueta: "근속연수공제", formato: "moneda" },
    { clave: "convertido", etiqueta: "환산급여", formato: "moneda" },
    { clave: "deduccionConvertida", etiqueta: "환산급여공제", formato: "moneda" },
    { clave: "base", etiqueta: "퇴직소득 과세표준", formato: "moneda" },
    { clave: "impuestoConvertido", etiqueta: "환산산출세액", formato: "moneda" },
  ],
});
