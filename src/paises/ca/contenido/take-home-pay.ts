import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ca.take-home-pay",
  h1: "Take-home pay calculator 2026 for Canada",
  title: "Take-home pay calculator 2026: salary after tax",
  description: "Turn your 2026 salary into take-home pay after federal and provincial tax, CPP, CPP2 and EI. Weekly, biweekly or monthly, in every province, Quebec included.",
  intro: [
    "Enter your gross salary and your province or territory to see what you take home each year, each month and each pay.",
    "It takes off federal and provincial income tax, CPP and CPP2 contributions and EI premiums with the 2026 figures published by the Canada Revenue Agency.",
  ],
  comoSeCalcula: [
    "CPP is {{ca.cpp-rates[base]}} plus {{ca.cpp-rates[first]}} on earnings between {{ca.cpp[exemption]}} and {{ca.cpp[ympe]}}. CPP2 is {{ca.cpp-rates[second]}} on earnings between {{ca.cpp[ympe]}} and {{ca.cpp[yampe]}}.",
    "EI is {{ca.ei-rates[employee]}} of your earnings up to {{ca.ei-maximum}}.",
    "Income tax is worked out on your salary less RRSP or pension contributions and the enhanced part of CPP, using the 2026 federal and provincial brackets and basic credits.",
    "Take-home pay is your salary less tax, CPP, EI and any RRSP or pension contribution taken through payroll.",
  ],
  ejemplo: [
    "On $70,000 in Ontario you pay $3,956.75 CPP, $1,123.07 EI, $7,278.19 federal tax and $3,855.73 Ontario tax. You take home $53,786.26 a year, or $2,068.70 every two weeks.",
  ],
  faq: [
    {
      pregunta: "Why is my first paycheque of the year smaller than the last ones?",
      respuesta: "CPP and EI come off every pay until you reach the yearly maximum. Once you reach it, the deductions stop until January, so later pays are bigger.",
    },
    {
      pregunta: "What is CPP2?",
      respuesta: "A second CPP contribution of {{ca.cpp-rates[second]}} on earnings between {{ca.cpp[ympe]}} and {{ca.cpp[yampe]}}. You only pay it if you earn more than {{ca.cpp[ympe]}} in the year.",
    },
    {
      pregunta: "Does it work for Quebec?",
      respuesta: "Yes. In Quebec it uses QPP instead of CPP, the lower Quebec EI rate, QPIP premiums, Quebec tax with the basic personal amount of {{ca.qc-bpa}} and the deduction for workers, and the {{ca.qc-abatement}} Quebec abatement on federal tax.",
    },
    {
      pregunta: "Are RRSP contributions taken off before tax?",
      respuesta: "Yes, contributions made through payroll lower the income your tax is calculated on. CPP and EI are still calculated on your full salary.",
    },
  ],
  glosario: [
    { termino: "CPP", definicion: "Canada Pension Plan. Contributions come off your pay and fund your CPP retirement pension." },
    { termino: "EI", definicion: "Employment Insurance. Premiums come off your pay and fund benefits if you lose your job or take parental leave." },
    { termino: "YMPE", definicion: "Year's maximum pensionable earnings: {{ca.cpp[ympe]}} in 2026. CPP is charged up to this amount." },
  ],
});
