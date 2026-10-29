import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bf.impot-sur-les-benefices",
  h1: "Impôt sur les bénéfices d'une entreprise individuelle",
  title: "Impôt sur les bénéfices Burkina Faso : barème des BIC",
  description:
    "Calculez l'impôt sur les bénéfices industriels, commerciaux et agricoles des personnes physiques : barème de {{bf.bic-bareme[0].tasa}} à {{bf.bic-bareme[-1].tasa}}.",
  intro: [
    "Le commerçant, l'artisan ou l'exploitant en nom propre paie l'impôt sur ses bénéfices selon un barème progressif.",
    "Indiquez le bénéfice imposable de l'année. Vous obtenez l'impôt et le taux moyen, avec la réduction si vous adhérez à un centre de gestion agréé.",
  ],
  comoSeCalcula: [
    "Le bénéfice est arrondi aux mille francs inférieurs.",
    "Barème par tranche : {{bf.bic-bareme[0].tasa}} jusqu'à {{bf.bic-bareme[0].hasta}}, {{bf.bic-bareme[1].tasa}} jusqu'à {{bf.bic-bareme[1].hasta}}, puis {{bf.bic-bareme[2].tasa}} au-delà.",
    "Les adhérents d'un centre de gestion agréé ont une réduction de {{bf.bic-reduction-cga}} de l'impôt.",
  ],
  ejemplo: ["Un bénéfice de 2 000 000 F donne 425 000 F d'impôt, soit un taux moyen de 21,25 %. Avec un centre de gestion agréé : 297 500 F."],
  faq: [
    {
      pregunta: "Quand payer l'impôt sur les bénéfices ?",
      respuesta: "L'impôt d'un exercice se paie spontanément au plus tard le 30 avril de l'année suivante, à la recette des impôts de rattachement.",
    },
    {
      pregunta: "Le minimum forfaitaire s'applique-t-il aussi ?",
      respuesta: "Oui. Un minimum forfaitaire de perception est prévu pour l'impôt sur les bénéfices : si l'impôt calculé est plus faible, c'est ce minimum qui est dû.",
    },
    {
      pregunta: "Comment traiter les dépenses mixtes, à la fois professionnelles et personnelles ?",
      respuesta: "Il faut les ventiler. Si la part professionnelle ne peut pas être déterminée, on retient forfaitairement les deux tiers de ces charges.",
    },
  ],
  glosario: [
    { termino: "BIC", definicion: "Bénéfices industriels, commerciaux et agricoles." },
    { termino: "Centre de gestion agréé", definicion: "Organisme qui aide les petites entreprises à tenir leur comptabilité et ouvre droit à des réductions d'impôt." },
  ],
});
