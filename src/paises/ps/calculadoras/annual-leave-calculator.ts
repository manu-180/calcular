import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { salarioSemanal } from "../lib/laboral";

export default definirCalculadora({
  id: "ps.annual-leave-calculator",
  mercado: "ps",
  concepto: "vacaciones",
  slug: "annual-leave-calculator",
  estado: "publicado",
  requiere: {
    "ps.annual-leave": "mapa",
    "ps.annual-leave-years": "numero",
    "ps.annual-leave-carryover": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", min: 0, porDefecto: 3000 },
    { id: "anios", tipo: "entero", etiqueta: "عدد السنوات الكاملة في المنشأة", min: 0, max: 60, porDefecto: 2 },
    { id: "peligroso", tipo: "si-no", etiqueta: "أعمل في عمل خطر أو ضار بالصحة", porDefecto: false },
    {
      id: "pendientes",
      tipo: "numero",
      etiqueta: "أسابيع إجازة متراكمة من السنوات السابقة",
      ayuda: "ما بقي لك من إجازات لم تستعملها. اتركه صفرًا إذا لم يبق شيء.",
      min: 0,
      max: 10,
      porDefecto: 0,
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const t = v["ps.annual-leave"];
    const larga = entrada.peligroso || entrada.anios >= v["ps.annual-leave-years"];
    const semanas = larga ? enMapa(t, "extended") : enMapa(t, "base");
    const semanal = salarioSemanal(entrada.salario);
    const tope = semanas * v["ps.annual-leave-carryover"];
    const acumulables = Math.min(entrada.pendientes, tope);
    const observaciones = ["أجر الأسبوع هنا هو الأجر الشهري مضروبًا في 12 ومقسومًا على 52 أسبوعًا. أيام الأعياد الدينية والرسمية لا تُحسب من الإجازة السنوية."];
    if (entrada.pendientes > tope) observaciones.push("لا يجوز تجميع الإجازات السنوية لأكثر من سنتين، فما زاد على ذلك لا يُرحَّل.");
    return {
      semanas,
      valor: redondear(semanas * semanal),
      semanal: redondear(semanal),
      tope,
      acumulables,
      valorAcumuladas: redondear(acumulables * semanal),
      observaciones,
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "الإجازة السنوية المستحقة", formato: "semanas", destacada: true },
    { clave: "valor", etiqueta: "أجر الإجازة السنوية", formato: "moneda" },
    { clave: "semanal", etiqueta: "أجر الأسبوع", formato: "moneda" },
    { clave: "tope", etiqueta: "أقصى ما يجوز تجميعه", formato: "semanas" },
    { clave: "acumulables", etiqueta: "الإجازات المتراكمة المعتبرة", formato: "semanas", ocultarSiCero: true },
    { clave: "valorAcumuladas", etiqueta: "أجر الإجازات المتراكمة", formato: "moneda", ocultarSiCero: true },
  ],
});
