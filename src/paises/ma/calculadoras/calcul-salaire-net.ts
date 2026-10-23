import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisations, REQ_CNSS } from "../lib/cnss";
import { impotSurSalaire, REQ_IR } from "../lib/ir";

export default definirCalculadora({
  id: "ma.calcul-salaire-net",
  mercado: "ma",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "borrador",
  requiere: { ...REQ_IR, ...REQ_CNSS },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 10000 },
    { id: "personnes", tipo: "entero", etiqueta: "Personnes à charge (conjoint et enfants)", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisations(entrada.brut, v, redondear);
    const ir = impotSurSalaire(entrada.brut, c.salarie, entrada.personnes, v, redondear);
    return {
      net: redondear(entrada.brut - c.salarie - ir.impotMensuel),
      cnss: c.salarieCnss,
      amo: c.salarieAmo,
      ir: ir.impotMensuel,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net mensuel", formato: "moneda", destacada: true },
    { clave: "cnss", etiqueta: "Moins : cotisation CNSS", formato: "moneda" },
    { clave: "amo", etiqueta: "Moins : cotisation AMO", formato: "moneda" },
    { clave: "ir", etiqueta: "Moins : impôt sur le revenu", formato: "moneda" },
  ],
});
