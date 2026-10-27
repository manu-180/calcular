import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.smig",
  h1: "SMIG au Burkina Faso : vérifier un salaire",
  title: "SMIG Burkina Faso : montant mensuel et horaire",
  description:
    "Le SMIG est de {{bf.smig}} par mois et {{bf.smig-horaire}} de l'heure. Vérifiez si un salaire atteint le minimum pour vos heures de travail.",
  intro: [
    "Le salaire minimum interprofessionnel garanti (SMIG) est le plancher de rémunération des salariés, hors exploitations agricoles et apprentis.",
    "Indiquez le salaire et les heures par semaine. Vous savez s'il atteint le SMIG et, sinon, combien il manque.",
  ],
  comoSeCalcula: [
    "Le SMIG mensuel est de {{bf.smig}} et le SMIG horaire de {{bf.smig-horaire}}.",
    "Pour un horaire plus court, le minimum suit le SMIG au prorata des heures. Le salaire horaire se calcule sur 52 semaines réparties en 12 mois.",
    "La durée légale du travail est de {{bf.duree-legale}} par semaine : à temps plein, le minimum mensuel est le SMIG.",
  ],
  ejemplo: ["Un salaire de 40 000 F pour 40 heures par semaine est inférieur au SMIG : il manque 5 000 F."],
  faq: [
    {
      pregunta: "Le SMIG vaut-il pour les exploitations agricoles ?",
      respuesta: "Non. Le décret fixe le SMIG pour les emplois autres que ceux des exploitations agricoles, et il ne s'applique pas aux contrats d'apprentissage.",
    },
    {
      pregunta: "Le SMIG sert-il pour les cotisations sociales ?",
      respuesta: "Oui. Selon la CNSS, le salaire qui sert au calcul des cotisations ne peut jamais être inférieur au SMIG en vigueur.",
    },
    {
      pregunta: "Quel est le SMIG horaire ?",
      respuesta: "{{bf.smig-horaire}} de l'heure, fixé par le même décret que le SMIG mensuel de {{bf.smig}}.",
    },
  ],
  glosario: [
    { termino: "SMIG", definicion: "Salaire minimum interprofessionnel garanti, fixé par décret." },
    { termino: "Durée légale", definicion: "Le nombre d'heures par semaine au-delà duquel les heures sont supplémentaires." },
  ],
});
