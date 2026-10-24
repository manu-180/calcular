import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ug.net-salary-calculator",
  h1: "Net salary calculator Uganda",
  title: "Net salary calculator Uganda: PAYE and NSSF",
  description: "See your take-home pay in Uganda after PAYE and your NSSF contribution of {{ug.nssf-employee}}.",
  intro: ["Enter your monthly gross pay to see what you take home after PAYE and NSSF."],
  comoSeCalcula: ["Take-home pay is gross pay minus PAYE and your NSSF contribution of {{ug.nssf-employee}} of gross pay."],
  ejemplo: [],
  faq: [],
  glosario: [{ termino: "NSSF", definicion: "National Social Security Fund." }],
});
