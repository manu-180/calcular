import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bw.notice-period",
  h1: "Notice period calculator Botswana",
  title: "Notice period Botswana: how much notice and pay in lieu",
  description: "Find the minimum notice to end a contract of employment in Botswana and the pay in lieu of notice, for workers paid monthly, weekly or daily.",
  intro: ["Choose how you are paid and enter your basic pay for one pay period to see the minimum notice and what pay in lieu of notice comes to."],
  comoSeCalcula: [
    "Workers paid monthly get at least one month of notice.",
    "Workers paid daily or weekly get at least {{bw.notice-period-days}}.",
    "Either side can end the contract without notice by paying the basic pay for the notice period.",
  ],
  ejemplo: [],
  faq: [],
  glosario: [],
});
