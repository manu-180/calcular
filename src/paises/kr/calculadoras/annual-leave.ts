import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { mesesCompletos } from "../lib/fechas";

export default definirCalculadora({
  id: "kr.annual-leave",
  mercado: "kr",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "kr.annual-leave": "mapa",
    "kr.minimum-wage-monthly-hours": "numero",
  },
  campos: [
    { id: "ipsa", tipo: "fecha", etiqueta: "입사일", porDefecto: "2022-03-02" },
    { id: "gijun", tipo: "fecha", etiqueta: "계산 기준일", porDefecto: "hoy" },
    { id: "wolgeup", tipo: "moneda", etiqueta: "월 통상임금(기본급과 고정수당)", min: 0, porDefecto: 3000000 },
    { id: "misayong", tipo: "numero", etiqueta: "쓰지 못한 연차 일수", min: 0, max: 25, porDefecto: 0 },
    { id: "ojin", tipo: "si-no", etiqueta: "상시 근로자 5명 이상 사업장이에요", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.gijun < e.ipsa) throw new ErrorEntrada("기준일은 입사일보다 뒤여야 해요.", "gijun");
    const meses = mesesCompletos(e.ipsa, e.gijun);
    const anios = Math.floor(meses / 12);
    const m = v["kr.annual-leave"];
    const tope = enMapa(m, "max");
    let dias: number;
    if (!e.ojin) dias = 0;
    else if (anios < 1) dias = Math.min(11, meses * enMapa(m, "mensual"));
    else dias = Math.min(tope, enMapa(m, "base") + Math.floor((anios - 1) / 2));
    // 통상임금 de un día: el sueldo mensual dividido por las 209 horas pagas del mes (40 horas
    // semanales con 주휴) por 8 horas de jornada.
    const diario = (e.wolgeup / v["kr.minimum-wage-monthly-hours"]) * 8;
    const observaciones: string[] = [];
    if (!e.ojin) observaciones.push("상시 4명 이하 사업장에는 연차 유급휴가 규정이 적용되지 않아요.");
    if (e.ojin && anios < 1) observaciones.push("입사 1년 미만은 1개월 개근할 때마다 1일씩, 최대 11일이 생겨요. 1년을 채우면 15일이 새로 생겨요.");
    if (e.ojin && anios >= 1) observaciones.push("1년간 80% 이상 출근했을 때의 일수예요. 80% 미만이면 개근한 달마다 1일씩 생겨요.");
    return {
      dias,
      anios,
      meses,
      diario: redondear(diario),
      pago: e.ojin ? redondear(diario * Math.min(e.misayong, tope)) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "올해 생기는 연차 일수", formato: "dias", destacada: true },
    { clave: "pago", etiqueta: "미사용 연차수당", formato: "moneda" },
    { clave: "diario", etiqueta: "1일 통상임금", formato: "moneda" },
    { clave: "anios", etiqueta: "근속연수", formato: "anios" },
    { clave: "meses", etiqueta: "근속 개월 수", formato: "meses" },
  ],
});
