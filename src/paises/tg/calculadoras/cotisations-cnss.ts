import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisations, NOTE_PLANCHER, REQ_COTISATIONS } from "../lib/cotisations";

export default definirCalculadora({
  id: "tg.cotisations-cnss",
  mercado: "tg",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnss",
  estado: "publicado",
  requiere: REQ_COTISATIONS,
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Rémunération brute du mois",
      min: 0,
      porDefecto: 200000,
      ayuda: "Salaire, primes, indemnités et avantages en nature, sans les remboursements de frais ni les prestations familiales.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "brut");
    const c = cotisations(entrada.brut, v, redondear);
    return {
      total: c.totalSalarie + c.totalEmployeur,
      assiette: c.assiette,
      pensionSalarie: c.pensionSalarie,
      amuSalarie: c.amuSalarie,
      totalSalarie: c.totalSalarie,
      pensionEmployeur: c.pensionEmployeur,
      prestationsFamiliales: c.prestationsFamiliales,
      risquesProfessionnels: c.risquesProfessionnels,
      amuEmployeur: c.amuEmployeur,
      totalEmployeur: c.totalEmployeur,
      observaciones: c.plancher ? [NOTE_PLANCHER] : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total versé à la CNSS pour le mois", formato: "moneda", destacada: true },
    { clave: "assiette", etiqueta: "Assiette des cotisations", formato: "moneda" },
    { clave: "pensionSalarie", etiqueta: "Pension de vieillesse, part du travailleur", formato: "moneda" },
    { clave: "amuSalarie", etiqueta: "Assurance maladie, part du travailleur", formato: "moneda" },
    { clave: "totalSalarie", etiqueta: "Total retenu sur le salaire", formato: "moneda" },
    { clave: "pensionEmployeur", etiqueta: "Pension de vieillesse, part de l'employeur", formato: "moneda" },
    { clave: "prestationsFamiliales", etiqueta: "Prestations familiales", formato: "moneda" },
    { clave: "risquesProfessionnels", etiqueta: "Risques professionnels", formato: "moneda" },
    { clave: "amuEmployeur", etiqueta: "Assurance maladie, part de l'employeur", formato: "moneda" },
    { clave: "totalEmployeur", etiqueta: "Total à la charge de l'employeur", formato: "moneda" },
  ],
});
