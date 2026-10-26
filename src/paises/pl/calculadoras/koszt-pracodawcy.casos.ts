import { definirCasos } from "@/motor/calculo";
import kosztPracodawcy from "./koszt-pracodawcy";

const BUDZET = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260000062";

export default definirCasos(kosztPracodawcy, [
  {
    nombre: "8000 zł brutto, pełne składki",
    origen: {
      tipo: "recalculado",
      url: BUDZET,
      detalle: "Emerytalna 9,76 % = 780,80; rentowa 6,5 % = 520; wypadkowa 1,67 % = 133,60; FP 1 % = 80; FS 1,45 % = 116; FGŚP 0,10 % = 8. Razem 1638,40; koszt 9638,40.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 8000, wypadkowa: null, fpFs: true, fgsp: true },
    esperado: { emerytalne: 780.8, rentowe: 520, wypadkowe: 133.6, fp: 80, fs: 116, fgsp: 8, narzut: 1638.4, koszt: 9638.4 },
  },
  {
    nombre: "Płaca minimalna, stopa wypadkowa 0,93 %, bez FP i FS",
    origen: {
      tipo: "recalculado",
      url: BUDZET,
      detalle: "4806 × (9,76 + 6,5 + 0,93 + 0,10) %: 469,07 + 312,39 + 44,70 + 4,81 = 830,97; koszt 5636,97.",
    },
    fecha: "2026-10-24",
    entrada: { brutto: 4806, wypadkowa: 0.93, fpFs: false, fgsp: true },
    esperado: { narzut: 830.97, koszt: 5636.97 },
  },
]);
