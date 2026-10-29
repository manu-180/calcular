import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

const AVEC_BASE = ["mutation-totale", "immatriculation-habitat", "immatriculation-activite", "mutation-titre", "superficie", "hypotheque", "autre-droit-reel", "morcellement"] as const;

export default definirCalculadora({
  id: "ne.droits-conservation-fonciere",
  mercado: "ne",
  concepto: "propio",
  slug: "droits-conservation-fonciere",
  estado: "publicado",
  requiere: { "ne.foncier-taux": "mapa", "ne.foncier-fixes": "mapa" },
  campos: [
    {
      id: "operation",
      tipo: "opcion",
      etiqueta: "Formalité foncière",
      opciones: [
        { valor: "mutation-totale", etiqueta: "Mutation totale de propriété d'un terrain" },
        { valor: "immatriculation-habitat", etiqueta: "Concession définitive : immatriculation en zone d'habitat" },
        { valor: "immatriculation-activite", etiqueta: "Concession définitive : immatriculation en zone industrielle ou commerciale" },
        { valor: "mutation-titre", etiqueta: "Mutation du titre de propriété d'un terrain concédé" },
        { valor: "superficie", etiqueta: "Inscription d'un droit de superficie" },
        { valor: "hypotheque", etiqueta: "Hypothèque conventionnelle ou forcée" },
        { valor: "autre-droit-reel", etiqueta: "Autre droit réel inscrit sur le titre foncier" },
        { valor: "morcellement", etiqueta: "Morcellement d'un titre foncier" },
        { valor: "mainlevee", etiqueta: "Mainlevée d'hypothèque (droit fixe)" },
        { valor: "radiation", etiqueta: "Radiation d'un autre droit réel (droit fixe)" },
        { valor: "duplicata", etiqueta: "Duplicata de titre foncier (droit fixe)" },
        { valor: "papier-volant", etiqueta: "Confirmation d'un droit réel sur papier volant (droit fixe)" },
        { valor: "certificat", etiqueta: "Certificat de propriété sur imprimé (droit fixe)" },
        { valor: "plan", etiqueta: "Plan de situation ou renseignements (droit fixe)" },
      ],
      porDefecto: "mutation-totale",
    },
    {
      id: "montant",
      tipo: "moneda",
      etiqueta: "Base de calcul",
      min: 0,
      requerido: false,
      porDefecto: 10000000,
      visibleSi: { operation: ["mutation-totale", "immatriculation-habitat", "immatriculation-activite", "mutation-titre", "superficie", "hypotheque", "autre-droit-reel", "morcellement"] },
      ayuda: "Prix du terrain, mise en valeur, somme garantie ou somme stipulée, selon la formalité.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if ((AVEC_BASE as readonly string[]).includes(entrada.operation ?? "")) {
      if (entrada.montant === null || entrada.montant <= 0) throw new ErrorEntrada("Indiquez un montant supérieur à zéro.", "montant");
      const taux = enMapa(v["ne.foncier-taux"], entrada.operation);
      return { droit: redondear(porcentaje(entrada.montant, taux)), taux, fixe: false };
    }
    return { droit: redondear(enMapa(v["ne.foncier-fixes"], entrada.operation)), taux: null, fixe: true };
  },
  resultado: [
    { clave: "droit", etiqueta: "Droit à payer", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "Taux appliqué", formato: "porcentaje", decimales: 1 },
  ],
});
