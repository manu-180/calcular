import { definirCalculadora } from "@/motor/calculo";

// Borrador hasta leer el acuerdo del Consejo Superior del Poder Judicial (o el Boletín Judicial) con el monto vigente.
export default definirCalculadora({
  id: "cr.salario-base",
  mercado: "cr",
  concepto: "conversor-unidad",
  slug: "salario-base",
  estado: "borrador",
  requiere: {
    "cr.salario-base": "numero",
  },
  campos: [{ id: "cantidad", tipo: "numero", etiqueta: "Cantidad de salarios base", min: 0, porDefecto: 1 }],
  calcular(entrada, valores, { redondear }) {
    return { salarioBase: valores["cr.salario-base"], colones: redondear(entrada.cantidad * valores["cr.salario-base"]) };
  },
  resultado: [
    { clave: "salarioBase", etiqueta: "Salario base vigente", formato: "moneda" },
    { clave: "colones", etiqueta: "Monto en colones", formato: "moneda", destacada: true },
  ],
});
