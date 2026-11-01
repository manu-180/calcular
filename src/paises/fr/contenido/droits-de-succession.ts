import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.droits-de-succession",
  h1: "Calcul des droits de succession",
  title: "Droits de succession {{anio}} : abattements et barème",
  description:
    "Calculez les droits de succession sur votre part d'héritage : abattement de {{fr.abattement-ligne-directe}} par enfant, barème progressif de 5 % à 45 % et autres liens de parenté.",
  intro: [
    "Chaque héritier paie des droits sur sa propre part de la succession, après un abattement qui dépend de son lien avec le défunt.",
    "Entre parents et enfants, l'abattement est de {{fr.abattement-ligne-directe}} et le barème va de 5 % à 45 %. L'époux et le partenaire de Pacs ne paient rien.",
  ],
  comoSeCalcula: [
    "Partez de votre part nette de la succession (biens moins dettes et frais déductibles).",
    "Retirez l'abattement : {{fr.abattement-ligne-directe}} pour un enfant ou un parent, {{fr.abattement-freres-soeurs}} pour un frère ou une sœur, {{fr.abattement-neveux}} pour un neveu ou une nièce, {{fr.abattement-succession-defaut}} dans les autres cas. S'y ajoutent {{fr.abattement-handicap}} pour une personne en situation de handicap.",
    "Appliquez le barème : progressif de 5 % à 45 % en ligne directe, 35 % puis 45 % entre frères et sœurs, {{fr.droits-4e-degre}} jusqu'au 4e degré, {{fr.droits-non-parents}} au-delà ou sans lien de parenté.",
  ],
  ejemplo: [
    "Un enfant hérite de 150 000 €. Après l'abattement de 100 000 €, 50 000 € sont taxables : 5 % jusqu'à 8 072 €, 10 % jusqu'à 12 109 €, 15 % jusqu'à 15 932 € et 20 % au-delà. Les droits sont de 8 194,35 €.",
  ],
  faq: [
    {
      pregunta: "L'abattement de 100 000 € s'applique-t-il pour chaque parent ?",
      respuesta: "Oui. Chaque enfant en bénéficie au décès de son père, puis à nouveau au décès de sa mère.",
    },
    {
      pregunta: "Les donations passées comptent-elles ?",
      respuesta: "Oui, celles reçues du défunt depuis moins de 15 ans. Elles ont déjà utilisé une partie de l'abattement, qui est réduit d'autant.",
    },
    {
      pregunta: "L'assurance vie est-elle comprise ?",
      respuesta: "Non. Les capitaux d'assurance vie suivent leurs propres règles fiscales et ne font pas partie de ce calcul.",
    },
  ],
  glosario: [
    { termino: "Abattement", definicion: "Montant retiré de la part reçue avant le calcul des droits." },
    { termino: "Ligne directe", definicion: "Lien entre parents et enfants, grands-parents et petits-enfants." },
    { termino: "Part taxable", definicion: "La part reçue après déduction des abattements." },
  ],
});
