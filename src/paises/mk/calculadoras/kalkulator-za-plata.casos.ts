import { definirCasos } from "@/motor/calculo";
import kalkulatorZaPlata from "./kalkulator-za-plata";

const UJP = "https://www.ujp.gov.mk/mk/vodic/category/643";

export default definirCasos(kalkulatorZaPlata, [
  {
    nombre: "60.000 денари бруто, ноември 2026",
    origen: { tipo: "recalculado", url: UJP, detalle: "Придонеси 28 % = 16.800; основица 60.000 − 16.800 − 10.932 = 32.268; данок 10 % = 3.226,8; нето 39.973,2." },
    fecha: "2026-11-01",
    entrada: { bruto: 60000 },
    esperado: { neto: 39973, pridonesi: 16800, danok: 3227, pio: 11940, zdravstvo: 4500, nevrabotenost: 60 },
  },
  {
    nombre: "Истата плата пред промената на стапките, јуни 2026",
    origen: { tipo: "recalculado", url: "https://www.ujp.gov.mk/mk/vodic/category/641", detalle: "До 30.06.2026: 18,8 + 7,5 + 0,5 + 1,2 = 28 %; ПИО 11.280, невработеност 720." },
    fecha: "2026-06-30",
    entrada: { bruto: 60000 },
    esperado: { neto: 39973, pio: 11280, nevrabotenost: 720 },
  },
  {
    nombre: "Над највисоката основица: 1.200.000 денари",
    origen: { tipo: "recalculado", url: "https://www.ujp.gov.mk/mk/vodic/category/640", detalle: "16 × 69.141 = 1.106.256; придонеси 28 % = 309.751,68; основица 1.200.000 − 309.751,68 − 10.932 = 879.316,32; данок 87.931,63; нето 802.316,69." },
    fecha: "2026-11-01",
    entrada: { bruto: 1200000 },
    esperado: { pridonesi: 309752, danok: 87932, neto: 802317 },
  },
  {
    nombre: "Под најниската основица: 30.000 денари",
    origen: { tipo: "recalculado", url: "https://www.ujp.gov.mk/mk/vodic/category/640", detalle: "50 % од 69.141 = 34.570,5; придонеси 28 % = 9.679,74; основица 30.000 − 9.679,74 − 10.932 = 9.388,26; данок 938,83; нето 19.381,43." },
    fecha: "2026-11-01",
    entrada: { bruto: 30000 },
    esperado: { pridonesi: 9680, danok: 939, neto: 19381 },
  },
  {
    nombre: "Нулта плата",
    origen: { tipo: "recalculado", url: UJP, detalle: "Без бруто-плата нема пресметка." },
    fecha: "2026-11-01",
    entrada: { bruto: 0 },
    esperaError: true,
  },
]);
