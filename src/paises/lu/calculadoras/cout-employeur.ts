import { definirCalculadora } from "@/motor/calculo";
import { verifierSalaire } from "../lib/salaire";

export default definirCalculadora({
  id: "lu.cout-employeur",
  mercado: "lu",
  concepto: "costo-empleador",
  slug: "cout-employeur",
  estado: "publicado",
  requiere: {
    "lu.cotisation-maladie-soins": "numero",
    "lu.cotisation-maladie-especes": "numero",
    "lu.cotisation-pension": "numero",
    "lu.cotisation-accident": "numero",
    "lu.cotisation-sante-travail": "numero",
    "lu.cotisation-mutualite": "mapa",
    "lu.plafond-cotisable": "numero",
  },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Salaire brut mensuel", min: 0, porDefecto: 5000 },
    { id: "mutualite", tipo: "opcion-dato", etiqueta: "Classe de la Mutualité des employeurs", dato: "lu.cotisation-mutualite", porDefecto: "classe-1", ayuda: "Les taux 2026 de chaque classe sont publiés par le CCSS." },
  ],
  calcular(entrada, valores, { redondear }) {
    verifierSalaire(entrada.brut, "brut");
    const assiette = Math.min(entrada.brut, valores["lu.plafond-cotisable"]);
    const p = (taux: number) => redondear((assiette * taux) / 100);
    const maladie = p((valores["lu.cotisation-maladie-soins"] + valores["lu.cotisation-maladie-especes"]) / 2);
    const pension = p(valores["lu.cotisation-pension"] / 2);
    const accident = p(valores["lu.cotisation-accident"]);
    const sante = p(valores["lu.cotisation-sante-travail"]);
    const mutualite = p(valores["lu.cotisation-mutualite"][entrada.mutualite] ?? 0);
    const charges = redondear(maladie + pension + accident + sante + mutualite);
    return {
      cout: redondear(entrada.brut + charges),
      charges,
      maladie,
      pension,
      accident,
      sante,
      mutualite,
      annuel: redondear((entrada.brut + charges) * 12),
      observaciones: ["Le taux d'assurance accident est multiplié par un facteur bonus-malus propre à l'entreprise. Le calcul utilise le taux unique."],
    };
  },
  resultado: [
    { clave: "cout", etiqueta: "Coût mensuel pour l'employeur", formato: "moneda", destacada: true },
    { clave: "charges", etiqueta: "Charges patronales", formato: "moneda" },
    { clave: "maladie", etiqueta: "Assurance maladie (part patronale)", formato: "moneda" },
    { clave: "pension", etiqueta: "Assurance pension (part patronale)", formato: "moneda" },
    { clave: "accident", etiqueta: "Assurance accident", formato: "moneda" },
    { clave: "sante", etiqueta: "Santé au travail", formato: "moneda" },
    { clave: "mutualite", etiqueta: "Mutualité des employeurs", formato: "moneda" },
    { clave: "annuel", etiqueta: "Coût sur douze mois", formato: "moneda" },
  ],
});
