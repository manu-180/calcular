import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sr.hypotheekrenteaftrek-berekenen",
  h1: "Hypotheekrenteaftrek berekenen in Suriname",
  title: "Hypotheekrenteaftrek Suriname: schuld tot {{sr.hypotheek-max-schuld}}",
  description:
    "De rente op een hypotheek voor je eigen woning is aftrekbaar over een schuld tot {{sr.hypotheek-max-schuld}}. Bereken hoeveel inkomstenbelasting je daardoor minder betaalt.",
  intro: [
    "Heb je een hypotheek op het huis waarin je zelf woont, dan mag je de rente aftrekken van je inkomen. Je betaalt dan minder inkomstenbelasting.",
    "De aftrek geldt voor de rente over een schuld tot {{sr.hypotheek-max-schuld}}. Is je schuld hoger, dan telt alleen de rente over dat deel.",
  ],
  comoSeCalcula: [
    "Aftrekbare rente: de betaalde rente, naar verhouding beperkt tot een schuld van {{sr.hypotheek-max-schuld}}.",
    "We berekenen de inkomstenbelasting over je zuiver inkomen met en zonder die aftrek. Het verschil is je voordeel.",
    "De schijven zijn die van de inkomstenbelasting: niets tot {{sr.ib-tarief[0].hasta}} en daarboven {{sr.ib-tarief[1].tasa}} tot {{sr.ib-tarief[-1].tasa}}.",
  ],
  ejemplo: ["Met een zuiver inkomen van SRD 400.000, een schuld van SRD 800.000 en SRD 64.000 rente is SRD 48.000 aftrekbaar. Je betaalt SRD 18.240 minder inkomstenbelasting."],
  faq: [
    {
      pregunta: "Voor welke woning geldt de aftrek?",
      respuesta: "Voor een eigen woning die je zelf bewoont of gebruikt voor je eigen huishouden, of die daarvoor bestemd is. De schuld moet een hypotheek op die woning zijn.",
    },
    {
      pregunta: "Krijg ik het voordeel via mijn loon?",
      respuesta: "De aftrek is een post van de inkomstenbelasting. Je geeft hem op in je aangifte inkomstenbelasting.",
    },
    {
      pregunta: "Zijn er nog andere aftrekposten voor de eigen woning?",
      respuesta: "Ja. De wet noemt ook de kosten van buitenschilderwerk aan je eigen woning, hoogstens een keer in de drie jaar.",
    },
  ],
  glosario: [
    { termino: "Hypotheek", definicion: "Een lening met je huis als onderpand." },
    { termino: "Aftrekpost", definicion: "Een uitgave die je van je inkomen mag aftrekken voordat de belasting wordt berekend." },
  ],
});
