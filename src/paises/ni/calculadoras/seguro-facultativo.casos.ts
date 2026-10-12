import { definirCasos } from "@/motor/calculo";
import seguroFacultativo from "./seguro-facultativo";

export default definirCasos(seguroFacultativo, [
  {
    nombre: "Facultativo integral con C$10,000",
    origen: { tipo: "recalculado", detalle: "Decreto 06-2019, artículo 26 reformado: 22.25 %. 10000 × 22.25 % = 2225; × 12 = 26700." },
    fecha: "2026-10-12",
    entrada: { ingreso: 10000, modalidad: "integral" },
    esperado: { tasa: 22.25, mensual: 2225, anual: 26700 },
  },
  {
    nombre: "Facultativo IVM con C$8,000",
    origen: { tipo: "recalculado", detalle: "IVM: 14 %. 8000 × 14 % = 1120." },
    fecha: "2026-10-12",
    entrada: { ingreso: 8000, modalidad: "ivm" },
    esperado: { tasa: 14, mensual: 1120 },
  },
]);
