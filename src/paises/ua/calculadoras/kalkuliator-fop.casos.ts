import { definirCasos } from "@/motor/calculo";
import kalkuliatorFop from "./kalkuliator-fop";

const EP = "https://zir.tax.gov.ua/docs/stavki/sproshena_sistema_opodatkuvannya_(ediniy_podatok).pdf";

export default definirCasos(kalkuliatorFop, [
  {
    nombre: "3 група без ПДВ, 1 000 000 грн за рік",
    origen: { tipo: "recalculado", url: EP, detalle: "ЄП 5 % = 50 000; ВЗ 1 % = 10 000; ЄСВ 8647 × 22 % = 1902,34 × 12 = 22 828,08; разом 82 828,08." },
    fecha: "2026-10-24",
    entrada: { hrupa: "h3", stavka1: null, stavka2: null, pdv: false, dokhid: 1000000, misiatsi: 12 },
    esperado: { ep: 50000, vz: 10000, yesv: 22828.08, razom: 82828.08, naMisiats: 6902.34, limit: 10091049, perevyshchennia: null },
  },
  {
    nombre: "3 група з ПДВ, 2 000 000 грн",
    origen: { tipo: "recalculado", url: EP, detalle: "ЄП 3 % = 60 000; ВЗ 1 % = 20 000; ЄСВ 22 828,08; разом 102 828,08." },
    fecha: "2026-10-24",
    entrada: { hrupa: "h3", stavka1: null, stavka2: null, pdv: true, dokhid: 2000000, misiatsi: 12 },
    esperado: { ep: 60000, vz: 20000, razom: 102828.08 },
  },
  {
    nombre: "2 група з максимальною ставкою",
    origen: { tipo: "recalculado", url: EP, detalle: "ЄП 20 % × 8647 = 1729,40 × 12 = 20 752,80; ВЗ 10 % × 8647 = 864,70 × 12 = 10 376,40; ЄСВ 22 828,08; разом 53 957,28." },
    fecha: "2026-10-24",
    entrada: { hrupa: "h2", stavka1: null, stavka2: 20, pdv: null, dokhid: 1500000, misiatsi: 12 },
    esperado: { ep: 20752.8, vz: 10376.4, yesv: 22828.08, razom: 53957.28, limit: 7211598 },
  },
  {
    nombre: "1 група з максимальною ставкою",
    origen: { tipo: "recalculado", url: EP, detalle: "ЄП 10 % × 3328 = 332,80 × 12 = 3993,60; ВЗ 10 376,40; ЄСВ 22 828,08; разом 37 198,08; ліміт 167 × 8647 = 1 444 049." },
    fecha: "2026-10-24",
    entrada: { hrupa: "h1", stavka1: 10, stavka2: null, pdv: null, dokhid: 500000, misiatsi: 12 },
    esperado: { ep: 3993.6, razom: 37198.08, limit: 1444049 },
  },
  {
    nombre: "2 група з перевищенням ліміту",
    origen: { tipo: "recalculado", url: EP, detalle: "8 000 000 − 7 211 598 = 788 402; 15 % = 118 260,30." },
    fecha: "2026-10-24",
    entrada: { hrupa: "h2", stavka1: null, stavka2: 20, pdv: null, dokhid: 8000000, misiatsi: 12 },
    esperado: { perevyshchennia: 118260.3 },
  },
  {
    nombre: "Ставка 2 групи понад 20 %",
    origen: { tipo: "recalculado", url: EP, detalle: "Ставка 2 групи не більше 20 % мінімальної зарплати." },
    fecha: "2026-10-24",
    entrada: { hrupa: "h2", stavka1: null, stavka2: 25, pdv: null, dokhid: 100000, misiatsi: 12 },
    esperaError: true,
  },
]);
