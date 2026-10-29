import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisationsCnss, REQ_CNSS } from "../lib/cnss";

export default definirCalculadora({
  id: "bj.cotisations-cnss",
  mercado: "bj",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnss",
  estado: "publicado",
  requiere: REQ_CNSS,
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Rémunération brute du mois",
      min: 0,
      porDefecto: 300000,
      ayuda: "L'ensemble des rémunérations perçues par le travailleur, primes et avantages compris.",
    },
    {
      id: "tauxRisques",
      tipo: "porcentaje",
      etiqueta: "Taux risques professionnels de l'entreprise",
      min: 0,
      max: 20,
      porDefecto: 0,
      ayuda: "Le taux notifié par la CNSS selon votre activité. Laissez 0 si vous ne le connaissez pas.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez une rémunération supérieure à zéro.", "brut");
    const c = cotisationsCnss(entrada.brut, entrada.tauxRisques, v, redondear);
    return {
      total: redondear(c.totalSalarie + c.totalEmployeur),
      salarie: c.totalSalarie,
      pensionEmployeur: c.pensionEmployeur,
      prestationsFamiliales: c.prestationsFamiliales,
      risquesProfessionnels: c.risquesProfessionnels,
      employeur: c.totalEmployeur,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total à déclarer à la CNSS", formato: "moneda", destacada: true },
    { clave: "salarie", etiqueta: "Part du salarié (pension, retenue sur le salaire)", formato: "moneda" },
    { clave: "pensionEmployeur", etiqueta: "Pension, part de l'employeur", formato: "moneda" },
    { clave: "prestationsFamiliales", etiqueta: "Prestations familiales", formato: "moneda" },
    { clave: "risquesProfessionnels", etiqueta: "Risques professionnels", formato: "moneda", ocultarSiCero: true },
    { clave: "employeur", etiqueta: "Total part employeur", formato: "moneda" },
  ],
});
