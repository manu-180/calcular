import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ne.smig",
  mercado: "ne",
  concepto: "salario-minimo",
  slug: "smig",
  estado: "borrador",
  requiere: { "ne.smig": "numero" },
  campos: [{ id: "salaire", tipo: "moneda", etiqueta: "Salaire mensuel de base", min: 0, porDefecto: 60000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("Indiquez un salaire supérieur à zéro.", "salaire");
    const smig = v["ne.smig"];
    return { smig, ecart: redondear(entrada.salaire - smig) };
  },
  resultado: [
    { clave: "smig", etiqueta: "SMIG mensuel", formato: "moneda", destacada: true },
    { clave: "ecart", etiqueta: "Écart avec votre salaire", formato: "moneda" },
  ],
});
