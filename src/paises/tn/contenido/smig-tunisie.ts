import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tn.smig-tunisie",
  h1: "SMIG en Tunisie",
  title: "SMIG Tunisie 2026 : salaire minimum mensuel et horaire",
  description:
    "Le salaire minimum interprofessionnel garanti en Tunisie dans le secteur non agricole, par mois, par heure et par an, selon le régime de 48 ou de 40 heures.",
  intro: [
    "Le SMIG est le salaire minimum légal des professions non agricoles régies par le code du travail. Il est fixé par décret, séparément pour le régime de 48 heures et pour celui de 40 heures par semaine.",
    "Choisissez votre régime de travail pour voir le SMIG mensuel, horaire et annuel.",
  ],
  comoSeCalcula: [
    "Régime de 48 heures : {{tn.smig-mensuel[regime-48h]}} par mois, soit {{tn.smig-horaire[regime-48h]}} de l'heure.",
    "Régime de 40 heures : {{tn.smig-mensuel[regime-40h]}} par mois, soit {{tn.smig-horaire[regime-40h]}} de l'heure.",
    "Le montant annuel est le SMIG mensuel multiplié par douze.",
  ],
  faq: [
    {
      pregunta: "Quel est le SMIG en Tunisie ?",
      respuesta:
        "{{tn.smig-mensuel[regime-48h]}} par mois pour le régime de 48 heures par semaine et {{tn.smig-mensuel[regime-40h]}} pour le régime de 40 heures, dans les secteurs non agricoles.",
    },
    {
      pregunta: "Le SMIG s'applique-t-il au secteur agricole ?",
      respuesta: "Non. Le secteur agricole a son propre salaire minimum, le SMAG, fixé par jour de travail par un décret distinct.",
    },
  ],
  glosario: [
    { termino: "SMIG", definicion: "Salaire minimum interprofessionnel garanti des secteurs non agricoles." },
    { termino: "SMAG", definicion: "Salaire minimum agricole garanti, fixé par jour." },
  ],
});
