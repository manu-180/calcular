import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.impozit-pe-dividende",
  h1: "Calculator impozit pe dividende",
  title: "Impozit pe dividende {{anio}}: cota de {{md.impozit-dividende}}",
  description: "Calculați impozitul pe dividende de {{md.impozit-dividende}} și dividendul net care ajunge la asociat, din brut sau din net.",
  intro: [
    "Când o firmă din regimul general împarte profitul asociaților, reține din dividend un impozit de {{md.impozit-dividende}} și îl virează la buget.",
    "Introduceți dividendul brut ca să aflați netul, sau netul dorit ca să aflați cât trebuie distribuit.",
  ],
  comoSeCalcula: [
    "Impozitul este dividendul brut înmulțit cu {{md.impozit-dividende}}.",
    "Dividendul net este brutul minus impozit.",
    "Din net, brutul este netul împărțit la 1 minus cota.",
  ],
  faq: [
    {
      pregunta: "Cât este impozitul pe dividende în 2026?",
      respuesta: "{{md.impozit-dividende}} din dividendul distribuit, în regimul general de impozitare.",
    },
    {
      pregunta: "Cine reține impozitul?",
      respuesta: "Firma care plătește dividendul îl reține la sursă și îl virează la buget. Asociatul primește suma netă.",
    },
    {
      pregunta: "Se aplică și la firmele din alte regimuri?",
      respuesta: "Calculatorul folosește cota din regimul general. Pentru rezidenții unor parcuri sau zone cu regim special verificați regulile lor.",
    },
  ],
  glosario: [
    { termino: "Dividend", definicion: "Partea din profitul net al firmei plătită asociaților sau acționarilor." },
    { termino: "Reținere la sursă", definicion: "Impozitul oprit de plătitor înainte să transfere banii beneficiarului." },
  ],
});
