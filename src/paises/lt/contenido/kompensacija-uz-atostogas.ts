import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.kompensacija-uz-atostogas",
  h1: "Kompensacija už nepanaudotas atostogas {{anio}}",
  title: "Kompensacija už nepanaudotas atostogas {{anio}}",
  description: "Apskaičiuokite kompensaciją už nepanaudotas atostogas pagal paskutinių trijų mėnesių užmokestį ir nepanaudotų dienų skaičių.",
  intro: [
    "Skaičiuoklė apskaičiuoja kompensaciją už nepanaudotas atostogas baigiant darbo santykius.",
  ],
  comoSeCalcula: [
    "Vidutinis dienos užmokestis padauginamas iš nepanaudotų dienų.",
  ],
  faq: [],
  glosario: [],
});
