import { definirCalculadora } from "@/motor/calculo";
import { CLASSES, cotisationsSalarie, creditsSalarie, escalaRetenue, REQ_COTISATIONS, REQ_RETENUE, retenueMensuelle, tauxAus, verifierSalaire, type Classe } from "../lib/salaire";

export default definirCalculadora({
  id: "lu.salaire-brut-net",
  mercado: "lu",
  concepto: "sueldo-neto",
  slug: "salaire-brut-net",
  estado: "publicado",
  requiere: { ...REQ_COTISATIONS, ...REQ_RETENUE },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 5000 },
    { id: "classe", tipo: "opcion", etiqueta: "Classe d'impôt", opciones: CLASSES, porDefecto: "1" },
  ],
  calcular(entrada, valores, { redondear }) {
    verifierSalaire(entrada.brut, "brut");
    const classe = entrada.classe as Classe;
    const c = cotisationsSalarie(entrada.brut, tauxAus(valores), redondear);
    const r = retenueMensuelle(entrada.brut - c.total, classe, escalaRetenue(classe, valores), valores["lu.fonds-emploi-retenue"]);
    const credits = creditsSalarie(entrada.brut * 12, valores["lu.cis"]);
    const cis = redondear(credits.cis / 12);
    const co2 = redondear(credits.co2 / 12);
    return {
      net: redondear(entrada.brut - c.total - r.retenue + cis + co2),
      maladie: c.maladie,
      pension: c.pension,
      dependance: c.dependance,
      cotisations: c.total,
      imposable: r.base,
      retenue: r.retenue,
      credits: redondear(cis + co2),
      observaciones: [
        "Estimation selon les formules de l'Administration des contributions directes, sans frais de déplacement ni autres déductions inscrits sur la fiche de retenue d'impôt. La fiche de retenue fait foi.",
      ],
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Salaire net mensuel", formato: "moneda", destacada: true },
    { clave: "maladie", etiqueta: "Assurance maladie", formato: "moneda" },
    { clave: "pension", etiqueta: "Assurance pension", formato: "moneda" },
    { clave: "dependance", etiqueta: "Assurance dépendance", formato: "moneda" },
    { clave: "cotisations", etiqueta: "Cotisations sociales", formato: "moneda" },
    { clave: "imposable", etiqueta: "Revenu imposable du mois (arrondi aux 5 euros)", formato: "moneda" },
    { clave: "retenue", etiqueta: "Retenue d'impôt (fonds pour l'emploi compris)", formato: "moneda" },
    { clave: "credits", etiqueta: "Crédits d'impôt CIS et CI-CO2", formato: "moneda", ocultarSiCero: true },
  ],
});
