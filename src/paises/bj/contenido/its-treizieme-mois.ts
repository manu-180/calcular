import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.its-treizieme-mois",
  h1: "ITS sur le treizième mois {{anio}} au Bénin",
  title: "ITS du treizième mois {{anio}} : atténuation de l'article 126",
  description:
    "Calculez l'impôt sur un treizième mois au Bénin avec la méthode du salaire moyen de l'article 126 et le barème de l'ITS jusqu'à {{bj.its-bareme[-1].tasa}}.",
  intro: [
    "Le taux le plus haut de l'ITS est de {{bj.its-bareme[-1].tasa}}. Un treizième mois versé en une fois ferait grimper le salaire du mois dans les tranches élevées du barème. Le Code général des impôts prévoit donc une atténuation pour les rémunérations exceptionnelles.",
    "Indiquez votre salaire habituel et le montant de la prime. Le résultat compare l'impôt avec l'atténuation et sans elle.",
  ],
  comoSeCalcula: [
    "On calcule l'ITS sur le salaire moyen des douze derniers mois précédant le versement, rémunération exceptionnelle comprise (article 126, paragraphe 3 a).",
    "On multiplie cet impôt moyen par le rapport entre le total perçu dans le mois et le salaire moyen (paragraphe 3 b).",
    "Le calculateur retient onze mois de salaire habituel et le mois du versement, soit un salaire moyen égal au salaire habituel plus un douzième de la prime. Le barème est celui de l'article 125 : {{bj.its-bareme[1].tasa}} entre {{bj.its-bareme[1].desde}} et {{bj.its-bareme[1].hasta}}, jusqu'à {{bj.its-bareme[-1].tasa}} au-delà de {{bj.its-bareme[-1].desde}}.",
    "Les indemnités de fin de carrière et primes de départ volontaire bénéficient en plus d'un abattement de {{bj.its-abattement-exceptionnel}} : elles ne sont pas traitées ici.",
  ],
  ejemplo: [
    "Un salarié gagne 300 000 F et reçoit un treizième mois de 300 000 F. Le salaire moyen est de 325 000 F et l'ITS sur ce salaire de 38 250 F. Multiplié par 600 000 / 325 000, il donne 70 615 F pour le mois, contre 101 500 F si le barème s'appliquait au total du mois. L'atténuation fait gagner 30 885 F.",
  ],
  faq: [
    {
      pregunta: "Quelles rémunérations bénéficient de l'atténuation ?",
      respuesta: "L'article 126 vise les indemnités de fin de carrière, les primes de départ volontaire, les indemnités de préavis et de congés payés lors d'une rupture, et les treizièmes mois et rémunérations assimilées.",
    },
    {
      pregunta: "Quel abattement s'applique à une indemnité de fin de carrière ?",
      respuesta: "L'article 126, paragraphe 3 b, accorde {{bj.its-abattement-exceptionnel}} d'abattement aux indemnités de fin de carrière et primes de départ volontaire.",
    },
    {
      pregunta: "Le résultat est-il exact au franc près ?",
      respuesta: "C'est une estimation. Le texte parle du salaire moyen des douze derniers mois y compris la prime, et votre employeur peut utiliser les salaires réels de chaque mois plutôt qu'un salaire constant.",
    },
  ],
  glosario: [
    { termino: "Rémunération exceptionnelle", definicion: "Un versement hors paie ordinaire : treizième mois, prime de départ, indemnité de fin de carrière." },
    { termino: "Salaire moyen", definicion: "La moyenne des salaires des douze derniers mois, prime comprise." },
    { termino: "Atténuation", definicion: "Le mécanisme qui évite de taxer la prime au taux des tranches élevées." },
  ],
});
