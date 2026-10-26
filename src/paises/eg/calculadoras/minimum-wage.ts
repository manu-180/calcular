import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.minimum-wage",
  mercado: "eg",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "eg.min-wage-private": "numero",
    "eg.min-income-public": "numero",
    "eg.min-wage-hourly": "numero",
  },
  campos: [
    {
      id: "sector",
      tipo: "opcion",
      etiqueta: "أين تعمل؟",
      opciones: [
        { valor: "privado", etiqueta: "القطاع الخاص (دوام كامل)" },
        { valor: "publico", etiqueta: "الجهاز الإداري للدولة" },
        { valor: "parcial", etiqueta: "عمل لبعض الوقت بالساعة" },
      ],
      porDefecto: "privado",
    },
    { id: "horas", tipo: "numero", etiqueta: "ساعات العمل في الشهر", min: 1, max: 300, porDefecto: 100, visibleSi: { sector: ["parcial"] } },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "ما تتقاضاه في الشهر",
      min: 0,
      requerido: false,
      ayuda: "اختياري. أدخله لتقارنه بالحد الأدنى.",
    },
  ],
  calcular(e, v, { redondear }) {
    let minimo: number;
    let porHora: number | null = null;
    if (e.sector === "privado") minimo = v["eg.min-wage-private"];
    else if (e.sector === "publico") minimo = v["eg.min-income-public"];
    else {
      const horas = e.horas ?? 0;
      if (horas <= 0) throw new ErrorEntrada("أدخل عدد ساعات العمل في الشهر.", "horas");
      porHora = v["eg.min-wage-hourly"];
      minimo = redondear(porHora * horas);
    }
    let diferencia: number | null = null;
    let situacion: string | null = null;
    if (e.salario !== null) {
      diferencia = redondear(e.salario - minimo);
      situacion = diferencia >= 0 ? "ما تتقاضاه يساوي الحد الأدنى أو يزيد عليه." : "ما تتقاضاه أقل من الحد الأدنى.";
    }
    return {
      minimo,
      porHora,
      anual: redondear(minimo * 12),
      diferencia,
      situacion,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "الحد الأدنى الشهري", formato: "moneda", destacada: true },
    { clave: "porHora", etiqueta: "الحد الأدنى لأجر الساعة", formato: "moneda" },
    { clave: "anual", etiqueta: "الحد الأدنى في 12 شهرًا", formato: "moneda" },
    { clave: "diferencia", etiqueta: "الفرق بين ما تتقاضاه والحد الأدنى", formato: "moneda" },
    { clave: "situacion", etiqueta: "النتيجة", formato: "texto" },
  ],
});
