import { definirCasos } from "@/motor/calculo";
import kostoEPunedhenesit from "./kosto-e-punedhenesit";

const V = "https://tatime.gov.al/wp-content/uploads/2026/09/VKM-Nr.-77-date-28.1.2015-_Per-kontributet-e-detyrueshme-dhe-perfitimet-nga-sistemi-i-sigurimeve-shoqerore-dhe-sigurimi-i-kujdesit-shendetesor_-ndryshuar_.pdf";

export default definirCasos(kostoEPunedhenesit, [
  {
    nombre: "Paga minimale",
    origen: { tipo: "recalculado", url: V, detalle: "50 000 + 15% 7 500 + 1,7% 850 = 58 350." },
    fecha: "2026-10-30",
    entrada: { bruto: 50000, punonjes: 1, tavani: null },
    esperado: { kosto: 58350, shoqerore: 7500, shendetesore: 850 },
  },
  {
    nombre: "100 000, tre punonjës",
    origen: { tipo: "recalculado", url: V, detalle: "(100 000 + 15 000 + 1 700) × 3 = 350 100; në vit 4 201 200." },
    fecha: "2026-10-30",
    entrada: { bruto: 100000, punonjes: 3, tavani: null },
    esperado: { kosto: 350100, vjetore: 4201200 },
  },
  {
    nombre: "300 000 pa tavan",
    origen: { tipo: "recalculado", url: V, detalle: "15% = 45 000; 1,7% = 5 100; kosto 350 100." },
    fecha: "2026-10-30",
    entrada: { bruto: 300000, punonjes: 1, tavani: null },
    esperado: { shoqerore: 45000, shendetesore: 5100, kosto: 350100 },
  },
  {
    nombre: "300 000 me tavan që e shkruan personi",
    origen: { tipo: "recalculado", url: V, detalle: "Tavan i shkruar 200 000: 15% = 30 000; 1,7% × 300 000 = 5 100; kosto 335 100. Prova vetëm e formulës." },
    fecha: "2026-10-30",
    entrada: { bruto: 300000, punonjes: 1, tavani: 200000 },
    esperado: { shoqerore: 30000, shendetesore: 5100, kosto: 335100 },
  },
  {
    nombre: "Pagë zero",
    origen: { tipo: "recalculado", url: V, detalle: "Pa pagë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { bruto: 0, punonjes: 1, tavani: null },
    esperaError: true,
  },
]);
