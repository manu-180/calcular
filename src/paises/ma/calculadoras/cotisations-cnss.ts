import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisations, REQ_CNSS } from "../lib/cnss";

export default definirCalculadora({
  id: "ma.cotisations-cnss",
  mercado: "ma",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnss",
  estado: "borrador",
  requiere: REQ_CNSS,
  campos: [{ id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 10000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisations(entrada.brut, v, redondear);
    return { salarie: c.salarie, cnss: c.salarieCnss, amo: c.salarieAmo, employeur: c.employeur };
  },
  resultado: [
    { clave: "salarie", etiqueta: "Cotisations retenues sur le salaire", formato: "moneda", destacada: true },
    { clave: "cnss", etiqueta: "Dont prestations sociales CNSS", formato: "moneda" },
    { clave: "amo", etiqueta: "Dont assurance maladie obligatoire", formato: "moneda" },
    { clave: "employeur", etiqueta: "Cotisations à la charge de l'employeur", formato: "moneda" },
  ],
});
