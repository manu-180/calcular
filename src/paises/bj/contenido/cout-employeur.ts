import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bj.cout-employeur",
  h1: "Calcul du coût employeur d'un salarié au Bénin",
  title: "Coût employeur Bénin : charges patronales et VPS",
  description:
    "Combien coûte un salarié au Bénin ? Salaire brut, cotisations CNSS patronales et versement patronal sur salaires de {{bj.vps-taux[general]}}.",
  intro: [
    "Un salarié coûte plus que son salaire brut : l'employeur paie aussi des cotisations CNSS et le versement patronal sur salaires (VPS).",
    "Indiquez le brut, le taux risques professionnels et votre situation pour le VPS. Vous obtenez le coût du mois et de l'année.",
  ],
  comoSeCalcula: [
    "La CNSS demande à l'employeur {{bj.cnss-taux[pension-employeur]}} pour la pension et {{bj.cnss-taux[prestations-familiales]}} pour les prestations familiales, plus le taux risques professionnels.",
    "Le VPS est de {{bj.vps-taux[general]}} du salaire imposable, et de {{bj.vps-taux[enseignement-prive]}} pour l'enseignement privé.",
    "Le coût total additionne le brut, les cotisations patronales et le VPS.",
  ],
  ejemplo: ["Pour 300 000 F bruts avec 2 % de risques professionnels : 52 200 F de CNSS et 12 000 F de VPS. Le coût est de 364 200 F par mois."],
  faq: [
    {
      pregunta: "Qui est exonéré du VPS ?",
      respuesta:
        "Notamment les contribuables à la taxe professionnelle synthétique, les entreprises nouvelles la première année pour leurs salariés béninois, et deux ans pour un premier emploi déclaré à la CNSS.",
    },
    {
      pregunta: "Sur quelle base se calcule le VPS ?",
      respuesta: "Sur la même base que l'impôt sur les traitements et salaires : le salaire brut imposable du mois.",
    },
    {
      pregunta: "Les cotisations du salarié entrent-elles dans le coût ?",
      respuesta: "Non. La part du salarié est retenue sur son brut. Elle ne s'ajoute pas au coût de l'employeur.",
    },
  ],
  glosario: [
    { termino: "VPS", definicion: "Versement patronal sur salaires, impôt payé par l'employeur sur les salaires versés." },
    { termino: "Charges patronales", definicion: "Cotisations et impôts que l'employeur paie en plus du salaire brut." },
  ],
});
