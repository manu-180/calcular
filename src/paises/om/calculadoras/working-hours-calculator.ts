import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "om.working-hours-calculator",
  mercado: "om",
  concepto: "propio",
  slug: "working-hours-calculator",
  estado: "publicado",
  requiere: {
    "om.working-hours": "mapa",
  },
  campos: [
    { id: "horasDia", tipo: "numero", etiqueta: "ساعات العمل الفعلية في اليوم", ayuda: "دون ساعة الراحة وتناول الطعام.", min: 0, max: 24, porDefecto: 9 },
    { id: "diasSemana", tipo: "entero", etiqueta: "أيام العمل في الأسبوع", min: 1, max: 7, porDefecto: 5 },
    { id: "ramadan", tipo: "si-no", etiqueta: "في شهر رمضان والعامل مسلم", porDefecto: false },
  ],
  calcular(entrada, v) {
    if (entrada.horasDia <= 0) throw new ErrorEntrada("أدخل ساعات العمل في اليوم.", "horasDia");
    const t = v["om.working-hours"];
    const limiteDia = enMapa(t, entrada.ramadan ? "ramadan-daily" : "daily");
    const limiteSemana = enMapa(t, entrada.ramadan ? "ramadan-weekly" : "weekly");
    const semana = entrada.horasDia * entrada.diasSemana;
    const excesoDia = Math.max(0, entrada.horasDia - limiteDia) * entrada.diasSemana;
    const excesoSemana = Math.max(0, semana - limiteSemana);
    const extra = Math.max(excesoDia, excesoSemana);
    const observaciones: string[] = [];
    if (entrada.horasDia > enMapa(t, "max-daily")) observaciones.push("مجموع ساعات العمل الأصلية والإضافية في اليوم أكثر من الحد الأقصى في القانون.");
    if (entrada.diasSemana > 5) observaciones.push("يستحق العامل راحة أسبوعية مدفوعة الأجر لا تقل عن يومين متتاليين، ويجوز جمعها في الأعمال والمناطق التي يحددها الوزير.");
    return { extra, semana, limiteDia, limiteSemana, observaciones };
  },
  resultado: [
    { clave: "extra", etiqueta: "ساعات إضافية في الأسبوع", formato: "horas", destacada: true },
    { clave: "semana", etiqueta: "ساعات العمل في الأسبوع", formato: "horas" },
    { clave: "limiteDia", etiqueta: "الحد اليومي", formato: "horas" },
    { clave: "limiteSemana", etiqueta: "الحد الأسبوعي", formato: "horas" },
  ],
});
