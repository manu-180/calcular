import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso-de-renuncia";

export default definirCasos(preaviso, [
  {
    nombre: "Renuncia efectiva el 31 de octubre",
    origen: {
      tipo: "recalculado",
      url: "https://www.asamblea.gob.sv/sites/default/files/documents/decretos/64753625-5A99-425D-B845-BF2719C6A710.pdf",
      detalle: "Art. 2: 15 días antes: 16/10/2026. Art. 8: pago dentro de los 15 días siguientes: 15/11/2026.",
    },
    fecha: "2026-10-12",
    entrada: { efectiva: "2026-10-31", puesto: "general" },
    esperado: { dias: 15, avisarAntesDe: "2026-10-16", pagoHasta: "2026-11-15" },
  },
  {
    nombre: "Jefatura con renuncia efectiva el 1 de marzo",
    origen: { tipo: "recalculado", detalle: "30 días antes del 1/3/2027: 30/1/2027. Pago hasta el 16/3/2027." },
    fecha: "2026-10-12",
    entrada: { efectiva: "2027-03-01", puesto: "jefatura" },
    esperado: { dias: 30, avisarAntesDe: "2027-01-30", pagoHasta: "2027-03-16" },
  },
]);
