import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "tg.cout-employeur",
  h1: "Coût d'un salarié pour l'employeur au Togo",
  title: "Coût employeur Togo : salaire brut et charges",
  description:
    "Calculez le coût total d'un salarié au Togo : salaire brut, cotisations patronales CNSS et AMU de {{tg.amu-taux[employeur]}}, sur le mois et sur l'année.",
  intro: [
    "Embaucher coûte plus que le salaire brut : l'entreprise paie aussi ses cotisations à la CNSS et à l'assurance maladie universelle.",
    "Indiquez le brut mensuel et les frais remboursés pour obtenir le coût du mois et de l'année.",
  ],
  comoSeCalcula: [
    "Les charges patronales réunissent les pensions ({{tg.cnss-taux[pension-employeur]}}), les prestations familiales ({{tg.cnss-taux[prestations-familiales]}}), les risques professionnels ({{tg.cnss-taux[risques-professionnels]}}) et l'AMU ({{tg.amu-taux[employeur]}}).",
    "Elles portent sur tout le brut, sans plafond, avec le SMIG comme minimum.",
    "Les remboursements de frais s'ajoutent au coût sans cotisation.",
  ],
  ejemplo: ["Pour 200 000 F bruts, les charges patronales sont de 45 000 F. Le salarié coûte 245 000 F par mois, soit 2 940 000 F par an."],
  faq: [
    {
      pregunta: "Les cotisations du salarié entrent-elles dans le coût ?",
      respuesta: "Non, elles sont déjà comprises dans le brut : l'employeur les retient sur le salaire et les reverse à la CNSS.",
    },
    {
      pregunta: "Le taux des risques professionnels change-t-il selon le secteur ?",
      respuesta: "La CNSS publie un taux unique de {{tg.cnss-taux[risques-professionnels]}} pour les employeurs, y compris en zone franche.",
    },
    {
      pregunta: "Le calcul inclut-il l'IRPP ?",
      respuesta: "Non. L'IRPP est retenu sur le salaire du travailleur et reversé par l'employeur, mais il ne s'ajoute pas au coût.",
    },
  ],
  glosario: [
    { termino: "Charges patronales", definicion: "Cotisations sociales payées par l'employeur en plus du salaire brut." },
    { termino: "Coût total", definicion: "Le brut, plus les charges patronales et les frais remboursés." },
  ],
});
