import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lt.sodra-imokos",
  h1: "Sodros įmokos {{anio}}: VSD ir PSD skaičiuoklė",
  title: "Sodros įmokos {{anio}}: VSD ir PSD skaičiuoklė",
  description: "Apskaičiuokite VSD, PSD ir papildomo pensijų kaupimo įmokas nuo atlyginimo ant popieriaus bei darbdavio įmokas pagal sutartį.",
  intro: [
    "Skaičiuoklė išskaido darbuotojo ir darbdavio įmokas nuo mėnesio atlyginimo.",
  ],
  comoSeCalcula: [
    "VSD ir kaupimo įmokoms taikomos lubos pagal VDU.",
    "PSD skaičiuojama nuo viso atlyginimo.",
  ],
  faq: [],
  glosario: [],
});
