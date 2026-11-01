import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.allocation-chomage",
  h1: "Allocation chômage en Algérie : montant et durée en {{anio}}",
  title: "Allocation chômage Algérie {{anio}} : {{dz.allocation-chomage}} par mois",
  description:
    "L'allocation chômage des primo-demandeurs d'emploi est de {{dz.allocation-chomage}} par mois depuis le {{dz.allocation-chomage#desde}}. Calculez la durée et le montant restants.",
  intro: [
    "L'allocation chômage est versée chaque mois aux primo-demandeurs d'emploi inscrits à l'agence nationale de l'emploi (ANEM). Le décret exécutif n° 26-87 l'a portée à {{dz.allocation-chomage}} à compter du {{dz.allocation-chomage#desde}}.",
    "Indiquez le nombre de mois déjà perçus pour connaître la durée et le montant qui restent au plus.",
  ],
  comoSeCalcula: [
    "Montant mensuel : {{dz.allocation-chomage}}.",
    "Durée : {{dz.allocation-chomage-duree[initiale]}}, renouvelable une seule fois pour {{dz.allocation-chomage-duree[renouvellement]}}.",
    "Une année supplémentaire est prévue par l'article 7 bis : elle est versée aux bénéficiaires qui comptent au moins 24 mois d'ancienneté dans le dispositif, et aux autres après la période qui leur reste.",
    "Montant restant au plus = allocation mensuelle × mois restants.",
  ],
  faq: [
    {
      pregunta: "Quel est le montant de l'allocation chômage en 2026 ?",
      respuesta: "{{dz.allocation-chomage}} par mois, selon le décret exécutif n° 26-87 du 21 janvier 2026, applicable depuis le {{dz.allocation-chomage#desde}}.",
    },
    {
      pregunta: "Quelles obligations pour garder l'allocation ?",
      respuesta:
        "Valider son inscription tous les six mois, en ligne ou à l'agence de l'emploi, répondre aux convocations de l'ANEM, ne pas refuser une offre d'emploi correspondant à ses qualifications et rechercher activement une formation qualifiante ou diplômante.",
    },
    {
      pregunta: "L'allocation continue-t-elle pendant une formation ?",
      respuesta: "Oui. Le bénéficiaire orienté vers une formation continue de percevoir l'allocation pendant la formation.",
    },
  ],
  glosario: [
    { termino: "ANEM", definicion: "Agence nationale de l'emploi, qui gère l'inscription des demandeurs d'emploi." },
    { termino: "Primo-demandeur d'emploi", definicion: "Personne qui cherche un premier emploi." },
  ],
});
