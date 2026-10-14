import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.cpp-calculator",
  h1: "CPP contributions calculator 2026",
  title: "CPP calculator 2026: contributions, CPP2 and maximum",
  description: "Work out your 2026 CPP or QPP contributions, including CPP2, as an employee or self-employed. Uses the YMPE of {{ca.cpp[ympe]}} and YAMPE of {{ca.cpp[yampe]}}.",
  intro: [
    "Enter your earnings to see how much you put into the Canada Pension Plan in 2026, and how much your employer adds.",
    "It covers the base contribution, the first additional contribution and the second additional contribution (CPP2), and the Quebec Pension Plan if you work in Quebec.",
  ],
  comoSeCalcula: [
    "The first {{ca.cpp[exemption]}} of earnings is exempt.",
    "On earnings from {{ca.cpp[exemption]}} up to {{ca.cpp[ympe]}} you pay {{ca.cpp-rates[base]}} base plus {{ca.cpp-rates[first]}} first additional. In Quebec the QPP base rate is {{ca.qpp[base]}}.",
    "On earnings from {{ca.cpp[ympe]}} up to {{ca.cpp[yampe]}} you pay {{ca.cpp-rates[second]}} CPP2.",
    "Your employer pays the same amount as you. If you are self-employed you pay both shares.",
  ],
  ejemplo: [
    "An employee earning $90,000 outside Quebec pays the 2026 maximum: $3,519.45 base, $711 first additional and $416 CPP2, for $4,646.45. The employer adds another $4,646.45.",
  ],
  faq: [
    {
      pregunta: "What is the maximum CPP contribution in 2026?",
      respuesta: "For an employee it is $4,230.45 on earnings up to {{ca.cpp[ympe]}}, plus up to $416 of CPP2. Self-employed people pay twice those amounts.",
    },
    {
      pregunta: "Which part of CPP can I deduct?",
      respuesta: "The first and second additional contributions are deducted from your income. The base contributions give you a non-refundable tax credit instead.",
    },
    {
      pregunta: "When do CPP deductions stop for the year?",
      respuesta: "Base and first additional contributions stop once your earnings for the year pass {{ca.cpp[ympe]}}, and CPP2 stops at {{ca.cpp[yampe]}}. They start again in January.",
    },
  ],
  glosario: [
    { termino: "YMPE", definicion: "Year's maximum pensionable earnings, {{ca.cpp[ympe]}} in 2026." },
    { termino: "YAMPE", definicion: "Year's additional maximum pensionable earnings, {{ca.cpp[yampe]}} in 2026. CPP2 applies between the YMPE and this amount." },
    { termino: "Basic exemption", definicion: "The first {{ca.cpp[exemption]}} of yearly earnings, on which no CPP is charged." },
  ],
});
