import { definirCasos } from "@/motor/calculo";
import calc from "./erfdafjarskattur";

export default definirCasos(calc, [
  {
    nombre: "20 milljónir",
    origen: { tipo: "recalculado", detalle: "20.000.000 - 6.789.790 = 13.210.210; x 10% = 1.321.021." },
    fecha: "2026-06-15",
    entrada: { bu: 20000000 },
    esperado: { stofn: 13210210, skattur: 1321021 },
  },
  {
    nombre: "Undir mörkum",
    origen: { tipo: "recalculado", detalle: "5.000.000 er undir 6.789.790." },
    fecha: "2026-06-15",
    entrada: { bu: 5000000 },
    esperado: { skattur: 0 },
  },
]);
