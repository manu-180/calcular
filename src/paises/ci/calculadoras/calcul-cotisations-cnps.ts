import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisationsCnps, REQ_CNPS } from "../lib/cnps";

export default definirCalculadora({
  id: "ci.calcul-cotisations-cnps",
  mercado: "ci",
  concepto: "aportes-seguridad-social",
  slug: "calcul-cotisations-cnps",
  estado: "publicado",
  requiere: REQ_CNPS,
  campos: [
    {
      id: "brut",
      tipo: "moneda",
      etiqueta: "Salaire brut mensuel soumis à cotisation",
      min: 0,
      porDefecto: 300000,
      ayuda: "Salaire, primes et avantages en nature. Les remboursements de frais n'entrent pas dans la base.",
    },
    {
      id: "tauxAt",
      tipo: "porcentaje",
      etiqueta: "Taux accidents du travail de l'entreprise",
      min: 0,
      max: 10,
      porDefecto: 2,
      ayuda: "La CNPS le fixe selon le secteur d'activité et le communique à l'employeur lors de son immatriculation.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisationsCnps(entrada.brut, entrada.tauxAt, v, redondear);
    const observaciones: string[] = [];
    if (entrada.brut < v["ci.smig"]) {
      observaciones.push("Pour un emploi à temps plein, la base des cotisations ne peut pas être inférieure au SMIG.");
    }
    return { ...c, total: redondear(c.totalSalarie + c.totalEmployeur), observaciones };
  },
  resultado: [
    { clave: "totalSalarie", etiqueta: "Retenue du salarié (retraite)", formato: "moneda", destacada: true },
    { clave: "totalEmployeur", etiqueta: "Cotisations à la charge de l'employeur", formato: "moneda" },
    { clave: "retraiteEmployeur", etiqueta: "Retraite, part patronale", formato: "moneda" },
    { clave: "prestationsFamiliales", etiqueta: "Prestations familiales", formato: "moneda" },
    { clave: "maternite", etiqueta: "Assurance maternité", formato: "moneda" },
    { clave: "accidentTravail", etiqueta: "Accidents du travail", formato: "moneda" },
    { clave: "total", etiqueta: "Total versé à la CNPS", formato: "moneda" },
    { clave: "baseRetraite", etiqueta: "Base de la retraite", formato: "moneda" },
    { clave: "basePrestations", etiqueta: "Base des autres branches", formato: "moneda" },
    { clave: "plafondRetraite", etiqueta: "Plafond mensuel de la retraite", formato: "moneda" },
  ],
});
