import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.cout-employeur",
  h1: "Coût d'un salarié pour l'employeur",
  title: "Coût employeur Burkina Faso : CNSS et TPA",
  description:
    "Calculez le coût total d'un salarié : cotisations CNSS de l'employeur et taxe patronale et d'apprentissage de {{bf.tpa-taux}} sur les salaires.",
  intro: [
    "Embaucher coûte plus que le salaire brut. L'employeur paie ses cotisations CNSS et, dans la plupart des cas, la taxe patronale et d'apprentissage (TPA).",
    "Indiquez la rémunération du salarié et la situation de l'entreprise. Vous obtenez le coût par mois et par an.",
  ],
  comoSeCalcula: [
    "Cotisations CNSS de l'employeur : {{bf.cnss-taux[vieillesse-employeur]}} pour la vieillesse, {{bf.cnss-taux[prestations-familiales]}} pour les prestations familiales et {{bf.cnss-taux[risques-professionnels]}} pour les risques professionnels, sur un salaire plafonné à {{bf.cnss-plafond}}.",
    "TPA : {{bf.tpa-taux}} de la totalité des rémunérations, avantages en nature compris, sans plafond.",
    "Les adhérents d'un centre de gestion agréé bénéficient d'un abattement de {{bf.tpa-abattement-cga}} sur la base de la TPA.",
  ],
  ejemplo: ["Un salarié à 300 000 F : 48 000 F de CNSS et 9 000 F de TPA. Il coûte 357 000 F par mois à l'entreprise."],
  faq: [
    {
      pregunta: "Qui est exonéré de la TPA ?",
      respuesta:
        "Notamment l'État et les collectivités territoriales, les entreprises privées d'enseignement et de soins de santé, les associations à but non lucratif, les missions diplomatiques et les institutions mutualistes.",
    },
    {
      pregunta: "Quand déclarer la TPA ?",
      respuesta: "La TPA due au titre d'un mois se déclare et se paie au plus tard le 10 du mois suivant.",
    },
    {
      pregunta: "Le coût inclut-il la cotisation du salarié ?",
      respuesta: "Non. La cotisation CNSS du travailleur est retenue sur son salaire brut : elle ne s'ajoute pas au coût pour l'employeur.",
    },
  ],
  glosario: [
    { termino: "TPA", definicion: "Taxe patronale et d'apprentissage, payée par l'employeur sur les salaires versés." },
    { termino: "Charges patronales", definicion: "Ce que l'employeur paie en plus du salaire brut." },
  ],
});
