import { definirCasos } from "@/motor/calculo";
import calc from "./lifeyrissjodur";

export default definirCasos(calc, [
  {
    nombre: "Dæmi Skattsins: 600.000 kr. laun",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/media/2026/rsk_0601_1_2026.is.pdf", detalle: "Orðsending 1/2026: iðgjald 24.000 og mótframlag 69.000." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, sereign: 0, motSereign: 0 },
    esperado: { launamadur: 24000, motframlag: 69000, heild: 93000 },
  },
  {
    nombre: "Með séreign",
    origen: { tipo: "recalculado", detalle: "600.000: 2% = 12.000 og 2% = 12.000. 93.000 + 24.000 = 117.000, x 12 = 1.404.000." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, sereign: 2, motSereign: 2 },
    esperado: { heild: 117000, arlega: 1404000 },
  },
]);
