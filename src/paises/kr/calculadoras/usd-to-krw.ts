import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kr.usd-to-krw",
  mercado: "kr",
  concepto: "tipo-de-cambio",
  slug: "usd-to-krw",
  estado: "publicado",
  requiere: {
    "kr.usd-krw": "serie",
  },
  campos: [
    {
      id: "banghyang",
      tipo: "opcion",
      etiqueta: "바꿀 방향",
      opciones: [
        { valor: "usd-krw", etiqueta: "미국 달러를 원화로" },
        { valor: "krw-usd", etiqueta: "원화를 미국 달러로" },
      ],
      porDefecto: "usd-krw",
    },
    { id: "geumaek", tipo: "numero", etiqueta: "금액", min: 0, porDefecto: 100 },
  ],
  calcular(e, v) {
    if (e.geumaek <= 0) throw new ErrorEntrada("0보다 큰 금액을 입력하세요.", "geumaek");
    const { valor, fecha } = v["kr.usd-krw"];
    const aWon = e.banghyang === "usd-krw";
    return {
      resultado: aWon ? e.geumaek * valor : e.geumaek / valor,
      moneda: aWon ? "원(KRW)" : "미국 달러(USD)",
      tasa: valor,
      inversa: 1 / valor,
      fecha,
      observaciones: ["한국은행이 공시하는 매매기준율이에요. 은행에서 실제로 환전할 때는 수수료와 환전 스프레드가 더해져요."],
    };
  },
  resultado: [
    { clave: "resultado", etiqueta: "바꾼 금액", formato: "numero", decimales: 2, destacada: true },
    { clave: "moneda", etiqueta: "결과 통화", formato: "texto" },
    { clave: "tasa", etiqueta: "1달러당 원(매매기준율)", formato: "numero", decimales: 2 },
    { clave: "inversa", etiqueta: "1원당 달러", formato: "numero", decimales: 6 },
    { clave: "fecha", etiqueta: "환율 기준일", formato: "fecha" },
  ],
});
