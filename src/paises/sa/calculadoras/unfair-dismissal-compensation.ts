import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { salarioDiario } from "../lib/laboral";

export default definirCalculadora({
  id: "sa.unfair-dismissal-compensation",
  mercado: "sa",
  concepto: "propio",
  slug: "unfair-dismissal-compensation",
  estado: "publicado",
  requiere: {
    "sa.unfair-dismissal": "mapa",
    "sa.month-days": "numero",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "نوع العقد",
      opciones: [
        { valor: "indefinite", etiqueta: "غير محدد المدة" },
        { valor: "fixed", etiqueta: "محدد المدة" },
      ],
      porDefecto: "indefinite",
    },
    { id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري", ayuda: "الأجر الفعلي: الأساسي مع البدلات الثابتة.", min: 0, porDefecto: 10000 },
    { id: "anios", tipo: "numero", etiqueta: "سنوات الخدمة", min: 0, max: 60, porDefecto: 6, visibleSi: { contrato: ["indefinite"] } },
    { id: "meses", tipo: "numero", etiqueta: "الأشهر الباقية من العقد", min: 0, max: 600, porDefecto: 8, visibleSi: { contrato: ["fixed"] } },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salario");
    const t = v["sa.unfair-dismissal"];
    const diario = salarioDiario(entrada.salario, v["sa.month-days"]);
    const base =
      entrada.contrato === "indefinite"
        ? enMapa(t, "days-per-year") * diario * (entrada.anios ?? 0)
        : entrada.salario * (entrada.meses ?? 0);
    const minimo = enMapa(t, "minimum-months") * entrada.salario;
    const aplicaMinimo = base < minimo;
    return {
      compensacion: redondear(Math.max(base, minimo)),
      base: redondear(base),
      minimo: redondear(minimo),
      observaciones: [
        ...(aplicaMinimo ? ["الحساب أقل من أجر شهرين، فيُصرف الحد الأدنى."] : []),
        "يُطبق هذا ما لم يتضمن العقد تعويضًا محددًا عن الإنهاء لسبب غير مشروع. ومكافأة نهاية الخدمة تُحسب على حدة.",
      ],
    };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "التعويض عن الإنهاء لسبب غير مشروع", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "الحساب قبل تطبيق الحد الأدنى", formato: "moneda" },
    { clave: "minimo", etiqueta: "الحد الأدنى (أجر شهرين)", formato: "moneda" },
  ],
});
