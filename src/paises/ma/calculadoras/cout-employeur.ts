import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisations, REQ_CNSS } from "../lib/cnss";

export default definirCalculadora({
  id: "ma.cout-employeur",
  mercado: "ma",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "borrador",
  requiere: REQ_CNSS,
  campos: [{ id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 10000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisations(entrada.brut, v, redondear);
    return { cout: redondear(entrada.brut + c.employeur), charges: c.employeur, parAn: redondear((entrada.brut + c.employeur) * 12) };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "charges", etiqueta: "Charges patronales", formato: "moneda" },
    { clave: "parAn", etiqueta: "Coût annuel", formato: "moneda" },
  ],
});
