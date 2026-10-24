import { definirCalculadora } from "@/motor/calculo";
import { cotisationsSalarie, REQ_COTISATIONS, tauxAus, verifierSalaire } from "../lib/salaire";

export default definirCalculadora({
  id: "lu.cotisations-sociales",
  mercado: "lu",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-sociales",
  estado: "publicado",
  requiere: REQ_COTISATIONS,
  campos: [{ id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 5000 }],
  calcular(entrada, valores, { redondear }) {
    verifierSalaire(entrada.brut, "brut");
    const t = tauxAus(valores);
    const c = cotisationsSalarie(entrada.brut, t, redondear);
    return {
      total: c.total,
      maladie: c.maladie,
      pension: c.pension,
      dependance: c.dependance,
      assiette: c.assiette,
      annuel: redondear(c.total * 12),
      part: (c.total / entrada.brut) * 100,
      observaciones: entrada.brut > t.plafond ? ["Maladie et pension ne sont dues que jusqu'au maximum cotisable. La dépendance s'applique sur tout le salaire."] : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Cotisations du salarié par mois", formato: "moneda", destacada: true },
    { clave: "maladie", etiqueta: "Assurance maladie (soins et prestations en espèces)", formato: "moneda" },
    { clave: "pension", etiqueta: "Assurance pension", formato: "moneda" },
    { clave: "dependance", etiqueta: "Assurance dépendance", formato: "moneda" },
    { clave: "assiette", etiqueta: "Assiette maladie et pension (plafonnée)", formato: "moneda" },
    { clave: "annuel", etiqueta: "Cotisations sur douze mois", formato: "moneda" },
    { clave: "part", etiqueta: "Part du salaire brut", formato: "porcentaje", decimales: 2 },
  ],
});
