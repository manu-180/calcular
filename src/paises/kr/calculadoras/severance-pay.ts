import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasInclusive, sumarDias, sumarMeses } from "../lib/fechas";

export default definirCalculadora({
  id: "kr.severance-pay",
  mercado: "kr",
  concepto: "indemnizacion-despido",
  slug: "severance-pay",
  estado: "publicado",
  requiere: {
    "kr.severance-days": "numero",
  },
  campos: [
    { id: "ipsa", tipo: "fecha", etiqueta: "입사일", porDefecto: "2020-01-01" },
    { id: "majimak", tipo: "fecha", etiqueta: "마지막 근무일", porDefecto: "hoy" },
    { id: "imgeum", tipo: "moneda", etiqueta: "퇴직 전 3개월 임금 총액(세전)", min: 0, porDefecto: 9000000, ayuda: "기본급, 고정수당, 연장근로수당 등 3개월 동안 받은 임금을 모두 더하세요." },
    { id: "sangyeo", tipo: "moneda", etiqueta: "최근 1년간 받은 상여금", min: 0, porDefecto: 0 },
    { id: "yeoncha", tipo: "moneda", etiqueta: "최근 1년간 받은 연차수당", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.majimak < e.ipsa) throw new ErrorEntrada("마지막 근무일은 입사일보다 뒤여야 해요.", "majimak");
    if (e.imgeum <= 0) throw new ErrorEntrada("3개월 임금 총액을 입력하세요.", "imgeum");
    const dias = diasInclusive(e.ipsa, e.majimak);
    // 평균임금: lo cobrado en los 3 meses anteriores al día del retiro (el siguiente al último día
    // trabajado), dividido por los días corridos de ese período. 상여금 y 연차수당 anuales entran por 3/12.
    const retiro = sumarDias(e.majimak, 1);
    const diasPeriodo = diasInclusive(sumarMeses(retiro, -3), e.majimak);
    const total3 = e.imgeum + (e.sangyeo * 3) / 12 + (e.yeoncha * 3) / 12;
    const promedio = total3 / diasPeriodo;
    const tiene = dias >= 365;
    const pago = tiene ? redondear((promedio * v["kr.severance-days"] * dias) / 365) : 0;
    const observaciones = tiene
      ? ["평균임금이 통상임금보다 적으면 통상임금으로 계산해야 해요. 퇴직금은 퇴직일부터 14일 안에 받아야 해요."]
      : ["계속근로기간이 1년 미만이면 퇴직금 지급 대상이 아니에요."];
    return { pago, dias, diasPeriodo, promedio: redondear(promedio), anios: dias / 365, observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "예상 퇴직금(세전)", formato: "moneda", destacada: true },
    { clave: "promedio", etiqueta: "1일 평균임금", formato: "moneda" },
    { clave: "dias", etiqueta: "재직일수", formato: "dias" },
    { clave: "anios", etiqueta: "근속연수", formato: "anios", decimales: 2 },
    { clave: "diasPeriodo", etiqueta: "평균임금 산정 기간", formato: "dias" },
  ],
});
