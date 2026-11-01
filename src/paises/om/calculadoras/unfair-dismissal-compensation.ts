import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "om.unfair-dismissal-compensation",
  mercado: "om",
  concepto: "propio",
  slug: "unfair-dismissal-compensation",
  estado: "publicado",
  requiere: {
    "om.unfair-dismissal": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "آخر أجر شامل شهري", min: 0, porDefecto: 600 },
    { id: "meses", tipo: "numero", etiqueta: "عدد الأشهر التي تتوقعها", ayuda: "تقدرها المحكمة بين الحدين مع مراعاة ظروف العامل ومدة خدمته.", min: 0, max: 12, porDefecto: 3 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل آخر أجر شامل شهري.", "salario");
    const t = v["om.unfair-dismissal"];
    const min = enMapa(t, "min");
    const max = enMapa(t, "max");
    if (entrada.meses < min || entrada.meses > max) throw new ErrorEntrada(`عدد الأشهر بين ${min} و${max}.`, "meses");
    return {
      estimado: redondear(entrada.salario * entrada.meses),
      minimo: redondear(entrada.salario * min),
      maximo: redondear(entrada.salario * max),
      observaciones: [
        "التعويض يحكم به القضاء إذا لم يقرر إعادة العامل إلى عمله، ويضاف إليه مكافأة نهاية الخدمة وأجر مدة الإخطار والاشتراكات التأمينية من تاريخ الفصل حتى الحكم النهائي.",
      ],
    };
  },
  resultado: [
    { clave: "estimado", etiqueta: "التعويض بعدد الأشهر الذي اخترته", formato: "moneda", destacada: true },
    { clave: "minimo", etiqueta: "الحد الأدنى للتعويض", formato: "moneda" },
    { clave: "maximo", etiqueta: "الحد الأقصى للتعويض", formato: "moneda" },
  ],
});
