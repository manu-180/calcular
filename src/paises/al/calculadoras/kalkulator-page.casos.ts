import { definirCasos } from "@/motor/calculo";
import kalkulatorPage from "./kalkulator-page";

const L = "https://tatime.gov.al/wp-content/uploads/2026/09/Ligj-Nr.-29-2023-Per-Tatimin-mbi-te-Ardhurat-i-ndryshuar.pdf";

export default definirCasos(kalkulatorPage, [
  {
    nombre: "Paga minimale 50 000: pa tatim",
    origen: { tipo: "recalculado", url: L, detalle: "Zbritje 50 000 (neni 22): baza 0. Shoqërore 9,5% = 4 750; shëndetësore 1,7% = 850; neto 44 400." },
    fecha: "2026-10-30",
    entrada: { bruto: 50000, tavani: null },
    esperado: { shoqerore: 4750, shendetesore: 850, tatimi: 0, neto: 44400 },
  },
  {
    nombre: "60 000: zbritja e dytë",
    origen: { tipo: "recalculado", url: L, detalle: "Zbritje 35 000; baza 25 000; tatim 13% = 3 250; kontribute 6 720; neto 50 030." },
    fecha: "2026-10-30",
    entrada: { bruto: 60000, tavani: null },
    esperado: { tatimi: 3250, neto: 50030 },
  },
  {
    nombre: "60 001: zbritja bie në 30 000",
    origen: { tipo: "recalculado", url: L, detalle: "Baza 30 001; tatim 3 900; kontribute 5 700 + 1 020; neto 49 381, më pak se me 60 000." },
    fecha: "2026-10-30",
    entrada: { bruto: 60001, tavani: null },
    esperado: { zbritja: 30000, tatimi: 3900, neto: 49381 },
  },
  {
    nombre: "100 000",
    origen: { tipo: "recalculado", url: L, detalle: "Baza 70 000, tatim 9 100; shoqërore 9 500; shëndetësore 1 700; neto 79 700; kosto 116 700." },
    fecha: "2026-10-30",
    entrada: { bruto: 100000, tavani: null },
    esperado: { tatimi: 9100, neto: 79700, kosto: 116700 },
  },
  {
    nombre: "300 000: mbi kufirin e 23%, pa tavan",
    origen: { tipo: "recalculado", url: L, detalle: "Baza vjetore 3 240 000: 265 200 + 276 000 = 541 200, në muaj 45 100. Shoqërore 28 500; shëndetësore 5 100; neto 221 300." },
    fecha: "2026-10-30",
    entrada: { bruto: 300000, tavani: null },
    esperado: { shoqerore: 28500, shendetesore: 5100, tatimi: 45100, neto: 221300 },
  },
  {
    nombre: "300 000 me tavan që e shkruan personi",
    origen: { tipo: "recalculado", url: L, detalle: "Tavan i shkruar 200 000: shoqërore 19 000; shëndetësore 5 100; tatim 45 100; neto 230 800. Prova vetëm e formulës." },
    fecha: "2026-10-30",
    entrada: { bruto: 300000, tavani: 200000 },
    esperado: { shoqerore: 19000, shendetesore: 5100, tatimi: 45100, neto: 230800 },
  },
  {
    nombre: "Nën pagën minimale",
    origen: { tipo: "recalculado", url: L, detalle: "Kontributet mbi 50 000: 5 600; tatim 0; neto 40 000 − 5 600 = 34 400." },
    fecha: "2026-10-30",
    entrada: { bruto: 40000, tavani: null },
    esperado: { shoqerore: 4750, shendetesore: 850, neto: 34400 },
  },
  {
    nombre: "Pagë zero",
    origen: { tipo: "recalculado", url: L, detalle: "Pa pagë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { bruto: 0, tavani: null },
    esperaError: true,
  },
  {
    nombre: "Tavan nën pagën minimale",
    origen: { tipo: "recalculado", url: L, detalle: "Baza nuk zbret nën pagën minimale." },
    fecha: "2026-10-30",
    entrada: { bruto: 100000, tavani: 10000 },
    esperaError: true,
  },
]);
