import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisations, NOTE_PLANCHER, REQ_COTISATIONS } from "../lib/cotisations";
import { irppAnnuel, REQ_IRPP } from "../lib/irpp";

export default definirCalculadora({
  id: "tg.calcul-salaire-net",
  mercado: "tg",
  concepto: "sueldo-neto",
  slug: "calcul-salaire-net",
  estado: "publicado",
  requiere: { ...REQ_IRPP, ...REQ_COTISATIONS },
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut mensuel",
      min: 0,
      porDefecto: 200000,
      ayuda: "Salaire de base, primes, indemnités imposables et avantages en nature du mois.",
    },
    {
      id: "personnes",
      tipo: "entero",
      etiqueta: "Personnes à charge",
      min: 0,
      max: 20,
      porDefecto: 0,
      ayuda: "Conjoint sans ressources, enfants de moins de 21 ans (25 ans s'ils étudient), parents invalides vivant chez vous.",
    },
    {
      id: "nonImposable",
      tipo: "moneda",
      etiqueta: "Indemnités non imposables du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Allocations pour frais réellement utilisées pour l'emploi. Elles s'ajoutent au net sans impôt ni cotisation.",
    },
    {
      id: "autres",
      tipo: "moneda",
      etiqueta: "Autres retenues du mois",
      min: 0,
      porDefecto: 0,
      ayuda: "Avance sur salaire, prêt, cotisation syndicale : ce qui figure en plus sur votre bulletin.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisations(entrada.brut, v, redondear);
    const impot = irppAnnuel(entrada.brut * 12, c.pensionSalarie * 12, c.amuSalarie * 12, entrada.personnes, v, redondear);
    const irpp = redondear(impot.impot / 12);
    const net = redondear(entrada.brut - c.pensionSalarie - c.amuSalarie - irpp - entrada.autres + entrada.nonImposable);
    if (net < 0) throw new ErrorEntrada("Les retenues dépassent le salaire du mois.", "autres");
    return {
      net,
      irpp,
      cnss: c.pensionSalarie,
      amu: c.amuSalarie,
      autres: entrada.autres,
      nonImposable: entrada.nonImposable,
      netAnnuel: redondear(net * 12),
      observaciones: c.plancher ? [NOTE_PLANCHER] : [],
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net à payer", formato: "moneda", destacada: true },
    { clave: "irpp", etiqueta: "IRPP retenu", formato: "moneda" },
    { clave: "cnss", etiqueta: "Cotisation retraite CNSS", formato: "moneda" },
    { clave: "amu", etiqueta: "Cotisation assurance maladie (AMU)", formato: "moneda" },
    { clave: "autres", etiqueta: "Autres retenues", formato: "moneda", ocultarSiCero: true },
    { clave: "nonImposable", etiqueta: "Indemnités non imposables ajoutées", formato: "moneda", ocultarSiCero: true },
    { clave: "netAnnuel", etiqueta: "Net sur 12 mois", formato: "moneda" },
  ],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "net", periodoNeto: "mes" },
});
