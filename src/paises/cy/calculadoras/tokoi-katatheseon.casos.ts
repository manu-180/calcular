import { definirCasos } from "@/motor/calculo";
import { URL_AMYNA } from "../lib/fuentes-url";
import tokoiKatatheseon from "./tokoi-katatheseon";

export default definirCasos(tokoiKatatheseon, [
  {
    nombre: "10.000 € με 3% για 12 μήνες",
    origen: { tipo: "recalculado", url: URL_AMYNA, detalle: "Τόκοι 300. Άρθρο 3Β: άμυνα 17% = 51. ΓεΣΥ 2,65% = 7,95. Καθαρά 241,05." },
    fecha: "2026-10-26",
    entrada: { kefalaio: 10000, epitokio: 3, mines: 12 },
    esperado: { tokos: 300, amyna: 51, gesy: 7.95, kathara: 241.05, apodosi: 2.41 },
  },
  {
    nombre: "20.000 € με 2,5% για 6 μήνες",
    origen: { tipo: "recalculado", url: URL_AMYNA, detalle: "20000 × 2,5% × 6/12 = 250. Άμυνα 42,50. ΓεΣΥ 6,63. Καθαρά 200,87." },
    fecha: "2026-10-26",
    entrada: { kefalaio: 20000, epitokio: 2.5, mines: 6 },
    esperado: { tokos: 250, amyna: 42.5, gesy: 6.63, kathara: 200.87 },
  },
]);
