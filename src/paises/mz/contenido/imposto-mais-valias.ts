import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mz.imposto-mais-valias",
  h1: "Calcular o IRPS sobre mais-valias",
  title: "IRPS sobre mais-valias em Moçambique",
  description: "Desde {{anio}} as mais-valias das pessoas singulares são tributadas de forma autónoma no IRPS, com taxas de {{mz.irps-mais-valias[0].tasa}} a {{mz.irps-mais-valias[-1].tasa}}.",
  intro: ["Desde {{mz.irps-mais-valias#desde}} as mais-valias são tributadas de forma autónoma no momento em que são realizadas."],
  comoSeCalcula: ["Mais-valia = valor de venda − valor de aquisição. Aplicam-se as taxas do artigo 54-A do Código do IRPS."],
  ejemplo: [],
  faq: [],
  glosario: [],
});
