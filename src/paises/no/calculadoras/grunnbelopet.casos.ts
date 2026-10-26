import { definirCasos } from "@/motor/calculo";
import grunnbelopet from "./grunnbelopet";

const NAV = "https://www.nav.no/grunnbelopet";

export default definirCasos(grunnbelopet, [
  {
    nombre: "6 G fra 1. mai 2026",
    origen: { tipo: "oficial", url: NAV, detalle: "Nav: 6 G = 819 294 kr (6 × 136 549)." },
    fecha: "2026-10-24",
    entrada: { retning: "g-til-kr", verdi: 6 },
    esperado: { kroner: 819294, g: 136549 },
  },
  {
    nombre: "Kroner til G",
    origen: { tipo: "recalculado", url: NAV, detalle: "600 000 / 136 549 = 4,394 G." },
    fecha: "2026-10-24",
    entrada: { retning: "kr-til-g", verdi: 600000 },
    esperado: { antallG: 4.394 },
    tolerancia: 0.001,
  },
  {
    nombre: "Før 1. mai 2026 gjaldt 130 160 kr",
    origen: { tipo: "oficial", url: NAV, detalle: "G fra 1. mai 2025: 130 160. 2 G = 260 320." },
    fecha: "2026-04-30",
    entrada: { retning: "g-til-kr", verdi: 2 },
    esperado: { kroner: 260320 },
  },
]);
