import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.ligos-pasalpa",
  h1: "Ligos pašalpos skaičiuoklė {{anio}}",
  title: "Ligos pašalpos skaičiuoklė {{anio}}: darbdavys ir Sodra",
  description: "Apskaičiuokite ligos pašalpą pagal vidutinį užmokestį ir ligos dienas, atskirai parodant darbdavio ir Sodros mokamą dalį.",
  intro: [
    "Skaičiuoklė parodo ligos pašalpą ir kas ją moka.",
  ],
  comoSeCalcula: [
    "Pirmas dienas apmoka darbdavys, vėlesnes Sodra.",
  ],
  faq: [],
  glosario: [],
});
