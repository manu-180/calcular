import { definirCasos } from "@/motor/calculo";
import calc from "./tryggingagjald";

export default definirCasos(calc, [
  {
    nombre: "Dæmi Skattsins",
    origen: { tipo: "oficial", url: "https://www.skatturinn.is/media/2026/rsk_0601_1_2026.is.pdf", detalle: "6,35% af 669.000 = 42.482 í dæmi orðsendingar 1/2026." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, motframlag: true, sjomadur: false },
    esperado: { stofn: 669000, gjald: 42482 },
  },
  {
    nombre: "Án mótframlags",
    origen: { tipo: "recalculado", detalle: "600.000 x 6,35% = 38.100." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, motframlag: false, sjomadur: false },
    esperado: { gjald: 38100 },
  },
  {
    nombre: "Sjómaður",
    origen: { tipo: "recalculado", detalle: "669.000 x 7% = 46.830." },
    fecha: "2026-06-15",
    entrada: { laun: 600000, motframlag: true, sjomadur: true },
    esperado: { gjald: 46830 },
  },
]);
