import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sa.ramadan-working-hours",
  mercado: "sa",
  concepto: "propio",
  slug: "ramadan-working-hours",
  estado: "publicado",
  requiere: {
    "sa.working-hours": "mapa",
    "sa.overtime-premium": "numero",
    "sa.month-days": "numero",
  },
  campos: [
    { id: "horasDia", tipo: "numero", etiqueta: "الساعات التي تعملها فعليًا في اليوم خلال رمضان", min: 0, max: 16, porDefecto: 8 },
    { id: "diasSemana", tipo: "entero", etiqueta: "أيام العمل في الأسبوع", min: 1, max: 6, porDefecto: 5 },
    {
      id: "criterio",
      tipo: "opcion",
      etiqueta: "معيار ساعات العمل في منشأتك",
      ayuda: "أغلب المنشآت تعتمد المعيار اليومي. إذا كانت منشأتك تحسب الساعات أسبوعيًا فاختر المعيار الأسبوعي.",
      opciones: [
        { valor: "daily", etiqueta: "يومي" },
        { valor: "weekly", etiqueta: "أسبوعي" },
      ],
      porDefecto: "daily",
    },
    { id: "basico", tipo: "moneda", etiqueta: "الراتب الأساسي الشهري", min: 0, porDefecto: 6000 },
    { id: "total", tipo: "moneda", etiqueta: "الأجر الشهري الكامل", ayuda: "الأساسي مع البدلات الثابتة.", min: 0, porDefecto: 8000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horasDia <= 0) throw new ErrorEntrada("أدخل ساعات العمل اليومية.", "horasDia");
    if (entrada.total < entrada.basico) throw new ErrorEntrada("الأجر الكامل لا يقل عن الراتب الأساسي.", "total");
    const h = v["sa.working-hours"];
    const maxDia = enMapa(h, "ramadan-daily");
    const maxSemana = enMapa(h, "ramadan-weekly");
    const semana = entrada.horasDia * entrada.diasSemana;
    const extraSemana =
      entrada.criterio === "weekly" ? Math.max(0, semana - maxSemana) : Math.max(0, entrada.horasDia - maxDia) * entrada.diasSemana;
    // En Ramadán la jornada de referencia es la reducida: la hora vale el sueldo ÷ 30 ÷ 6.
    const dias = v["sa.month-days"];
    const porHora = entrada.total / dias / maxDia + porcentaje(entrada.basico / dias / maxDia, v["sa.overtime-premium"]);
    return {
      extraSemana,
      pagoSemana: redondear(extraSemana * porHora),
      semana,
      maxDia,
      maxSemana,
      porHora: redondear(porHora),
      observaciones: [
        extraSemana > 0
          ? "الساعات التي تزيد على حد رمضان تُعد عملًا إضافيًا ويُدفع أجرها بالزيادة النظامية."
          : "ساعاتك في حدود رمضان، فلا عمل إضافي.",
        "تخفيض ساعات العمل في رمضان للعمال المسلمين.",
      ],
    };
  },
  resultado: [
    { clave: "extraSemana", etiqueta: "الساعات الإضافية في الأسبوع", formato: "horas", decimales: 2, destacada: true },
    { clave: "pagoSemana", etiqueta: "أجرها في الأسبوع", formato: "moneda" },
    { clave: "semana", etiqueta: "ساعات عملك في الأسبوع", formato: "horas", decimales: 2 },
    { clave: "maxDia", etiqueta: "الحد الأعلى في اليوم خلال رمضان", formato: "horas" },
    { clave: "maxSemana", etiqueta: "الحد الأعلى في الأسبوع خلال رمضان", formato: "horas" },
    { clave: "porHora", etiqueta: "أجر الساعة الإضافية في رمضان", formato: "moneda" },
  ],
});
