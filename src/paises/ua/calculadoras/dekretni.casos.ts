import { definirCasos } from "@/motor/calculo";
import dekretni from "./dekretni";

const PFU = "https://www.pfu.gov.ua/2163383-rozmir-dopomogy-po-vagitnosti-ta-pologah/";

export default definirCasos(dekretni, [
  {
    nombre: "300 000 грн за рік, 126 днів",
    origen: { tipo: "recalculado", url: PFU, detalle: "300 000 / 365 = 821,92; 100 %; × 126 = 103 561,92." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 300000, dni: 365, typ: "zvychaini" },
    esperado: { serednodenna: 821.92, dni: 126, suma: 103561.92 },
  },
  {
    nombre: "Ускладнені пологи: 140 днів",
    origen: { tipo: "recalculado", url: "https://www.pfu.gov.ua/rv/226108-dopomoga-u-zv-yazku-z-vagitnistyu-i-pologamy-3/", detalle: "821,92 × 140 = 115 068,80." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 300000, dni: 365, typ: "uskladneni" },
    esperado: { dni: 140, suma: 115068.8 },
  },
  {
    nombre: "Низький заробіток: мінімум з мінімальної зарплати",
    origen: { tipo: "recalculado", url: PFU, detalle: "50 000 / 365 = 136,99 < 8647 / 30,44 = 284,07; × 126 = 35 792,82." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 50000, dni: 365, typ: "zvychaini" },
    esperado: { serednodenna: 284.07, suma: 35792.82 },
  },
  {
    nombre: "Високий заробіток: межа максимальної бази",
    origen: { tipo: "recalculado", url: PFU, detalle: "3 000 000 / 365 = 8219,18 > 172 940 / 30,44 = 5681,34; × 126 = 715 848,84." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 3000000, dni: 365, typ: "zvychaini" },
    esperado: { serednodenna: 5681.34, suma: 715848.84 },
  },
  {
    nombre: "Без заробітку",
    origen: { tipo: "recalculado", url: PFU, detalle: "Без заробітку середню зарплату не обчислити." },
    fecha: "2026-10-24",
    entrada: { zarobitok: 0, dni: 365, typ: "zvychaini" },
    esperaError: true,
  },
]);
