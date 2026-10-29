import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.sick-leave-calculator",
  mercado: "ps",
  concepto: "propio",
  slug: "sick-leave-calculator",
  estado: "publicado",
  requiere: {
    "ps.sick-leave": "mapa",
    "ps.sick-leave-half-rate": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 3000 },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "أيام الإجازة المرضية في السنة",
      ayuda: "مجموع أيام الإجازة المرضية التي قررتها اللجنة الطبية خلال السنة، مع الأيام السابقة منها.",
      min: 1,
      max: 366,
      porDefecto: 20,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const t = v["ps.sick-leave"];
    const tramoCompleto = enMapa(t, "full");
    const tramoMitad = enMapa(t, "half");
    const completos = Math.min(entrada.dias, tramoCompleto);
    const medios = Math.min(Math.max(entrada.dias - tramoCompleto, 0), tramoMitad);
    const sinPago = Math.max(entrada.dias - tramoCompleto - tramoMitad, 0);
    const diario = entrada.salario / DIAS_MES;
    const pagoCompleto = redondear(completos * diario);
    const pagoMitad = redondear(porcentaje(medios * diario, v["ps.sick-leave-half-rate"]));
    const observaciones = ["أجر اليوم محسوب على أساس 30 يومًا في الشهر. الإجازة المرضية تُستحق بناءً على تقرير من اللجنة الطبية."];
    if (sinPago > 0) observaciones.push("ما زاد على الأيام مدفوعة الأجر في القانون لا يستحق عنه أجر، إلا إذا نص عليه عقدك أو نظام المنشأة.");
    return {
      total: redondear(pagoCompleto + pagoMitad),
      completos,
      medios,
      sinPago,
      pagoCompleto,
      pagoMitad,
      descuento: redondear(entrada.dias * diario - pagoCompleto - pagoMitad),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "أجر أيام الإجازة المرضية", formato: "moneda", destacada: true },
    { clave: "completos", etiqueta: "أيام بالأجر الكامل", formato: "dias" },
    { clave: "medios", etiqueta: "أيام بنصف الأجر", formato: "dias", ocultarSiCero: true },
    { clave: "sinPago", etiqueta: "أيام دون أجر", formato: "dias", ocultarSiCero: true },
    { clave: "pagoCompleto", etiqueta: "أجر الأيام الكاملة", formato: "moneda" },
    { clave: "pagoMitad", etiqueta: "أجر الأيام بنصف الأجر", formato: "moneda", ocultarSiCero: true },
    { clave: "descuento", etiqueta: "الفرق عن أجرك المعتاد لهذه الأيام", formato: "moneda", ocultarSiCero: true },
  ],
});
