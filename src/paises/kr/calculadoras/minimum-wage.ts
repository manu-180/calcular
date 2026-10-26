import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "kr.minimum-wage",
  mercado: "kr",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "kr.minimum-wage": "numero",
    "kr.minimum-wage-monthly-hours": "numero",
    "kr.weekly-holiday-min-hours": "numero",
  },
  campos: [{ id: "horas", tipo: "numero", etiqueta: "1주 소정근로시간", min: 1, max: 40, porDefecto: 40, ayuda: "근로계약서에 적힌 1주 근로시간이에요. 연장근로는 빼고 넣으세요." }],
  calcular(e, v, { redondear }) {
    if (e.horas <= 0 || e.horas > 40) throw new ErrorEntrada("1주 소정근로시간은 1시간부터 40시간까지 넣을 수 있어요.", "horas");
    const hora = v["kr.minimum-wage"];
    const conJuhyu = e.horas >= v["kr.weekly-holiday-min-hours"];
    // El 고시 fija 209 horas pagas por mes para 40 horas semanales (주휴 de 8 horas incluido). Una
    // jornada menor con 주휴 se toma en proporción; sin 주휴 se pagan solo las horas del mes (365 / 7 / 12 semanas).
    const horasMes = conJuhyu ? (v["kr.minimum-wage-monthly-hours"] * e.horas) / 40 : (e.horas * 365) / 7 / 12;
    const juhyu = conJuhyu ? Math.min(e.horas, 40) / 5 : 0;
    const mensual = redondear(hora * horasMes);
    const observaciones = conJuhyu
      ? []
      : ["1주 소정근로시간이 15시간 미만이면 주휴수당이 없어서 월 환산액에 주휴시간을 넣지 않았어요."];
    return {
      hora,
      dia: redondear((hora * e.horas) / 5),
      semana: redondear(hora * (e.horas + juhyu)),
      mensual,
      anual: mensual * 12,
      horasMes,
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "최저임금(시간급)", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "월 환산액", formato: "moneda" },
    { clave: "semana", etiqueta: "주급(주휴수당 포함)", formato: "moneda" },
    { clave: "dia", etiqueta: "일급(주 5일 기준)", formato: "moneda" },
    { clave: "anual", etiqueta: "연 환산액", formato: "moneda" },
    { clave: "horasMes", etiqueta: "월 환산 기준시간", formato: "horas", decimales: 1 },
  ],
});
