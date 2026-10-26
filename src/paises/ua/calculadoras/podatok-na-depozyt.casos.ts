import { definirCasos } from "@/motor/calculo";
import podatokNaDepozyt from "./podatok-na-depozyt";

const PDFO = "https://zir.tax.gov.ua/docs/stavki/podatok_na_dohody_fizychnyh_osib.pdf";

export default definirCasos(podatokNaDepozyt, [
  {
    nombre: "100 000 грн на рік під 14 % без капіталізації",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Проценти 14 000; ПДФО 18 % = 2520; ВЗ 5 % = 700 (ЗІР 126.03: проценти за депозитами); чистими 10 780." },
    fecha: "2026-10-24",
    entrada: { suma: 100000, stavka: 14, misiatsi: 12, kapitalizatsiia: false },
    esperado: { procenty: 14000, pdfo: 2520, vz: 700, chysti: 10780, kinets: 110780, efektyvna: 10.78 },
  },
  {
    nombre: "З щомісячною капіталізацією",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Щомісяця проценти 14 % / 12 від залишку, податки утримують із кожного нарахування, решту додають до вкладу: проценти 14 712,86; ПДФО 2648,33; ВЗ 735,64; чистими 11 328,89." },
    fecha: "2026-10-24",
    entrada: { suma: 100000, stavka: 14, misiatsi: 12, kapitalizatsiia: true },
    esperado: { procenty: 14712.86, pdfo: 2648.33, vz: 735.64, chysti: 11328.89 },
  },
  {
    nombre: "Пів року під 12 %",
    origen: { tipo: "recalculado", url: PDFO, detalle: "50 000 × 12 % × 6 / 12 = 3000; ПДФО 540; ВЗ 150; чистими 2310." },
    fecha: "2026-10-24",
    entrada: { suma: 50000, stavka: 12, misiatsi: 6, kapitalizatsiia: false },
    esperado: { chysti: 2310 },
  },
  {
    nombre: "Нульова сума",
    origen: { tipo: "recalculado", url: PDFO, detalle: "Без вкладу процентів немає." },
    fecha: "2026-10-24",
    entrada: { suma: 0, stavka: 14, misiatsi: 12, kapitalizatsiia: false },
    esperaError: true,
  },
]);
