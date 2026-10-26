import { definirCasos } from "@/motor/calculo";
import ponadnormovi from "./ponadnormovi";

const DSP = "https://dp.dsp.gov.ua/novyny/oplata-ponadnormovykh-hodyn-pratsivnykam-za-zminnym-hrafikom-iz-pidsumovanym-oblikom-robochoho-chasu/";

export default definirCasos(ponadnormovi, [
  {
    nombre: "Оклад 25 000 грн, норма 168 годин, 10 надурочних",
    origen: { tipo: "recalculado", url: DSP, detalle: "25 000 / 168 = 148,81; × 2 × 10 = 2976,20; ПДФО 535,72; ВЗ 148,81; на руки 2291,67." },
    fecha: "2026-10-24",
    entrada: { sposib: "oklad", oklad: 25000, norma: 168, stavka: null, hodyny: 10 },
    esperado: { hodynna: 148.81, nadurochnaHodyna: 297.62, oplata: 2976.2, dodatkovo: 1488.1, naRuky: 2291.67 },
  },
  {
    nombre: "Погодинна ставка 150 грн, 6 годин",
    origen: { tipo: "recalculado", url: DSP, detalle: "150 × 2 × 6 = 1800." },
    fecha: "2026-10-24",
    entrada: { sposib: "hodynna", oklad: null, norma: null, stavka: 150, hodyny: 6 },
    esperado: { oplata: 1800, dodatkovo: 900 },
  },
  {
    nombre: "Нуль годин",
    origen: { tipo: "recalculado", url: DSP, detalle: "Без надурочних годин доплати немає." },
    fecha: "2026-10-24",
    entrada: { sposib: "hodynna", oklad: null, norma: null, stavka: 150, hodyny: 0 },
    esperaError: true,
  },
]);
