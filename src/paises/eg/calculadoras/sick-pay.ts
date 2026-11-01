import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "eg.sick-pay",
  mercado: "eg",
  concepto: "propio",
  slug: "sick-pay",
  estado: "publicado",
  requiere: { "eg.sick-pay": "mapa", "eg.sick-pay-max-days": "numero", "eg.min-wage-private": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجر الاشتراك الشهري", min: 0, porDefecto: 9000 },
    { id: "dias", tipo: "entero", etiqueta: "أيام الإجازة المرضية في السنة", min: 1, max: 366, porDefecto: 30 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salario <= 0) throw new ErrorEntrada("أدخل أجر الاشتراك الشهري.", "salario");
    const m = v["eg.sick-pay"];
    const tope = v["eg.sick-pay-max-days"];
    const diario = e.salario / 30;
    const minimoDiario = v["eg.min-wage-private"] / 30;
    const pagados = Math.min(e.dias, tope);
    const primeros = Math.min(pagados, 90);
    const resto = Math.max(0, pagados - 90);
    const diaPrimero = Math.max(diario * (enMapa(m, "first90") / 100), minimoDiario);
    const diaResto = Math.max(diario * (enMapa(m, "after90") / 100), minimoDiario);
    const observaciones: string[] = ["الأجر اليومي محسوب على أساس الأجر الشهري مقسومًا على 30."];
    if (e.dias > tope) observaciones.push("التعويض لا يتجاوز الحد الأقصى من الأيام في السنة الميلادية الواحدة، إلا في الأمراض المزمنة التي لها حكم خاص.");
    if (diaPrimero > diario * (enMapa(m, "first90") / 100)) observaciones.push("رُفع التعويض إلى ما يعادل الحد الأدنى للأجور، لأن القانون يشترط ألا يقل عنه.");
    return {
      total: redondear(primeros * diaPrimero + resto * diaResto),
      pagados,
      diaPrimero: redondear(diaPrimero),
      diaResto: resto > 0 ? redondear(diaResto) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "إجمالي تعويض الأجر عن المرض", formato: "moneda", destacada: true },
    { clave: "pagados", etiqueta: "الأيام المعوضة", formato: "dias" },
    { clave: "diaPrimero", etiqueta: "التعويض اليومي في أول 90 يومًا", formato: "moneda" },
    { clave: "diaResto", etiqueta: "التعويض اليومي بعد 90 يومًا", formato: "moneda" },
  ],
});
