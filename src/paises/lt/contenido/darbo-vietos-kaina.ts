import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.darbo-vietos-kaina",
  h1: "Darbo vietos kaina {{anio}}: darbdavio išlaidos",
  title: "Darbo vietos kaina {{anio}}: darbdavio įmokos ir išlaidos",
  description: "Apskaičiuokite, kiek darbdaviui kainuoja darbuotojas: atlyginimas ant popieriaus ir darbdavio įmokos pagal darbo sutarties rūšį.",
  intro: [
    "Skaičiuoklė prie atlyginimo ant popieriaus prideda darbdavio įmokas pagal sutarties rūšį.",
  ],
  comoSeCalcula: [
    "Darbdavio įmokos skaičiuojamos nuo atlyginimo ant popieriaus.",
    "Metinė kaina yra mėnesio kaina, padauginta iš dvylikos.",
  ],
  faq: [],
  glosario: [],
});
