import { definirCasos } from "@/motor/calculo";
import kalkulatorPcc from "./kalkulator-pcc";

const PCC = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000191";

export default definirCasos(kalkulatorPcc, [
  {
    nombre: "Samochód za 30 000 zł",
    origen: { tipo: "recalculado", url: PCC, detalle: "Art. 7 ust. 1 pkt 1 lit. a: 30 000 × 2 % = 600 zł." },
    fecha: "2026-10-24",
    entrada: { czynnosc: "ruchoma", wartosc: 30000 },
    esperado: { stawka: 2, podatek: 600 },
  },
  {
    nombre: "Mieszkanie z rynku wtórnego za 487 250,60 zł",
    origen: { tipo: "recalculado", url: PCC, detalle: "Podstawa 487 251 zł; 2 % = 9745,02 → 9745 zł." },
    fecha: "2026-10-24",
    entrada: { czynnosc: "nieruchomosc", wartosc: 487250.6 },
    esperado: { podstawa: 487251, podatek: 9745 },
  },
  {
    nombre: "Rower za 900 zł: zwolnienie",
    origen: { tipo: "recalculado", url: PCC, detalle: "Art. 9 pkt 6: rzecz ruchoma do 1000 zł zwolniona." },
    fecha: "2026-10-24",
    entrada: { czynnosc: "ruchoma", wartosc: 900 },
    esperado: { podatek: 0 },
  },
  {
    nombre: "Pożyczka 20 000 zł",
    origen: { tipo: "recalculado", url: PCC, detalle: "Art. 7 ust. 1 pkt 4: 0,5 % z 20 000 = 100 zł." },
    fecha: "2026-10-24",
    entrada: { czynnosc: "pozyczka", wartosc: 20000 },
    esperado: { stawka: 0.5, podatek: 100 },
  },
]);
