import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { cotisationsCnps, REQ_CNPS } from "../lib/cnps";

export default definirCalculadora({
  id: "ci.cout-employeur",
  mercado: "ci",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: { ...REQ_CNPS, "ci.contribution-employeur": "mapa", "ci.taxe-apprentissage": "numero" },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 300000 },
    { id: "personnel", tipo: "opcion-dato", dato: "ci.contribution-employeur", etiqueta: "Catégorie du salarié", porDefecto: "local" },
    {
      id: "tauxAt",
      tipo: "porcentaje",
      etiqueta: "Taux accidents du travail de l'entreprise",
      min: 0,
      max: 10,
      porDefecto: 2,
      ayuda: "Fixé par la CNPS selon le secteur d'activité.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Indiquez un salaire brut supérieur à zéro.", "brut");
    const cnps = cotisationsCnps(entrada.brut, entrada.tauxAt, v, redondear);
    const contribution = redondear(porcentaje(entrada.brut, enMapa(v["ci.contribution-employeur"], entrada.personnel)));
    const apprentissage = redondear(porcentaje(entrada.brut, v["ci.taxe-apprentissage"]));
    const charges = redondear(cnps.totalEmployeur + contribution + apprentissage);
    const cout = redondear(entrada.brut + charges);
    return {
      cout,
      charges,
      cnps: cnps.totalEmployeur,
      contribution,
      apprentissage,
      tauxCharges: redondear((charges / entrada.brut) * 10000) / 100,
      coutAnnuel: redondear(cout * 12),
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "charges", etiqueta: "Charges patronales", formato: "moneda" },
    { clave: "cnps", etiqueta: "Cotisations CNPS patronales", formato: "moneda" },
    { clave: "contribution", etiqueta: "Contribution à la charge des employeurs", formato: "moneda", ocultarSiCero: true },
    { clave: "apprentissage", etiqueta: "Taxe d'apprentissage", formato: "moneda" },
    { clave: "tauxCharges", etiqueta: "Charges en pourcentage du brut", formato: "porcentaje", decimales: 2 },
    { clave: "coutAnnuel", etiqueta: "Coût sur 12 mois", formato: "moneda" },
  ],
});
