import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { salarioDiario } from "../lib/laboral";

function sumarDias(fecha: FechaISO, dias: number): FechaISO {
  const ms = Date.UTC(Number(fecha.slice(0, 4)), Number(fecha.slice(5, 7)) - 1, Number(fecha.slice(8, 10))) + dias * 86400000;
  return new Date(ms).toISOString().slice(0, 10) as FechaISO;
}

export default definirCalculadora({
  id: "sa.notice-period",
  mercado: "sa",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "sa.notice": "mapa",
    "sa.month-days": "numero",
  },
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "من يُنهي العقد؟",
      opciones: [
        { valor: "worker", etiqueta: "العامل (استقالة)" },
        { valor: "employer", etiqueta: "صاحب العمل" },
      ],
      porDefecto: "worker",
    },
    { id: "mensual", tipo: "si-no", etiqueta: "الأجر يُدفع شهريًا", porDefecto: true },
    { id: "aviso", tipo: "fecha", etiqueta: "تاريخ تسليم الإشعار الكتابي", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 10000 },
    { id: "cumplidos", tipo: "entero", etiqueta: "أيام الإشعار التي عملتها فعلًا", ayuda: "إذا انتهى العقد قبل اكتمال المهلة، يُدفع تعويض عن الأيام الباقية.", min: 0, max: 365, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const t = v["sa.notice"];
    const dias = !entrada.mensual ? enMapa(t, "not-monthly") : entrada.quien === "employer" ? enMapa(t, "employer-monthly") : enMapa(t, "worker-monthly");
    const faltan = Math.max(0, dias - entrada.cumplidos);
    const diario = salarioDiario(entrada.salario, v["sa.month-days"]);
    return {
      dias,
      fin: sumarDias(entrada.aviso, dias),
      faltan,
      compensacion: redondear(faltan * diario),
      observaciones: [
        "المهلة للعقد غير محدد المدة، ويجوز أن يحدد العقد مهلة أطول. ومن لا يراعي المهلة يدفع للطرف الآخر مبلغًا يساوي أجر العامل عن المهلة (المادة السادسة والسبعون)، ما لم يتفقا على أكثر. نحسبه هنا عن الأيام التي لم تُعمل منها.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "مهلة الإشعار", formato: "dias", destacada: true },
    { clave: "fin", etiqueta: "أقرب تاريخ لانتهاء العقد", formato: "fecha" },
    { clave: "faltan", etiqueta: "الأيام الباقية من المهلة", formato: "dias" },
    { clave: "compensacion", etiqueta: "التعويض عن الأيام الباقية", formato: "moneda" },
  ],
});
