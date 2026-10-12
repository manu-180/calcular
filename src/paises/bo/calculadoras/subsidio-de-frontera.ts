import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.subsidio-de-frontera",
  mercado: "bo",
  concepto: "propio",
  slug: "subsidio-de-frontera",
  estado: "publicado",
  requiere: {
    "bo.subsidio-frontera": "numero",
  },
  campos: [
    { id: "haberBasico", tipo: "moneda", etiqueta: "Haber básico mensual", min: 0 },
    { id: "enFrontera", tipo: "si-no", etiqueta: "Trabaja de forma permanente a menos de 50 km de una frontera", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const subsidio = entrada.enFrontera ? redondear(porcentaje(entrada.haberBasico, valores["bo.subsidio-frontera"])) : 0;
    const observaciones = entrada.enFrontera
      ? ["El subsidio se paga cada mes junto con su sueldo y forma parte del total ganado."]
      : ["Si no trabaja de forma permanente dentro de los 50 km de la frontera, no le corresponde."];
    return { subsidio, total: redondear(entrada.haberBasico + subsidio), observaciones };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Subsidio de frontera", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Haber básico más subsidio", formato: "moneda" },
  ],
});
