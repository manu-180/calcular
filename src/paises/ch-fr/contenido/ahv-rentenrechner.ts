import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-fr.ahv-rentenrechner",
  h1: "Calcul de la rente AVS selon l'échelle 44",
  title: "Calcul rente AVS 2026 : rente de vieillesse et 13e rente",
  description: "Calculer la rente de vieillesse AVS : rente complète selon l'échelle 44 entre {{ch.ahv-minimalrente}} et le double, plafonnement pour les couples et 13e rente.",
  intro: [
    "La rente de vieillesse AVS dépend du revenu annuel moyen déterminant. Pour une durée de cotisation complète, elle s'élève au moins à {{ch.ahv-minimalrente}} et au plus au double par mois.",
    "Depuis 2026, toutes les personnes qui touchent une rente de vieillesse en décembre reçoivent en plus une 13e rente de vieillesse. Le calculateur indique la rente mensuelle, la 13e rente et le montant annuel.",
  ],
  comoSeCalcula: [
    "Le revenu est arrondi à la valeur supérieure de la table des rentes.",
    "Jusqu'à 36 fois la rente minimale : 74 % de la rente minimale plus 13/600 du revenu. Au-delà : 104 % de la rente minimale plus 8/600 du revenu. Le résultat se situe toujours entre la rente minimale et la rente maximale.",
    "Couples : les deux rentes ensemble ne peuvent pas dépasser 150 % de la rente maximale. Sinon, elles sont réduites proportionnellement.",
    "La 13e rente de vieillesse correspond à un douzième de la rente touchée dans l'année et est versée en décembre.",
  ],
  ejemplo: [
    "Un revenu déterminant de 46 268 francs est arrondi à 46 872 francs et donne une rente de 1935 francs par mois. Si l'épouse touche aussi une rente de 1915 francs, les deux rentes sont plafonnées à 3780 francs ensemble : 1900 et 1880 francs.",
  ],
  faq: [
    { pregunta: "À combien s'élève la rente AVS en 2026 ?", respuesta: "Pour une durée de cotisation complète, entre {{ch.ahv-minimalrente}} et le double par mois. Dès le 1er janvier 2027, la rente minimale passe à 1280 francs et la rente maximale à 2560 francs." },
    { pregunta: "Qu'est-ce que le revenu annuel moyen déterminant ?", respuesta: "La moyenne de vos revenus de l'activité lucrative, revalorisés par un facteur tenant compte de l'évolution des salaires, plus d'éventuelles bonifications pour tâches éducatives et d'assistance. Votre caisse de compensation peut vous l'indiquer dans un calcul anticipé de la rente." },
    { pregunta: "Quand ai-je droit à une rente complète ?", respuesta: "Si vous avez autant d'années de cotisation que votre classe d'âge. S'il manque des années, vous touchez une rente partielle, plus basse que le montant de ce calculateur." },
    { pregunta: "À combien s'élève la 13e rente AVS ?", respuesta: "Un douzième de la rente de vieillesse touchée durant l'année civile, arrondi au franc. Elle est versée en décembre avec la rente de décembre." },
  ],
  glosario: [
    { termino: "Échelle 44", definicion: "Table des rentes complètes pour une durée de cotisation complète." },
    { termino: "Plafonnement", definicion: "Limitation des deux rentes de vieillesse d'un couple à 150 % de la rente maximale." },
  ],
});
