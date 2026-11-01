import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.individuali-veikla",
  h1: "Individuali veikla {{anio}}: mokesčių skaičiuoklė",
  title: "Individuali veikla {{anio}}: GPM, VSD ir PSD skaičiuoklė",
  description: "Apskaičiuokite individualios veiklos GPM, VSD ir PSD pagal metines pajamas ir faktines sąnaudas arba normą.",
  intro: [
    "Skaičiuoklė parodo, kiek iš individualios veiklos pajamų lieka sumokėjus GPM, VSD ir PSD.",
  ],
  comoSeCalcula: [
    "Iš pajamų atimamos sąnaudos.",
    "GPM tarifas priklauso nuo pelno dydžio.",
    "Įmokos skaičiuojamos nuo pelno dalies.",
  ],
  faq: [],
  glosario: [],
});
