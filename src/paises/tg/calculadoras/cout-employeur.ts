import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisations, NOTE_PLANCHER, REQ_COTISATIONS } from "../lib/cotisations";

export default definirCalculadora({
  id: "tg.cout-employeur",
  mercado: "tg",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: REQ_COTISATIONS,
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut mensuel",
      min: 0,
      porDefecto: 200000,
      ayuda: "Ce qui figure en brut sur le bulletin : salaire de base, primes et avantages en nature.",
    },
    {
      id: "nonSoumis",
      tipo: "moneda",
      etiqueta: "Remboursements de frais et indemnités non soumises",
      min: 0,
      porDefecto: 0,
      ayuda: "Transport ou frais de mission remboursés : ils coûtent à l'entreprise sans cotisation.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisations(entrada.brut, v, redondear);
    const cout = redondear(entrada.brut + c.totalEmployeur + entrada.nonSoumis);
    return {
      cout,
      charges: c.totalEmployeur,
      cnss: c.pensionEmployeur + c.prestationsFamiliales + c.risquesProfessionnels,
      amu: c.amuEmployeur,
      coutAnnuel: redondear(cout * 12),
      pourcentage: Math.round((c.totalEmployeur / entrada.brut) * 10000) / 100,
      observaciones: c.plancher ? [NOTE_PLANCHER] : [],
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût total mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "charges", etiqueta: "Charges patronales", formato: "moneda" },
    { clave: "cnss", etiqueta: "Dont CNSS (pension, famille, risques professionnels)", formato: "moneda" },
    { clave: "amu", etiqueta: "Dont assurance maladie (AMU)", formato: "moneda" },
    { clave: "pourcentage", etiqueta: "Charges patronales en pourcentage du brut", formato: "porcentaje", decimales: 2 },
    { clave: "coutAnnuel", etiqueta: "Coût sur 12 mois", formato: "moneda" },
  ],
});
