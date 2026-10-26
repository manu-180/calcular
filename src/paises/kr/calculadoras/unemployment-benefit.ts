import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasInclusive, sumarDias, sumarMeses } from "../lib/fechas";
import { piso } from "../lib/impuestos";

export default definirCalculadora({
  id: "kr.unemployment-benefit",
  mercado: "kr",
  concepto: "propio",
  slug: "unemployment-benefit",
  estado: "publicado",
  requiere: {
    "kr.unemployment-rate": "numero",
    "kr.unemployment-min-rate": "numero",
    "kr.unemployment-base-cap": "numero",
    "kr.unemployment-days": "mapa",
    "kr.minimum-wage": "numero",
  },
  campos: [
    { id: "majimak", tipo: "fecha", etiqueta: "마지막 근무일", porDefecto: "hoy" },
    { id: "imgeum", tipo: "moneda", etiqueta: "퇴직 전 3개월 임금 총액(세전)", min: 0, porDefecto: 9000000 },
    {
      id: "gigan",
      tipo: "opcion",
      etiqueta: "고용보험 가입 기간",
      opciones: [
        { valor: "0", etiqueta: "1년 미만" },
        { valor: "1", etiqueta: "1년 이상 3년 미만" },
        { valor: "3", etiqueta: "3년 이상 5년 미만" },
        { valor: "5", etiqueta: "5년 이상 10년 미만" },
        { valor: "10", etiqueta: "10년 이상" },
      ],
      porDefecto: "3",
    },
    { id: "osip", tipo: "si-no", etiqueta: "퇴직 당시 50세 이상이거나 장애인이에요", porDefecto: false },
    { id: "sigan", tipo: "numero", etiqueta: "1일 소정근로시간", min: 1, max: 8, porDefecto: 8 },
  ],
  calcular(e, v) {
    if (e.imgeum <= 0) throw new ErrorEntrada("3개월 임금 총액을 입력하세요.", "imgeum");
    const diasPeriodo = diasInclusive(sumarMeses(sumarDias(e.majimak, 1), -3), e.majimak);
    const promedio = e.imgeum / diasPeriodo;
    const tope = v["kr.unemployment-base-cap"];
    const base = Math.min(promedio, tope);
    const calculado = piso((base * v["kr.unemployment-rate"]) / 100);
    const minimo = piso((v["kr.minimum-wage"] * e.sigan * v["kr.unemployment-min-rate"]) / 100);
    const diario = Math.max(calculado, minimo);
    const dias = enMapa(v["kr.unemployment-days"], `${e.osip ? "o50" : "u50"}-${e.gigan}`);
    const observaciones = ["이직 전 18개월 동안 피보험 단위기간이 180일 이상이고, 회사 사정 등 비자발적인 이유로 그만둔 경우에 받을 수 있어요."];
    if (diario === minimo && calculado < minimo) observaciones.push("계산한 금액이 하한액보다 적어서 하한액을 적용했어요.");
    if (promedio > tope) observaciones.push("평균임금이 기초일액 상한보다 높아서 상한액을 적용했어요.");
    return {
      total: diario * dias,
      diario,
      dias,
      promedio: piso(promedio),
      tope: piso((tope * v["kr.unemployment-rate"]) / 100),
      minimo,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "예상 실업급여 총액", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "1일 구직급여액", formato: "moneda" },
    { clave: "dias", etiqueta: "소정급여일수", formato: "dias" },
    { clave: "promedio", etiqueta: "1일 평균임금", formato: "moneda" },
    { clave: "tope", etiqueta: "1일 상한액", formato: "moneda" },
    { clave: "minimo", etiqueta: "1일 하한액", formato: "moneda" },
  ],
});
