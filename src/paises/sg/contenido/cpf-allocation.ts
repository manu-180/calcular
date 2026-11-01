import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.cpf-allocation",
  h1: "CPF allocation calculator: OA, SA, MA and RA",
  title: "CPF allocation calculator {{anio}}: OA, SA, MA and RA",
  description: "See how your monthly CPF is split between your Ordinary, Special, MediSave and Retirement Accounts, using the CPF Board's {{anio}} allocation rates by age.",
  intro: [
    "Your CPF contribution does not go into one pot. It is split between your Ordinary Account, your Special Account (or Retirement Account from 55) and your MediSave Account.",
    "Start from your salary or from a contribution amount and pick your age group to see the split.",
  ],
  comoSeCalcula: [
    "The share for MediSave is worked out first: the contribution times your age group's MediSave ratio, which is {{sg.cpf-asignacion-ma[35-y-menos]}} if you are 35 or younger.",
    "Then the Special Account share (Retirement Account from 55): the contribution times its ratio, {{sg.cpf-asignacion-sa-ra[35-y-menos]}} at 35 or younger.",
    "Whatever is left goes to your Ordinary Account.",
    "If you start from your salary, the contribution is first worked out with the 2026 CPF rates for Singapore Citizens and PRs.",
  ],
  ejemplo: [
    "A $100 contribution for a 30-year-old puts $21.62 in MediSave, $16.21 in the Special Account and $62.17 in the Ordinary Account.",
  ],
  faq: [
    {
      pregunta: "Who do these allocation rates apply to?",
      respuesta: "They are the CPF Board's rates from 1 January 2026 for private sector employees and non-pensionable employees of ministries, statutory bodies and aided schools.",
    },
    {
      pregunta: "What happens to the Special Account at 55?",
      respuesta: "It closes. From then on, that share of your contributions goes to your Retirement Account up to the Full Retirement Sum, and to your Ordinary Account once you have set aside that sum.",
    },
    {
      pregunta: "Why does more go to MediSave as I get older?",
      respuesta: "The allocation ratios change by age group. At 35 or younger, {{sg.cpf-asignacion-ma[35-y-menos]}} of your contribution goes to MediSave, and above 70 it is {{sg.cpf-asignacion-ma[mas-70]}}.",
    },
  ],
  glosario: [
    { termino: "OA", definicion: "Ordinary Account, which gets what is left after the MediSave and Special or Retirement shares." },
    { termino: "SA", definicion: "Special Account, for retirement savings until age 55." },
    { termino: "MA", definicion: "MediSave Account, the CPF account for healthcare." },
    { termino: "RA", definicion: "Retirement Account, created at 55 to hold your retirement savings." },
  ],
});
