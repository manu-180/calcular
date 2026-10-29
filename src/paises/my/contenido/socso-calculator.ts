import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "my.socso-calculator",
  h1: "SOCSO contribution calculator {{anio}}",
  title: "SOCSO calculator {{anio}}: PERKESO and LINDUNG 24 Jam",
  description: "Find the SOCSO, LINDUNG 24 Jam and EIS contributions for any monthly wage, split between you and your employer, from the PERKESO tables.",
  intro: [
    "Enter the monthly wages to see what PERKESO takes from the employee and what the employer pays on top.",
    "Amounts come straight from the PERKESO contribution tables, which work by wage bands, not by a flat percentage.",
  ],
  comoSeCalcula: [
    "The wages fall into a band of the PERKESO table (most bands are RM100 wide).",
    "First category: the employer pays the Employment Injury and Invalidity share and the employee pays the Invalidity share.",
    "Second category: only the Employment Injury Scheme applies, paid by the employer.",
    "LINDUNG 24 Jam (the Non-Employment Injury Scheme) adds an employee share from 1 June 2026.",
    "EIS comes from its own table and is the same for employer and employee.",
    "Wages above {{my.socso-wage-ceiling}} pay the same as the ceiling.",
  ],
  ejemplo: [
    "On RM3,000 in the first category, the employee pays RM14.75 for Invalidity, RM22.15 for LINDUNG 24 Jam and RM5.90 for EIS: RM42.80 in total. The employer pays RM51.65 of SOCSO and RM5.90 of EIS.",
  ],
  faq: [
    {
      pregunta: "What is the SOCSO wage ceiling?",
      respuesta: "{{my.socso-wage-ceiling}} a month since {{my.socso-wage-ceiling#desde}}. Wages above it pay the contribution set for the ceiling.",
    },
    {
      pregunta: "What is the difference between the first and second category?",
      respuesta:
        "The first category covers both the Employment Injury Scheme and the Invalidity Scheme, so the employee pays a share too. The second category covers the Employment Injury Scheme only, and that part is paid by the employer.",
    },
    {
      pregunta: "What is LINDUNG 24 Jam?",
      respuesta:
        "PERKESO's Non-Employment Injury Scheme (SKBBK). It started on 1 June 2026 and extends protection to accidents that happen outside working hours. Its contribution is an employee share in both categories.",
    },
  ],
  glosario: [
    { termino: "PERKESO", definicion: "Pertubuhan Keselamatan Sosial, the Social Security Organisation that runs SOCSO and EIS." },
    { termino: "Act 4", definicion: "The Employees' Social Security Act 1969, the law behind the SOCSO tables." },
    { termino: "Act 800", definicion: "The Employment Insurance System Act 2017, the law behind EIS." },
  ],
});
