import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisationsCnss, REQ_CNSS } from "../lib/paie";

export default definirCalculadora({
  id: "bf.cotisations-cnss",
  mercado: "bf",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnss",
  estado: "publicado",
  requiere: { ...REQ_CNSS, "bf.cnss-assurance-volontaire": "numero" },
  campos: [
    {
      id: "remuneration",
      tipo: "moneda",
      etiqueta: "Rémunération brute du mois",
      min: 0,
      porDefecto: 150000,
      ayuda: "Salaire, primes, indemnités et avantages en nature, sans les remboursements de frais ni les prestations familiales.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.remuneration <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "remuneration");
    const c = cotisationsCnss(entrada.remuneration, v, redondear);
    return {
      salarie: c.vieillesseSalarie,
      employeur: c.totalEmployeur,
      vieillesseEmployeur: c.vieillesseEmployeur,
      prestationsFamiliales: c.prestationsFamiliales,
      risquesProfessionnels: c.risquesProfessionnels,
      total: redondear(c.vieillesseSalarie + c.totalEmployeur),
      assiette: c.assiette,
    };
  },
  resultado: [
    { clave: "salarie", etiqueta: "Part du travailleur (retenue sur le salaire)", formato: "moneda", destacada: true },
    { clave: "employeur", etiqueta: "Part de l'employeur", formato: "moneda" },
    { clave: "vieillesseEmployeur", etiqueta: "Dont assurance vieillesse", formato: "moneda" },
    { clave: "prestationsFamiliales", etiqueta: "Dont prestations familiales", formato: "moneda" },
    { clave: "risquesProfessionnels", etiqueta: "Dont risques professionnels", formato: "moneda" },
    { clave: "total", etiqueta: "Total versé à la CNSS", formato: "moneda" },
    { clave: "assiette", etiqueta: "Assiette des cotisations", formato: "moneda" },
  ],
});
