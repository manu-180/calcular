import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.atlyginimo-skaiciuokle",
  h1: "Atlyginimo skaičiuoklė {{anio}}: į rankas ir ant popieriaus",
  title: "Atlyginimo skaičiuoklė {{anio}}: kiek gausite į rankas",
  description: "Įveskite atlyginimą ant popieriaus ir apskaičiuokite, kiek gausite į rankas po GPM, VSD ir PSD, su NPD ir papildomu pensijų kaupimu.",
  intro: [
    "Skaičiuoklė iš atlyginimo ant popieriaus apskaičiuoja sumą į rankas: atima GPM, VSD ir PSD, įvertina NPD ir papildomą pensijų kaupimą.",
  ],
  comoSeCalcula: [
    "Pirmiausia nustatomas NPD pagal atlyginimą.",
    "GPM skaičiuojamas nuo atlyginimo, sumažinto NPD suma.",
    "VSD, PSD ir, jei dalyvaujate, papildomas pensijų kaupimas skaičiuojami nuo atlyginimo ant popieriaus.",
  ],
  faq: [],
  glosario: [],
});
