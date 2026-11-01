import { definirCasos } from "@/motor/calculo";
import koerselsfradrag from "./koerselsfradrag";

const SKAT = "https://skat.dk/borger/fradrag/koerselsfradrag/beregn-dit-koerselsfradrag";

export default definirCasos(koerselsfradrag, [
  {
    nombre: "60 km tur-retur i 216 dage, København",
    origen: {
      tipo: "recalculado",
      url: SKAT,
      detalle: "2026: 36 km × 3,17 = 114,12 kr. pr. dag; × 216 = 24.649,92. Skatteværdi med kommuneskat 23,39 % og kirkeskat 0,80 %: 5.962,82.",
    },
    fecha: "2026-10-24",
    entrada: { km: 60, dage: 216, yderkommune: false, kommune: "koebenhavn", kirkeskat: true },
    esperado: { prDag: 114.12, fradrag: 24649.92, vaerdi: 5962.82, vaerdiMaaned: 496.9 },
  },
  {
    nombre: "150 km tur-retur: lavere sats over 120 km",
    origen: { tipo: "recalculado", url: SKAT, detalle: "96 km × 3,17 + 30 km × 1,59 = 352,02 kr. pr. dag; × 200 = 70.404." },
    fecha: "2026-10-24",
    entrada: { km: 150, dage: 200, yderkommune: false, kommune: "aarhus", kirkeskat: false },
    esperado: { prDag: 352.02, fradrag: 70404 },
  },
  {
    nombre: "Yderkommune: samme sats over 120 km",
    origen: { tipo: "recalculado", url: SKAT, detalle: "126 km × 3,51 = 442,26 kr. pr. dag." },
    fecha: "2026-10-24",
    entrada: { km: 150, dage: 1, yderkommune: true, kommune: "lolland", kirkeskat: false },
    esperado: { prDag: 442.26, fradrag: 442.26 },
  },
  {
    nombre: "20 km tur-retur: intet fradrag",
    origen: { tipo: "recalculado", url: SKAT, detalle: "0-24 km giver intet fradrag." },
    fecha: "2026-10-24",
    entrada: { km: 20, dage: 216, yderkommune: false, kommune: "koebenhavn", kirkeskat: true },
    esperado: { fradrag: 0, vaerdi: 0 },
  },
]);
