import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.taxe-sur-les-assurances",
  h1: "Taxe sur les contrats d'assurance à Madagascar",
  title: "Taxe sur les assurances Madagascar : taux par contrat",
  description: "Calculez la taxe ajoutée à votre prime d'assurance à Madagascar : {{mg.taxe-assurance[autres]}} pour l'auto, {{mg.taxe-assurance[vie]}} pour l'assurance vie, {{mg.taxe-assurance[incendie-autres]}} pour l'incendie.",
  intro: [
    "Chaque contrat d'assurance souscrit à Madagascar supporte une taxe calculée sur la prime : {{mg.taxe-assurance[autres]}} pour la plupart des contrats.",
    "Choisissez le type de contrat et indiquez la prime pour connaître la taxe et le total à payer.",
  ],
  comoSeCalcula: [
    "La taxe porte sur tout ce que l'assureur reçoit : la prime et ses accessoires.",
    "Navigation maritime, fluviale ou aérienne : {{mg.taxe-assurance[navigation]}}. Incendie : {{mg.taxe-assurance[incendie-activite]}} pour les biens d'une activité professionnelle, {{mg.taxe-assurance[incendie-autres]}} pour les autres. Vie : {{mg.taxe-assurance[vie]}}. Rente viagère : {{mg.taxe-assurance[rente-viagere]}}. Autres contrats : {{mg.taxe-assurance[autres]}}.",
    "La taxe se calcule en multipliant la prime hors taxe par le taux du contrat. Elle s'ajoute à la prime : c'est le total qui figure sur l'avis d'échéance et que l'assuré règle. Un contrat qui couvre plusieurs risques peut relever de plusieurs taux ; dans ce cas, ventilez la prime entre les garanties avant de calculer.",
  ],
  ejemplo: ["Une assurance automobile de 500 000 Ar supporte 22 500 Ar de taxe, soit 522 500 Ar au total."],
  faq: [
    { pregunta: "Quel taux pour une assurance automobile ?", respuesta: "{{mg.taxe-assurance[autres]}}, celui des autres assurances, qui couvre aussi la responsabilité civile." },
    {
      pregunta: "Pourquoi l'incendie d'une maison est-il taxé à {{mg.taxe-assurance[incendie-autres]}} ?",
      respuesta: "Le taux réduit de {{mg.taxe-assurance[incendie-activite]}} est réservé aux biens affectés à une activité industrielle, commerciale, agricole, artisanale, minière, touristique ou de transport.",
    },
    { pregunta: "Certains contrats sont-ils exonérés ?", respuesta: "Oui, notamment les réassurances, les contrats contre les accidents du travail et ceux des mutuelles agricoles et des sociétés de secours mutuels approuvées." },
  ],
  glosario: [
    { termino: "Prime hors taxe", definicion: "Prime facturée par l'assureur avant l'ajout de la taxe sur les contrats." },
    { termino: "Prime", definicion: "Somme payée à l'assureur en échange de la garantie." },
    { termino: "Rente viagère", definicion: "Revenu versé à une personne jusqu'à son décès." },
  ],
});
