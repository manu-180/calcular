import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ml.calcul-irvm",
  h1: "Calcul de l'IRVM au Mali",
  title: "IRVM Mali : impôt sur dividendes, intérêts et obligations",
  description: "Calculez l'impôt sur les revenus de valeurs mobilières (IRVM) au Mali : {{ml.irvm-taux[dividendes]}} sur les dividendes, {{ml.irvm-taux[depots]}} sur les intérêts des dépôts.",
  intro: [
    "Au Mali, les dividendes, les intérêts et les autres revenus de capitaux mobiliers supportent l'impôt sur les revenus de valeurs mobilières (IRVM). Il est retenu par la société ou l'établissement qui paie.",
    "Indiquez le montant brut et la nature du revenu. Vous obtenez l'impôt et le montant net.",
  ],
  comoSeCalcula: [
    "Dividendes : {{ml.irvm-taux[dividendes]}}, ramenés à {{ml.irvm-taux[dividendes-cotees]}} pour une société cotée sur une bourse agréée par le CREPMF.",
    "Obligations : {{ml.irvm-taux[obligations]}}. Pour les obligations de l'État ou des collectivités publiques, {{ml.irvm-taux[obligations-publiques-5-10]}} entre cinq et dix ans et {{ml.irvm-taux[obligations-publiques-plus-10]}} au-delà de dix ans.",
    "Intérêts des dépôts à vue ou à terme et des comptes courants : {{ml.irvm-taux[depots]}}. Lots payés aux porteurs d'obligations : {{ml.irvm-taux[lots]}}. Autres revenus : {{ml.irvm-taux[autres]}}.",
    "L'impôt se calcule sur le montant brut des revenus.",
  ],
  ejemplo: ["Pour 1 000 000 F de dividendes d'une société non cotée, l'IRVM est de 100 000 F et l'actionnaire reçoit 900 000 F."],
  faq: [
    {
      pregunta: "Qui paie l'IRVM ?",
      respuesta: "C'est un impôt sur le revenu du bénéficiaire, mais il est retenu et versé aux Impôts par la société ou l'établissement qui distribue ou paie les revenus.",
    },
    {
      pregunta: "Les intérêts de mon compte d'épargne sont-ils imposés ?",
      respuesta: "Les intérêts des dépôts à vue ou à échéance fixe et des comptes courants sont imposés à {{ml.irvm-taux[depots]}}, sauf exonération prévue par le CGI.",
    },
    {
      pregunta: "Pourquoi un taux de 0 % pour certaines obligations ?",
      respuesta: "Le CGI ramène le taux à zéro pour les obligations émises par l'État, les collectivités publiques et leurs démembrements dont la durée dépasse dix ans.",
    },
  ],
  glosario: [
    { termino: "IRVM", definicion: "Impôt sur les revenus de valeurs mobilières." },
    { termino: "CREPMF", definicion: "Conseil régional de l'épargne publique et des marchés financiers de l'UMOA." },
  ],
});
