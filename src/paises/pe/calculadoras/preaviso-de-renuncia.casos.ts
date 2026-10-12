import { definirCasos } from "@/motor/calculo";
import preavisoDeRenuncia from "./preaviso-de-renuncia";

export default definirCasos(preavisoDeRenuncia, [
  {
    nombre: "Carta entregada el 12/10/2026",
    origen: { tipo: "recalculado", detalle: "DS 003-97-TR, art. 18: 30 días de anticipación. 12/10/2026 + 30 días = 11/11/2026." },
    fecha: "2026-10-12",
    entrada: { fechaAviso: "2026-10-12", exoneracion: false },
    esperado: { dias: 30, ultimoDia: "2026-11-11", respuestaHasta: null },
  },
  {
    nombre: "Con pedido de exoneración a fin de año",
    origen: { tipo: "recalculado", detalle: "Aviso 15/12/2026: + 30 días = 14/1/2027. El empleador tiene hasta el tercer día (18/12/2026) para rechazar la exoneración." },
    fecha: "2026-12-15",
    entrada: { fechaAviso: "2026-12-15", exoneracion: true },
    esperado: { ultimoDia: "2027-01-14", respuestaHasta: "2026-12-18" },
  },
]);
