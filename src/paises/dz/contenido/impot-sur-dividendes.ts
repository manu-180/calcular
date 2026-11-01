import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dz.impot-sur-dividendes",
  h1: "Calcul de l'impôt sur les dividendes en Algérie",
  title: "Impôt sur les dividendes Algérie {{anio}} : retenue de {{dz.irg-dividendes}}",
  description:
    "Calculez la retenue à la source sur les dividendes versés à un associé en Algérie : {{dz.irg-dividendes}} libératoire depuis la loi de finances pour {{anio}}.",
  intro: [
    "Les produits des actions et parts sociales, comme les dividendes, subissent une retenue d'IRG à la source au moment de leur distribution. La loi de finances pour 2026 a fixé ce taux à {{dz.irg-dividendes}}.",
    "Indiquez le montant brut distribué pour voir la retenue et le montant net perçu.",
  ],
  comoSeCalcula: [
    "Retenue = dividendes bruts × {{dz.irg-dividendes}}.",
    "Dividendes nets = dividendes bruts − retenue.",
    "La retenue est libératoire : ces revenus n'entrent pas dans le revenu global soumis au barème.",
  ],
  faq: [
    {
      pregunta: "Quel est le taux d'imposition des dividendes en Algérie en 2026 ?",
      respuesta: "{{dz.irg-dividendes}}, retenu à la source et libératoire d'impôt, selon l'article 104 du code des impôts directs modifié par la loi de finances pour 2026.",
    },
    {
      pregunta: "Qui verse la retenue au Trésor ?",
      respuesta: "La société qui distribue les dividendes la retient sur le montant versé à l'associé.",
    },
    {
      pregunta: "Les dividendes s'ajoutent-ils à mon salaire pour l'IRG ?",
      respuesta: "Non. La retenue étant libératoire, ils ne s'ajoutent pas au revenu imposé au barème progressif.",
    },
  ],
  glosario: [
    { termino: "Dividende", definicion: "Part du bénéfice d'une société distribuée à ses associés ou actionnaires." },
    { termino: "Libératoire", definicion: "Qui solde définitivement l'impôt dû sur ce revenu." },
  ],
});
