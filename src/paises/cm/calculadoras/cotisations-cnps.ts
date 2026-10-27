import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cotisationsCnps, REQ_CNPS } from "../lib/cnps";

export default definirCalculadora({
  id: "cm.cotisations-cnps",
  mercado: "cm",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnps",
  estado: "publicado",
  requiere: REQ_CNPS,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 300000 },
    { id: "regime", tipo: "opcion-dato", etiqueta: "Régime de prestations familiales", dato: "cm.cnps-prestations-familiales", porDefecto: "general" },
    {
      id: "groupe",
      tipo: "opcion-dato",
      etiqueta: "Groupe de risque de l'entreprise",
      dato: "cm.cnps-accidents-travail",
      porDefecto: "a",
      ayuda: "Le groupe dépend de l'activité de l'entreprise. Il figure sur ses déclarations à la CNPS.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const c = cotisationsCnps(entrada.brut, entrada.regime, entrada.groupe, v, redondear);
    return { ...c, total: c.totalSalarie + c.totalEmployeur };
  },
  resultado: [
    { clave: "totalSalarie", etiqueta: "Retenue CNPS du salarié", formato: "moneda", destacada: true },
    { clave: "pensionEmployeur", etiqueta: "Pension vieillesse, part patronale", formato: "moneda" },
    { clave: "prestationsFamiliales", etiqueta: "Prestations familiales (employeur)", formato: "moneda" },
    { clave: "accidentsTravail", etiqueta: "Accidents du travail (employeur)", formato: "moneda" },
    { clave: "totalEmployeur", etiqueta: "Total à la charge de l'employeur", formato: "moneda" },
    { clave: "total", etiqueta: "Total versé à la CNPS", formato: "moneda" },
    { clave: "basePlafonnee", etiqueta: "Salaire retenu pour la pension et les prestations familiales", formato: "moneda" },
  ],
});
