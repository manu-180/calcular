import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mg.droits-de-donation",
  h1: "Droits de donation à Madagascar",
  title: "Droits de donation à Madagascar : enfants et autres",
  description: "Calculez les droits sur une donation entre vifs à Madagascar : {{mg.droit-donation-ligne-directe}} par enfant, {{mg.droit-donation}} de la valeur pour les autres bénéficiaires.",
  intro: [
    "Une donation entre vifs s'enregistre au service des impôts contre un droit.",
    "Le montant dépend du lien entre le donateur et le bénéficiaire.",
  ],
  comoSeCalcula: [
    "En ligne directe descendante (enfants, petits-enfants), le droit est fixe : {{mg.droit-donation-ligne-directe}} par bénéficiaire, quelle que soit la valeur donnée.",
    "Pour tout autre bénéficiaire, le droit est de {{mg.droit-donation}} de la valeur des biens.",
  ],
  ejemplo: ["Un terrain de 20 000 000 Ar donné à un neveu : 1 000 000 Ar de droits. Donné à un enfant : 40 000 Ar."],
  faq: [
    {
      pregunta: "Et pour une succession ?",
      respuesta: "La perception des droits sur les déclarations de succession et les partages issus d'une succession est suspendue par le Code des impôts. Les démarches restent obligatoires.",
    },
    {
      pregunta: "Le droit fixe vaut-il pour un don à un parent ?",
      respuesta: "Non. Le droit fixe ne vaut que vers les descendants. Un don à un père, une mère ou un conjoint paie {{mg.droit-donation}} de la valeur.",
    },
    {
      pregunta: "Un don à une fondation est-il taxé ?",
      respuesta: "Les legs de bienfaisance aux organismes reconnus d'utilité publique par décret sont exemptés.",
    },
  ],
  glosario: [
    { termino: "Donation entre vifs", definicion: "Don d'un bien fait de son vivant, par acte." },
    { termino: "Ligne directe descendante", definicion: "Les enfants, petits-enfants et arrière-petits-enfants." },
  ],
});
