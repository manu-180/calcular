import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kr.jeonwolse-conversion",
  mercado: "kr",
  concepto: "propio",
  slug: "jeonwolse-conversion",
  estado: "publicado",
  requiere: {
    "kr.rent-conversion": "mapa",
    "kr.base-rate": "serie",
  },
  campos: [
    {
      id: "banghyang",
      tipo: "opcion",
      etiqueta: "무엇을 계산할까요?",
      opciones: [
        { valor: "a-wolse", etiqueta: "보증금 일부를 월세로 바꾸기" },
        { valor: "a-bojeung", etiqueta: "월세를 보증금으로 바꾸기" },
      ],
      porDefecto: "a-wolse",
    },
    { id: "geumaek", tipo: "moneda", etiqueta: "월세로 바꿀 보증금", min: 0, porDefecto: 100000000, visibleSi: { banghyang: ["a-wolse"] } },
    { id: "wolse", tipo: "moneda", etiqueta: "보증금으로 바꿀 월세", min: 0, porDefecto: 500000, visibleSi: { banghyang: ["a-bojeung"] } },
  ],
  calcular(e, v, { redondear }) {
    const m = v["kr.rent-conversion"];
    const { valor: base, fecha } = v["kr.base-rate"];
    const tasa = Math.min(enMapa(m, "tope"), base + enMapa(m, "adicional"));
    const aWolse = e.banghyang === "a-wolse";
    const monto = aWolse ? (e.geumaek ?? 0) : (e.wolse ?? 0);
    if (monto <= 0) throw new ErrorEntrada("금액을 입력하세요.", aWolse ? "geumaek" : "wolse");
    const resultado = aWolse ? redondear((monto * tasa) / 100 / 12) : redondear((monto * 12 * 100) / tasa);
    return {
      resultado,
      etiqueta: aWolse ? "법으로 받을 수 있는 월세 상한" : "같은 가치의 보증금",
      tasa,
      base,
      fecha,
      observaciones: aWolse
        ? ["보증금의 전부나 일부를 월세로 바꿀 때 이 비율로 계산한 금액을 넘는 월세는 받을 수 없어요."]
        : ["법의 산정률 제한은 보증금을 월세로 바꿀 때 적용돼요. 이 금액은 같은 전환율로 본 참고 금액이에요."],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "계산 결과", formato: "moneda", destacada: true },
    { clave: "etiqueta", etiqueta: "결과의 의미", formato: "texto" },
    { clave: "tasa", etiqueta: "법정 전환율 상한(연)", formato: "porcentaje", decimales: 2 },
    { clave: "base", etiqueta: "한국은행 기준금리", formato: "porcentaje", decimales: 2 },
    { clave: "fecha", etiqueta: "기준금리 기준일", formato: "fecha" },
  ],
});
