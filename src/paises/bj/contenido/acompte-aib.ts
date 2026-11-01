import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.acompte-aib",
  h1: "Acompte sur impôt assis sur les bénéfices (AIB) {{anio}} au Bénin",
  title: "Acompte AIB {{anio}} au Bénin : {{bj.aib-taux[ifu]}}, {{bj.aib-taux[services-ifu]}} ou {{bj.aib-taux[sans-ifu]}}",
  description:
    "Calculez l'AIB retenu sur vos achats et prestations au Bénin : {{bj.aib-taux[ifu]}} avec IFU, {{bj.aib-taux[services-ifu]}} pour les services, {{bj.aib-taux[sans-ifu]}} sans IFU.",
  intro: [
    "L'AIB est un acompte de {{bj.aib-taux[ifu]}} à {{bj.aib-taux[sans-ifu]}} sur l'impôt sur les bénéfices que prélèvent l'importation et les achats entre entreprises. Il se calcule sur le prix hors TVA et son taux dépend de l'opération et de l'identifiant fiscal unique, l'IFU.",
    "Choisissez le type d'opération et saisissez le montant. Vous obtenez la base retenue et l'acompte.",
  ],
  comoSeCalcula: [
    "En régime intérieur, l'acompte est perçu sur le prix toutes taxes comprises, à l'exception de la TVA. À l'importation, il porte sur la valeur en douane majorée des droits et taxes, hors TVA (article 132, paragraphe 1).",
    "Le taux est de {{bj.aib-taux[ifu]}} pour les importations de marchandises et les achats ou travaux d'entreprises munies d'un IFU, de {{bj.aib-taux[services-ifu]}} pour les prestations de services d'une personne munie d'un IFU, et de {{bj.aib-taux[sans-ifu]}} sans IFU (article 132, paragraphe 2).",
    "Si vous saisissez un prix TVA comprise, le calculateur retire la TVA de {{bj.tva}} avant d'appliquer le taux.",
  ],
  ejemplo: [
    "Une entreprise achète des marchandises pour 1 000 000 F hors TVA à un fournisseur muni d'un IFU. L'acompte est de 10 000 F à 1 %. Pour une prestation de 590 000 F TVA comprise, la base est de 500 000 F et l'acompte à 3 % est de 15 000 F.",
  ],
  faq: [
    {
      pregunta: "Quels sont les taux de l'AIB au Bénin ?",
      respuesta: "L'article 132 du Code général des impôts retient {{bj.aib-taux[ifu]}}, {{bj.aib-taux[services-ifu]}} ou {{bj.aib-taux[sans-ifu]}} selon l'opération et la détention d'un IFU.",
    },
    {
      pregunta: "L'AIB s'applique-t-il sur la TVA ?",
      respuesta: "Non. L'article 132 exclut la taxe sur la valeur ajoutée de l'assiette, que l'acompte soit perçu à l'importation ou en régime intérieur.",
    },
    {
      pregunta: "Pourquoi le taux est-il plus élevé sans IFU ?",
      respuesta: "Le texte applique {{bj.aib-taux[sans-ifu]}} aux achats, travaux, fournitures et services réalisés par des personnes non immatriculées à l'identifiant fiscal unique, contre {{bj.aib-taux[ifu]}} ou {{bj.aib-taux[services-ifu]}} pour celles qui en ont un.",
    },
  ],
  glosario: [
    { termino: "AIB", definicion: "Acompte sur impôt assis sur les bénéfices, prélevé sur les achats et prestations." },
    { termino: "IFU", definicion: "Identifiant fiscal unique, numéro qui immatricule un contribuable." },
    { termino: "Valeur en douane", definicion: "La valeur d'une marchandise importée retenue pour calculer les droits." },
  ],
});
