import { definirCasos } from "@/motor/calculo";
import renuncia from "./renuncia";

export default definirCasos(renuncia, [
  {
    nombre: "Carta entregada el 1 de octubre",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 44: aviso por escrito con 15 días de anticipación. 01/10/2026 + 15 días = 16/10/2026." },
    fecha: "2026-10-12",
    entrada: { aviso: "2026-10-01" },
    esperado: { dias: 15, ultimoDia: "2026-10-16" },
  },
  {
    nombre: "Carta entregada a fin de año",
    origen: { tipo: "recalculado", detalle: "22/12/2026 + 15 días = 06/01/2027." },
    fecha: "2026-10-12",
    entrada: { aviso: "2026-12-22" },
    esperado: { ultimoDia: "2027-01-06" },
  },
]);
