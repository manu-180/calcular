import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cv.euro-escudo",
  h1: "Converter euros em escudos cabo-verdianos {{anio}}",
  title: "Euro em escudo cabo-verdiano {{anio}}: conversor",
  description: "Converta euros em escudos cabo-verdianos e o inverso com a paridade fixa do escudo ao euro.",
  intro: [
    "O escudo cabo-verdiano tem uma paridade fixa com o euro, fixada em 110,265 escudos por euro. Cem euros valem 11 026,50 escudos.",
    "Indique o valor e o sentido da conversão. A calculadora multiplica ou divide pela paridade.",
  ],
  comoSeCalcula: [
    "De euros para escudos, multiplica-se o valor pela paridade. De escudos para euros, divide-se pela paridade.",
    "A paridade fixa não segue o mercado. Casas de câmbio e bancos cobram comissões por cima, e o valor que recebe pode ser menor.",
  ],
  ejemplo: ["Cem euros convertidos à paridade dão 11 026,50 escudos. Para saber quantos euros são 50 000 escudos, divide-se por 110,265, o que dá 453,46 euros."],
  faq: [],
  glosario: [{ termino: "Paridade fixa", definicion: "Taxa de câmbio fixada por acordo, que não varia com o mercado." }],
});
