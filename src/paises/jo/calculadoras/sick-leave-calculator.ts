import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "jo.sick-leave-calculator",
  mercado: "jo",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "jo.sick-leave": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 600 },
    { id: "dias", tipo: "entero", etiqueta: "أيام الإجازة المرضية هذه السنة", ayuda: "بتقرير من الطبيب المعتمد من المنشأة.", min: 0, max: 365, porDefecto: 10 },
    { id: "hospital", tipo: "si-no", etiqueta: "دخلت المستشفى خلال المرض", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    if (entrada.dias <= 0) throw new ErrorEntrada("أدخل عدد أيام الإجازة المرضية.", "dias");
    const t = v["jo.sick-leave"];
    const tope = enMapa(t, "paid") + (entrada.hospital ? enMapa(t, "hospital") : 0);
    const pagados = Math.min(entrada.dias, tope);
    const restantes = entrada.dias - pagados;
    const diario = entrada.salario / DIAS_MES;
    const observaciones = ["أجر اليوم هنا على أساس 30 يومًا في الشهر."];
    if (restantes > 0) observaciones.push("القانون لا يلزم صاحب العمل بأجر عن الأيام التي تزيد على الإجازة المرضية المدفوعة، إلا إذا نص العقد أو نظام المنشأة على ذلك.");
    return {
      pagados,
      tope,
      restantes,
      pago: redondear(pagados * diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "pagados", etiqueta: "أيام مرضية بأجر كامل", formato: "dias", destacada: true },
    { clave: "pago", etiqueta: "أجر هذه الأيام", formato: "moneda" },
    { clave: "tope", etiqueta: "الحد الأعلى للإجازة المرضية المدفوعة في السنة", formato: "dias" },
    { clave: "restantes", etiqueta: "أيام تزيد على الحد", formato: "dias", ocultarSiCero: true },
  ],
});
