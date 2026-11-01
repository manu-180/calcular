import { definirCasos } from "@/motor/calculo";
import calc from "./launakostnadur";

export default definirCasos(calc, [
  {
    nombre: "Dæmi Skattsins: 600.000 kr. laun",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/media/2026/rsk_0601_1_2026.is.pdf", detalle: "Orðsending 1/2026: mótframlag 69.000 og tryggingagjald 42.482 (6,35% af 669.000)." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, motSereign: 0, sjomadur: false },
    esperado: { motframlag: 69000, tryggingagjald: 42482, heild: 711482 },
  },
  {
    nombre: "Sjómaður",
    origen: { tipo: "recalculado", detalle: "669.000 x 7% = 46.830." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, motSereign: 0, sjomadur: true },
    esperado: { tryggingagjald: 46830, heild: 715830 },
  },
]);
