import { definirCasos } from "@/motor/calculo";
import zarplataNaRuky from "./zarplata-na-ruky";

const ZIR = "https://zir.tax.gov.ua/docs/stavki/podatok_na_dohody_fizychnyh_osib.pdf";

export default definirCasos(zarplataNaRuky, [
  {
    nombre: "19 250 грн на руки",
    origen: { tipo: "recalculado", url: ZIR, detalle: "19 250 / (1 − 0,18 − 0,05) = 25 000; ПДФО 4500; ВЗ 1250; ЄСВ 5500." },
    fecha: "2026-10-24",
    entrada: { naRuky: 19250, osnovne: true },
    esperado: { brutto: 25000, pdfo: 4500, vz: 1250, otrymaete: 19250, yesv: 5500, vytraty: 30500 },
  },
  {
    nombre: "10 000 грн на руки",
    origen: { tipo: "recalculado", url: ZIR, detalle: "10 000 / 0,77 = 12 987,01; ПДФО 2337,66; ВЗ 649,35; на руки 10 000,00; ЄСВ 2857,14." },
    fecha: "2026-10-24",
    entrada: { naRuky: 10000, osnovne: true },
    esperado: { brutto: 12987.01, otrymaete: 10000, yesv: 2857.14 },
  },
  {
    nombre: "Сума на руки нуль",
    origen: { tipo: "recalculado", url: ZIR, detalle: "Без суми нічого рахувати." },
    fecha: "2026-10-24",
    entrada: { naRuky: 0, osnovne: true },
    esperaError: true,
  },
]);
