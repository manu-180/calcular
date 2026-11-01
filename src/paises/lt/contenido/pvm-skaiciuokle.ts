import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.pvm-skaiciuokle",
  h1: "PVM skaičiuoklė {{anio}}: pridėti ir išskirti PVM",
  title: "PVM skaičiuoklė {{anio}}: visi tarifai",
  description: "Pridėkite PVM prie sumos arba išskirkite jį iš sumos pagal standartinį ar lengvatinį tarifą. Įveskite sumą ir pasirinkite tarifą.",
  intro: [
    "Skaičiuoklė prideda PVM prie sumos arba išskiria jį iš sumos pagal pasirinktą tarifą.",
  ],
  comoSeCalcula: [
    "Pridedant: suma padauginama iš tarifo.",
    "Išskiriant: suma padalijama iš vieneto ir tarifo sumos.",
  ],
  faq: [],
  glosario: [],
});
