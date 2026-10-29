import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.cpf-interest",
  h1: "CPF interest calculator",
  title: "CPF interest calculator {{anio}}: OA, SA, MA, RA and extra",
  description: "Estimate a year of CPF interest: {{sg.cpf-interes-oa}} on your Ordinary Account, {{sg.cpf-interes-sma}} on Special, MediSave and Retirement savings, plus the extra interest.",
  intro: [
    "Your CPF savings earn interest set by the Government every quarter, and the Government pays extra interest on the first part of your balances.",
    "Enter your account balances and whether you are 55 or older to see roughly how much interest they would earn in a year.",
  ],
  comoSeCalcula: [
    "Ordinary Account savings earn {{sg.cpf-interes-oa}} a year. Special, MediSave and Retirement Account savings earn {{sg.cpf-interes-sma}}.",
    "Below 55, you get an extra {{sg.cpf-interes-extra}} on the first {{sg.cpf-extra-topes[total]}} of your combined balances. Only up to {{sg.cpf-extra-topes[oa]}} of your Ordinary Account counts for this.",
    "From 55, the extra interest is {{sg.cpf-extra-55[primeros]}} on the first {{sg.cpf-extra-topes[tramo-55]}} of combined balances and {{sg.cpf-extra-55[siguientes]}} on the next {{sg.cpf-extra-topes[tramo-55]}}.",
  ],
  ejemplo: [
    "Below 55 with $40,000 in the Ordinary Account, $20,000 in the Special Account and $15,000 in MediSave, you earn about $2,950 in a year, including $550 of extra interest.",
  ],
  faq: [
    {
      pregunta: "What are the CPF interest rates now?",
      respuesta: "Since {{sg.cpf-interes-oa#desde}}, the Ordinary Account earns {{sg.cpf-interes-oa}} and the Special, MediSave and Retirement Accounts earn {{sg.cpf-interes-sma}}.",
    },
    {
      pregunta: "How long will the 4% floor last?",
      respuesta: "The Government has extended the 4% floor on Special, MediSave and Retirement Account savings until 31 December 2027.",
    },
    {
      pregunta: "Where does the extra interest on my Ordinary Account go?",
      respuesta: "It is paid into your Special Account or, from 55, your Retirement Account, to grow your retirement savings.",
    },
    {
      pregunta: "Do I still get extra interest after joining CPF LIFE?",
      respuesta: "Yes. If you are above 55 and in CPF LIFE, you still earn extra interest on your combined balances, including the savings used for CPF LIFE.",
    },
  ],
  glosario: [
    { termino: "Floor rate", definicion: "The minimum interest rate the Government guarantees on a CPF account." },
    { termino: "Extra interest", definicion: "Interest the Government adds on the first part of your combined CPF balances." },
  ],
});
