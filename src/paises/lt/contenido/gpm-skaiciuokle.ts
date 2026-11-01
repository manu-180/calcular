import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.gpm-skaiciuokle",
  h1: "GPM skaičiuoklė {{anio}}: progresinis pajamų mokestis",
  title: "GPM skaičiuoklė {{anio}}: progresiniai tarifai ir ribos",
  description: "Apskaičiuokite metinį gyventojų pajamų mokestį pagal progresinius tarifus ir VDU ribas. Palyginkite su jau sumokėta suma.",
  intro: [
    "Skaičiuoklė taiko progresinius GPM tarifus metinėms darbo pajamoms.",
  ],
  comoSeCalcula: [
    "Iš metinių pajamų atimamas NPD.",
    "Kiekviena pajamų dalis apmokestinama savo tarifu pagal VDU ribas.",
  ],
  faq: [],
  glosario: [],
});
