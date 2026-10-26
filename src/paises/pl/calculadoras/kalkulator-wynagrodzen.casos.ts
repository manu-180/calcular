import { definirCasos } from "@/motor/calculo";
import kalkulatorWynagrodzen from "./kalkulator-wynagrodzen";

const PIT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000592";

export default definirCasos(kalkulatorWynagrodzen, [
  {
    nombre: "Płaca minimalna 2026: 4806 zł brutto",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "ZUS 469,07 + 72,09 + 117,75 = 658,91; zdrowotna 9 % z 4147,09 = 373,24; podstawa 4806 − 658,91 − 250 = 3897; zaliczka 12 % = 467,64 − 300 = 168; netto 3605,85.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 4806, koszty: "standard", pit2: true, mlody: false },
    esperado: { emerytalne: 469.07, rentowe: 72.09, chorobowe: 117.75, zdrowotna: 373.24, zaliczka: 168, nettoStyczen: 3605.85, nettoSrednio: 3605.85 },
  },
  {
    nombre: "8000 zł brutto, bez przekroczenia progu",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "ZUS 1096,80; zdrowotna 9 % z 6903,20 = 621,29; podstawa 6653; zaliczka 798,36 − 300 = 498; netto 5783,91 przez cały rok.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 8000, koszty: "standard", pit2: true, mlody: false },
    esperado: { nettoStyczen: 5783.91, nettoGrudzien: 5783.91, nettoSrednio: 5783.91, pitRoczny: 5976 },
  },
  {
    nombre: "15 000 zł brutto: próg 120 000 zł w październiku",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "Podstawa 12 694 zł miesięcznie. Po 9 miesiącach 114 246 zł; w październiku 5754 zł po 12 % i 6940 zł po 32 % = 2911,28 − 300 = 2611; listopad i grudzień 4062,08 − 300 = 3762. Netto w styczniu 10 555,58, w grudniu 8016,58.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 15000, koszty: "standard", pit2: true, mlody: false },
    esperado: { zdrowotna: 1164.92, zaliczka: 1223, nettoStyczen: 10555.58, nettoGrudzien: 8016.58, pitRoczny: 21142 },
  },
  {
    nombre: "Ulga dla młodych: 8000 zł brutto, limit 85 528 zł w listopadzie",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "Do października przychód 80 000 zł jest zwolniony. W listopadzie opodatkowane 2472 zł: podstawa 1883 zł, 12 % = 225,96 minus 300 daje 0. Grudzień jak bez ulgi: zaliczka 498 zł. Netto w styczniu 8000 − 1096,80 − 621,29 = 6281,91.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 8000, koszty: "standard", pit2: true, mlody: true },
    esperado: { zaliczka: 0, nettoStyczen: 6281.91, nettoGrudzien: 5783.91, pitRoczny: 498 },
  },
  {
    nombre: "Dojazd z innej miejscowości: koszty 300 zł",
    origen: {
      tipo: "recalculado",
      url: PIT,
      detalle: "Podstawa 8000 − 1096,80 − 300 = 6603,20 → 6603; zaliczka 792,36 − 300 = 492; netto 8000 − 1096,80 − 621,29 − 492 = 5789,91.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 8000, koszty: "dojazd", pit2: true, mlody: false },
    esperado: { zaliczka: 492, nettoStyczen: 5789.91 },
  },
  {
    nombre: "Brutto zero",
    origen: { tipo: "recalculado", url: PIT, detalle: "Bez wynagrodzenia nie ma czego liczyć." },
    fecha: "2026-10-24",
    entrada: { brutto: 0, koszty: "standard", pit2: true, mlody: false },
    esperaError: true,
  },
]);
