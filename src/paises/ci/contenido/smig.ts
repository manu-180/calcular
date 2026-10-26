import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ci.smig",
  h1: "SMIG en Côte d'Ivoire",
  title: "SMIG Côte d'Ivoire : montant du salaire minimum",
  description: "Le SMIG est de {{ci.smig}} par mois depuis le {{ci.smig#desde}}. Vérifiez si un salaire atteint le minimum légal.",
  intro: [
    "Le salaire minimum interprofessionnel garanti (SMIG) est le plus bas salaire mensuel autorisé pour un emploi à temps plein. Il est de {{ci.smig}} depuis le {{ci.smig#desde}}.",
    "Indiquez un salaire de base. Vous voyez s'il atteint le SMIG et, sinon, combien il manque.",
  ],
  comoSeCalcula: [
    "On compare le salaire mensuel de base au SMIG de {{ci.smig}}.",
    "S'il est plus bas, l'écart est le montant à ajouter pour atteindre le minimum.",
  ],
  ejemplo: ["Un salaire de 60 000 F par mois est sous le SMIG. Il manque 15 000 F pour atteindre {{ci.smig}}."],
  faq: [
    {
      pregunta: "Depuis quand le SMIG est-il à ce montant ?",
      respuesta:
        "Le décret de revalorisation adopté en Conseil des ministres le 21 décembre 2022 l'a porté de 60 000 F à {{ci.smig}}, à partir du {{ci.smig#desde}}.",
    },
    {
      pregunta: "Le SMIG sert-il à autre chose ?",
      respuesta:
        "Oui. La CNPS ne peut pas calculer les cotisations sur moins que le SMIG, et le plafond de la cotisation retraite est un multiple du SMIG.",
    },
    {
      pregunta: "Les minima par catégorie sont-ils les mêmes ?",
      respuesta:
        "Non. Les conventions collectives fixent des salaires minimums par catégorie professionnelle, souvent supérieurs au SMIG. Vérifiez celle de votre secteur.",
    },
  ],
  glosario: [{ termino: "SMIG", definicion: "Salaire minimum interprofessionnel garanti, fixé par décret." }],
});
