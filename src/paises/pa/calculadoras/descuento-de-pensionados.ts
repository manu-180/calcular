import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pa.descuento-de-pensionados",
  mercado: "pa",
  concepto: "propio",
  slug: "descuento-de-pensionados",
  estado: "publicado",
  requiere: {
    "pa.css-pensionados": "numero",
  },
  campos: [{ id: "pension", tipo: "moneda", etiqueta: "Pensión mensual bruta", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const css = redondear(porcentaje(entrada.pension, valores["pa.css-pensionados"]));
    return {
      css,
      neta: redondear(entrada.pension - css),
      observaciones: ["La cuota la pagan los pensionados por invalidez, vejez y muerte y los de riesgos profesionales."],
    };
  },
  resultado: [
    { clave: "css", etiqueta: "Cuota de Seguro Social", formato: "moneda" },
    { clave: "neta", etiqueta: "Pensión que recibes", formato: "moneda", destacada: true },
  ],
});
