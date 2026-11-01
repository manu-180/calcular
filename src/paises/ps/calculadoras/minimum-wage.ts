import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: la decisión del مجلس الوزراء que fija el mínimo no se pudo leer en una fuente oficial
// (ver datos.json, ps.minimum-wage).
export default definirCalculadora({
  id: "ps.minimum-wage",
  mercado: "ps",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "borrador",
  requiere: {
    "ps.minimum-wage": "numero",
  },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "أجرك الشهري", min: 0, porDefecto: 2000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("أدخل أجرك الشهري.", "salario");
    const minimo = v["ps.minimum-wage"];
    const diferencia = redondear(Math.max(minimo - entrada.salario, 0));
    return {
      minimo,
      diferencia,
      cumple: diferencia === 0 ? "نعم" : "لا",
    };
  },
  resultado: [
    { clave: "cumple", etiqueta: "أجرك لا يقل عن الحد الأدنى", formato: "texto", destacada: true },
    { clave: "minimo", etiqueta: "الحد الأدنى للأجور الشهري", formato: "moneda" },
    { clave: "diferencia", etiqueta: "الفرق الناقص عن الحد الأدنى", formato: "moneda", ocultarSiCero: true },
  ],
});
