import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.calcul-salaire-net",
  h1: "Calcul du salaire net au Burkina Faso",
  title: "Calcul salaire net Burkina Faso : du brut au net",
  description:
    "Passez du salaire brut au net : cotisation CNSS de {{bf.cnss-taux[vieillesse-salarie]}}, IUTS avec abattement et réduction pour charges de famille.",
  intro: [
    "Le salaire net est ce qui reste du brut après la cotisation CNSS et l'impôt unique sur les traitements et salaires (IUTS).",
    "Indiquez votre salaire de base, vos primes et indemnités, votre catégorie et vos charges de famille. Vous obtenez le net à payer du mois.",
  ],
  comoSeCalcula: [
    "La CNSS retient {{bf.cnss-taux[vieillesse-salarie]}} pour l'assurance vieillesse, sur la rémunération limitée à {{bf.cnss-plafond}} par mois.",
    "Pour l'IUTS, on retire du brut la cotisation retraite (au plus {{bf.iuts-plafond-pension}} du salaire de base), l'abattement pour frais professionnels et la part exonérée des indemnités de logement, de fonction et de transport.",
    "Le barème mensuel va de {{bf.iuts-bareme[0].tasa}} à {{bf.iuts-bareme[-1].tasa}}. L'impôt obtenu baisse ensuite de {{bf.iuts-charges-famille[1]}} à {{bf.iuts-charges-famille[4]}} selon le nombre de charges.",
  ],
  ejemplo: [
    "Avec 200 000 F de salaire de base, sans prime ni charge : 11 000 F de CNSS et 16 366 F d'IUTS. Le net est de 172 634 F.",
  ],
  faq: [
    {
      pregunta: "Quel abattement s'applique à mon salaire ?",
      respuesta:
        "{{bf.iuts-abattement[autres]}} du salaire de base en général, et {{bf.iuts-abattement[superieure]}} pour les catégories supérieures : P, A et B, ou 6, 1 et 2 dans le public, et les grilles équivalentes du privé.",
    },
    {
      pregunta: "Mes indemnités de logement et de transport sont-elles imposées ?",
      respuesta:
        "En partie seulement. Le logement est exonéré jusqu'à {{bf.iuts-indemnites-taux[logement]}} du salaire brut sans dépasser {{bf.iuts-indemnites-plafond[logement]}}, le transport jusqu'à {{bf.iuts-indemnites-taux[transport]}} sans dépasser {{bf.iuts-indemnites-plafond[transport]}}. Le surplus est imposable.",
    },
    {
      pregunta: "Qui compte comme charge de famille ?",
      respuesta:
        "Le conjoint et les enfants mineurs, infirmes ou de moins de 25 ans qui poursuivent leurs études, y compris les orphelins recueillis, à condition qu'ils n'aient pas de revenus propres. Au-delà de quatre charges, la réduction reste celle de quatre.",
    },
  ],
  glosario: [
    { termino: "Salaire de base", definicion: "Le salaire catégoriel prévu au contrat, sans aucune indemnité." },
    { termino: "IUTS", definicion: "Impôt unique sur les traitements et salaires, retenu chaque mois par l'employeur." },
  ],
});
