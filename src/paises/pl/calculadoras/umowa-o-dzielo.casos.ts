import { definirCasos } from "@/motor/calculo";
import umowaODzielo from "./umowa-o-dzielo";

const PIT = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000592";

export default definirCasos(umowaODzielo, [
  {
    nombre: "3000 zł brutto z kosztami 20 %",
    origen: { tipo: "recalculado", url: PIT, detalle: "Koszty 20 % = 600; podstawa 2400; zaliczka 12 % = 288; netto 2712." },
    fecha: "2026-10-24",
    entrada: { brutto: 3000, koszty: "standard" },
    esperado: { koszty: 600, podstawa: 2400, podatek: 288, netto: 2712 },
  },
  {
    nombre: "3000 zł brutto z kosztami autorskimi 50 %",
    origen: { tipo: "recalculado", url: PIT, detalle: "Koszty 50 % = 1500; podstawa 1500; zaliczka 180; netto 2820." },
    fecha: "2026-10-24",
    entrada: { brutto: 3000, koszty: "autorskie" },
    esperado: { koszty: 1500, podatek: 180, netto: 2820 },
  },
  {
    nombre: "Zaokrąglenie podstawy: 1234,56 zł",
    origen: { tipo: "recalculado", url: PIT, detalle: "Koszty 246,91; podstawa 987,65 → 988; zaliczka 118,56 → 119; netto 1115,56." },
    fecha: "2026-10-24",
    entrada: { brutto: 1234.56, koszty: "standard" },
    esperado: { koszty: 246.91, podstawa: 988, podatek: 119, netto: 1115.56 },
  },
  {
    nombre: "Mała umowa: 150 zł",
    origen: { tipo: "recalculado", url: PIT, detalle: "Art. 30 ust. 1 pkt 5a: 12 % z 150 = 18; netto 132." },
    fecha: "2026-10-24",
    entrada: { brutto: 150, koszty: "standard" },
    esperado: { podatek: 18, netto: 132 },
  },
]);
