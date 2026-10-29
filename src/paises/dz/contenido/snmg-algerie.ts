import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.snmg-algerie",
  h1: "SNMG en Algérie : le salaire minimum en {{anio}}",
  title: "SNMG Algérie {{anio}} : salaire minimum de {{dz.snmg}}",
  description:
    "Le salaire national minimum garanti est de {{dz.snmg}} par mois depuis le {{dz.snmg#desde}}, soit {{dz.snmg-horaire}} de l'heure. Calculez-le selon vos heures.",
  intro: [
    "Le salaire national minimum garanti (SNMG) est fixé par décret présidentiel. Depuis le {{dz.snmg#desde}}, il s'élève à {{dz.snmg}} par mois pour la durée légale de {{dz.duree-legale}} par semaine.",
    "Indiquez vos heures hebdomadaires pour connaître le minimum qui vous revient et, si vous le voulez, comparez-le à votre salaire de base.",
  ],
  comoSeCalcula: [
    "Temps plein : {{dz.snmg}} par mois, pour {{dz.heures-mensuelles}} de travail.",
    "Taux horaire fixé par le décret : {{dz.snmg-horaire}}.",
    "Temps partiel : le minimum est proportionnel aux heures, soit {{dz.snmg}} × heures par semaine ÷ {{dz.duree-legale}}.",
  ],
  faq: [
    {
      pregunta: "Quel est le montant du SNMG en 2026 ?",
      respuesta: "{{dz.snmg}} par mois, selon le décret présidentiel n° 26-01 du 7 janvier 2026, applicable depuis le {{dz.snmg#desde}}.",
    },
    {
      pregunta: "Combien fait le SNMG en net ?",
      respuesta:
        "Le travailleur paie la cotisation de sécurité sociale sur ce montant. Le salaire imposable reste sous le seuil d'exonération de l'IRG. Le calcul du salaire net donne le montant exact.",
    },
    {
      pregunta: "Quel était le SNMG avant 2026 ?",
      respuesta: "Il était fixé par le décret présidentiel n° 21-137 du 7 avril 2021, que le décret de 2026 abroge et remplace.",
    },
  ],
  glosario: [
    { termino: "SNMG", definicion: "Salaire national minimum garanti, fixé par décret présidentiel." },
    { termino: "Durée légale", definicion: "Durée hebdomadaire normale du travail, fixée par l'ordonnance n° 97-03 du 11 janvier 1997." },
  ],
});
