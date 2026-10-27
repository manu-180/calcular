import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.droits-de-donation",
  h1: "Calcul des droits de donation",
  title: "Droits de donation {{anio}} : abattements et calcul",
  description:
    "Calculez les droits à payer sur une donation : abattement de {{fr.abattement-ligne-directe}} pour un enfant, {{fr.abattement-don-epoux}} entre époux, barème selon le lien de parenté.",
  intro: [
    "Une donation est taxée après un abattement qui dépend du lien entre le donateur et la personne qui reçoit. L'abattement se reconstitue tous les 15 ans.",
    "Entre un parent et son enfant, chacun des parents peut donner jusqu'à {{fr.abattement-ligne-directe}} sans droits à payer.",
  ],
  comoSeCalcula: [
    "Abattements : {{fr.abattement-ligne-directe}} pour un enfant ou un ascendant, {{fr.abattement-don-petit-enfant}} pour un petit-enfant, {{fr.abattement-don-arriere-petit-enfant}} pour un arrière-petit-enfant, {{fr.abattement-don-epoux}} entre époux ou partenaires de Pacs, {{fr.abattement-freres-soeurs}} entre frères et sœurs, {{fr.abattement-neveux}} pour un neveu ou une nièce.",
    "Retirez la part de l'abattement déjà utilisée par des donations du même donateur depuis moins de 15 ans.",
    "Barème : progressif de 5 % à 45 % en ligne directe et entre époux, 35 % puis 45 % entre frères et sœurs, {{fr.droits-4e-degre}} jusqu'au 4e degré, {{fr.droits-non-parents}} au-delà.",
  ],
  ejemplo: [
    "Un parent donne 200 000 € à son enfant. Après l'abattement de 100 000 €, les droits sur les 100 000 € restants sont de 18 194,35 €.",
  ],
  faq: [
    {
      pregunta: "Tous les combien de temps peut-on donner sans droits ?",
      respuesta: "Les abattements se reconstituent tous les 15 ans. Une donation faite il y a plus de 15 ans n'est plus prise en compte.",
    },
    {
      pregunta: "Les deux parents ont-ils chacun un abattement ?",
      respuesta: "Oui. L'abattement s'applique pour chaque donateur et chaque bénéficiaire : un enfant peut recevoir {{fr.abattement-ligne-directe}} de son père et autant de sa mère.",
    },
    {
      pregunta: "Existe-t-il d'autres exonérations ?",
      respuesta: "Oui, notamment pour certains dons de sommes d'argent à un enfant ou un petit-enfant, sous conditions d'âge. Elles s'ajoutent aux abattements présentés ici.",
    },
  ],
  glosario: [
    { termino: "Donation", definicion: "Transmission gratuite d'un bien de son vivant." },
    { termino: "Abattement", definicion: "Part de la donation qui n'est pas taxée." },
    { termino: "Rappel fiscal", definicion: "Prise en compte des donations des 15 dernières années pour calculer l'abattement restant." },
  ],
});
