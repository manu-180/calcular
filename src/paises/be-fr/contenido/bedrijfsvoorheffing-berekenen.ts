import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be-fr.bedrijfsvoorheffing-berekenen",
  h1: "Calcul du précompte professionnel avec la formule-clé",
  title: "Calcul du précompte professionnel 2026 avec la formule-clé",
  description:
    "Calculez le précompte professionnel sur votre salaire mensuel avec la formule-clé officielle : frais forfaitaires, barème, quotité exemptée et enfants à charge.",
  intro: [
    "Le précompte professionnel est l'avance sur votre impôt des personnes physiques que votre employeur retient chaque mois sur votre salaire. Le SPF Finances fixe le calcul dans la formule-clé.",
    "Indiquez votre salaire mensuel imposable (brut moins ONSS), votre situation familiale et le nombre d'enfants à charge. Vous voyez le précompte par mois et comment il est calculé.",
  ],
  comoSeCalcula: [
    "Votre salaire mensuel imposable multiplié par 12 donne le revenu annuel brut.",
    "On en retire les frais professionnels forfaitaires : 30 % de ce montant, avec un maximum de {{be.bv-gezin[forfait-max]}}.",
    "On applique ensuite le barème de base, qui inclut déjà 7 % de taxe communale additionnelle. On déduit l'impôt sur la quotité exemptée : {{be.bv-gezin[belasting-vrije-som]}} par an.",
    "Si votre partenaire n'a pas de revenus professionnels, 30 % de votre revenu lui est d'abord attribué, avec un maximum de {{be.bv-gezin[hq-max]}}. C'est le quotient conjugal.",
    "Les réductions pour enfants à charge sont ensuite déduites, par exemple {{be.bv-kinderen[2]}} par an pour deux enfants. L'impôt annuel est divisé par 12.",
  ],
  ejemplo: [
    "Avec 2.500 € imposables par mois, isolé et un enfant : 30.000 − 6.070 de frais = 23.930. L'impôt selon le barème est de 7.560,09. Après la quotité exemptée et la réduction pour un enfant, il reste 3.948,11 par an, soit 329,01 € par mois (règles jusqu'à fin octobre 2026).",
  ],
  faq: [
    {
      pregunta: "Pourquoi le précompte change-t-il le 1er novembre 2026 ?",
      respuesta:
        "La loi du 15 juillet 2026 portant réforme de l'impôt des personnes physiques relève la quotité exemptée dès les revenus de 2026. Le SPF Finances adapte donc le précompte professionnel à partir du 1er novembre 2026, avec une quotité exemptée plus élevée et de nouveaux montants pour les enfants à charge.",
    },
    {
      pregunta: "Qui est isolé pour le précompte professionnel ?",
      respuesta:
        "Celui qui n'est ni marié ni cohabitant légal. Les personnes mariées et les cohabitants légaux choisissent l'option qui correspond aux revenus de leur partenaire.",
    },
    {
      pregunta: "Comment comptent les enfants handicapés ?",
      respuesta: "Un enfant à charge handicapé compte pour deux enfants. Ajoutez donc un enfant au nombre.",
    },
    {
      pregunta: "Le précompte est-il égal à mon impôt ?",
      respuesta:
        "Pas exactement. C'est une avance. Tout est régularisé avec votre déclaration, avec votre vraie taxe communale, vos déductions et vos réductions d'impôt.",
    },
  ],
  glosario: [
    { termino: "Formule-clé", definicion: "Les règles de calcul officielles du SPF Finances pour le précompte professionnel sur les salaires mensuels." },
    { termino: "Frais professionnels forfaitaires", definicion: "Un montant de frais déduit automatiquement de votre revenu, sans justificatifs." },
    { termino: "Quotient conjugal", definicion: "Une partie de votre revenu attribuée à votre partenaire s'il n'a pas de revenus professionnels propres, pour que votre revenu tombe dans des tranches plus basses." },
    { termino: "Quotité exemptée d'impôt", definicion: "La partie de votre revenu sur laquelle vous ne payez pas d'impôt." },
  ],
});
