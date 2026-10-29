import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.opzeggingstermijn-berekenen",
  h1: "Calcul du délai de préavis selon le statut unique",
  title: "Calcul du préavis {{anio}} : licenciement et démission",
  description:
    "Calculez votre délai de préavis en semaines en cas de licenciement, de démission ou de contre-préavis, avec les règles en vigueur depuis le 1er août {{anio}}.",
  intro: [
    "Depuis le statut unique, ouvriers et employés ont les mêmes délais de préavis. Le délai dépend de votre ancienneté et de la partie qui met fin au contrat.",
    "Indiquez votre date d'entrée en service et la date de notification du préavis. Vous voyez le délai en semaines, quand il commence et quand il se termine.",
  ],
  comoSeCalcula: [
    "Le délai de préavis prend cours le lundi suivant la semaine pendant laquelle le préavis a été notifié. Nous calculons l'ancienneté à ce lundi.",
    "Licenciement par l'employeur : un tableau fixe jusqu'à cinq ans d'ancienneté, par exemple {{be.opzegging-werkgever[m-24]}} semaines à partir de deux ans. Ensuite, des semaines s'ajoutent par année d'ancienneté entamée.",
    "Démission : un délai plus court, avec un maximum de {{be.opzegging-werknemer[m-96]}} semaines à partir de huit ans d'ancienneté.",
    "Contre-préavis : si vous êtes licencié et trouvez un autre emploi, vous pouvez partir avec un préavis réduit, de {{be.opzegging-werknemer[t-12]}} semaines au maximum.",
  ],
  ejemplo: [
    "Vous travaillez depuis le 1er janvier 2020 et votre employeur notifie le préavis le mercredi 14 octobre 2026. Le délai prend cours le lundi 19 octobre. Avec 6 ans et 9 mois d'ancienneté, il est de 21 semaines.",
  ],
  faq: [
    {
      pregunta: "Qu'est-ce qui a changé le 1er août 2026 ?",
      respuesta:
        "Les délais de préavis des cinq premières années ont été adaptés, tant en cas de licenciement par l'employeur qu'en cas de démission. En cas de licenciement, le délai est désormais de {{be.opzegging-werkgever[m-0]}} semaine pendant les six premiers mois.",
    },
    {
      pregunta: "Le délai de préavis a-t-il un maximum ?",
      respuesta:
        "Pour les contrats dont l'exécution débute à partir du 1er juin 2026, le délai en cas de licenciement par l'employeur est de {{be.opzegging-werkgever[plafond-nieuwe-contracten]}} semaines à partir de 17 ans d'ancienneté et n'augmente plus. Pour les contrats plus anciens, il continue à augmenter.",
    },
    {
      pregunta: "Une convention collective peut-elle fixer d'autres délais ?",
      respuesta: "Non. Une convention collective de travail conclue en commission paritaire ne peut pas déroger aux délais de préavis de la loi.",
    },
  ],
  glosario: [
    { termino: "Ancienneté", definicion: "La période pendant laquelle vous êtes resté sans interruption au service de la même entreprise." },
    { termino: "Contre-préavis", definicion: "Un préavis réduit donné par un travailleur licencié qui a trouvé un autre emploi." },
    { termino: "Statut unique", definicion: "Le régime de 2014 qui aligne les délais de préavis des ouvriers et des employés." },
  ],
});
