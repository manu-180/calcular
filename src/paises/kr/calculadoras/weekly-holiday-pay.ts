import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kr.weekly-holiday-pay",
  mercado: "kr",
  concepto: "propio",
  slug: "weekly-holiday-pay",
  estado: "publicado",
  requiere: {
    "kr.minimum-wage": "numero",
    "kr.weekly-holiday-min-hours": "numero",
  },
  campos: [
    { id: "sigeup", tipo: "moneda", etiqueta: "시급", min: 0, requerido: false, ayuda: "비워 두면 올해 최저임금 시급으로 계산해요." },
    { id: "horas", tipo: "numero", etiqueta: "1주 소정근로시간", min: 0, max: 52, porDefecto: 20 },
  ],
  calcular(e, v, { redondear }) {
    const sigeup = e.sigeup ?? v["kr.minimum-wage"];
    if (sigeup <= 0) throw new ErrorEntrada("시급을 입력하세요.", "sigeup");
    if (e.horas <= 0) throw new ErrorEntrada("1주 소정근로시간을 입력하세요.", "horas");
    const aplica = e.horas >= v["kr.weekly-holiday-min-hours"];
    // 1일 소정근로시간 = 4주 소정근로시간 ÷ 통상 근로자의 4주 소정근로일(20일): la semana dividida por 5,
    // con el tope de una jornada de 8 horas (40 horas semanales).
    const horasJuhyu = aplica ? Math.min(e.horas, 40) / 5 : 0;
    const semanal = redondear(sigeup * horasJuhyu);
    const observaciones: string[] = [];
    if (!aplica) observaciones.push("4주 평균 1주 소정근로시간이 15시간 미만이면 주휴수당이 없어요.");
    if (aplica) observaciones.push("주휴수당은 그 주의 소정근로일을 모두 출근했을 때 받아요.");
    if (e.sigeup !== null && e.sigeup < v["kr.minimum-wage"]) observaciones.push("입력한 시급이 올해 최저임금보다 낮아요.");
    return {
      semanal,
      horasJuhyu,
      mensual: redondear((semanal * 365) / 7 / 12),
      semanaTotal: redondear(sigeup * (e.horas + horasJuhyu)),
      sigeup,
      observaciones,
    };
  },
  resultado: [
    { clave: "semanal", etiqueta: "주휴수당(1주)", formato: "moneda", destacada: true },
    { clave: "horasJuhyu", etiqueta: "주휴시간", formato: "horas", decimales: 1 },
    { clave: "mensual", etiqueta: "한 달 주휴수당(평균 4.345주)", formato: "moneda" },
    { clave: "semanaTotal", etiqueta: "주휴수당을 포함한 주급", formato: "moneda" },
    { clave: "sigeup", etiqueta: "적용한 시급", formato: "moneda" },
  ],
});
