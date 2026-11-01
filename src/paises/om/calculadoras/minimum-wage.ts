import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "om.minimum-wage",
  mercado: "om",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "borrador",
  requiere: {
    "om.minimum-wage": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري الشامل", min: 0, porDefecto: 300 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("أدخل أجرك الشهري.", "salario");
    const minimo = v["om.minimum-wage"];
    return {
      minimo,
      diferencia: redondear(Math.max(0, minimo - entrada.salario)),
      cumple: entrada.salario >= minimo ? "نعم" : "لا",
      observaciones: ["الحد الأدنى للأجور يخص العمانيين العاملين في القطاع الخاص."],
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "الحد الأدنى للأجر الشهري", formato: "moneda", destacada: true },
    { clave: "cumple", etiqueta: "هل يبلغ أجرك الحد الأدنى؟", formato: "texto" },
    { clave: "diferencia", etiqueta: "الفرق حتى الحد الأدنى", formato: "moneda", ocultarSiCero: true },
  ],
});
