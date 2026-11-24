import { definirCasos } from "@/motor/calculo";
import kalkulatorZaPridonesi from "./kalkulator-za-pridonesi";

const OSN = "https://www.ujp.gov.mk/mk/vodic/category/640";

export default definirCasos(kalkulatorZaPridonesi, [
  {
    nombre: "Вработен со 60.000 денари",
    origen: { tipo: "recalculado", url: OSN, detalle: "60.000 × 19,9 % = 11.940; × 7,5 % = 4.500; × 0,5 % = 300; × 0,1 % = 60; вкупно 16.800." },
    fecha: "2026-11-01",
    entrada: { bruto: 60000, vid: "rabotnik" },
    esperado: { vkupno: 16800, pio: 11940, zdravstvo: 4500, dopolnitelen: 300, nevrabotenost: 60, najniska: 34571, najvisoka: 1106256 },
  },
  {
    nombre: "Самовработен, плата над таванот",
    origen: { tipo: "recalculado", url: OSN, detalle: "Највисока основица 12 × 69.141 = 829.692; 28 % = 232.313,76." },
    fecha: "2026-11-01",
    entrada: { bruto: 1000000, vid: "samovraboten" },
    esperado: { osnovica: 829692, vkupno: 232314 },
  },
  {
    nombre: "Интелектуална услуга: најниска основица е цела просечна плата",
    origen: { tipo: "recalculado", url: OSN, detalle: "Најниска основица 69.141; 28 % = 19.359,48." },
    fecha: "2026-11-01",
    entrada: { bruto: 40000, vid: "intelektualna" },
    esperado: { osnovica: 69141, vkupno: 19359 },
  },
  {
    nombre: "Пред 1 јули 2026 година: невработеност 1,2 %",
    origen: { tipo: "recalculado", url: "https://www.ujp.gov.mk/mk/vodic/category/641", detalle: "60.000 × 18,8 % = 11.280; × 1,2 % = 720." },
    fecha: "2026-06-30",
    entrada: { bruto: 60000, vid: "rabotnik" },
    esperado: { pio: 11280, nevrabotenost: 720, vkupno: 16800 },
  },
]);
