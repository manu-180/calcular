import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "fr.interets-livret-a",
  h1: "Calcul des intérêts du livret A",
  title: "Intérêts du livret A : calcul par quinzaine au taux de {{fr.livret-a-taux}}",
  description:
    "Calculez les intérêts de votre livret A au taux de {{fr.livret-a-taux}} : règle des quinzaines, dates de valeur des dépôts et retraits, capitalisation au 31 décembre.",
  intro: [
    "Le livret A rapporte {{fr.livret-a-taux}} par an depuis le {{fr.livret-a-taux#desde}}. Les intérêts sont nets d'impôt et de prélèvements sociaux.",
    "Ils se calculent par quinzaine entière : une somme ne rapporte qu'à partir du 1er ou du 16 du mois qui suit son dépôt.",
  ],
  comoSeCalcula: [
    "Dépôt fait entre le 1er et le 15 du mois : il rapporte à partir du 16. Dépôt fait à partir du 16 : il rapporte à partir du 1er du mois suivant.",
    "Retrait fait entre le 1er et le 15 : la somme cesse de rapporter à la fin du mois précédent. Retrait à partir du 16 : elle cesse de rapporter le 15.",
    "Intérêts d'une quinzaine = somme × taux ÷ 24. Le taux en vigueur à chaque quinzaine est utilisé.",
    "Au 31 décembre, les intérêts de l'année s'ajoutent au livret et rapportent à leur tour l'année suivante.",
  ],
  ejemplo: [
    "10 000 € déposés le 10 février 2026 rapportent 139,58 € jusqu'au 31 décembre : 1,5 % jusqu'au 31 juillet, puis 1,7 % depuis le 1er août.",
  ],
  faq: [
    {
      pregunta: "Quel est le plafond du livret A ?",
      respuesta: "Vous pouvez y déposer jusqu'à {{fr.livret-a-plafond}}. Les intérêts peuvent faire dépasser ce plafond, et continuent de rapporter.",
    },
    {
      pregunta: "Quand le taux change-t-il ?",
      respuesta: "Il peut être révisé deux fois par an, au 1er février et au 1er août, sur proposition du gouverneur de la Banque de France.",
    },
    {
      pregunta: "Les intérêts sont-ils imposables ?",
      respuesta: "Non. Les intérêts du livret A sont exonérés d'impôt sur le revenu et de prélèvements sociaux.",
    },
  ],
  glosario: [
    { termino: "Quinzaine", definicion: "Période du 1er au 15 ou du 16 à la fin du mois, base du calcul des intérêts." },
    { termino: "Date de valeur", definicion: "Date à partir de laquelle une somme déposée commence à rapporter." },
  ],
});
