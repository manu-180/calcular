import { definirCasos } from "@/motor/calculo";
import prescripcionLaboral from "./prescripcion-laboral";

export default definirCasos(prescripcionLaboral, [
  {
    nombre: "Reclamo de prestaciones después de un despido",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 257: un año. Desde el 15/03/2026 vence el 15/03/2027." },
    fecha: "2026-10-12",
    entrada: { reclamo: "general", desde: "2026-03-15" },
    esperado: { meses: 12, vence: "2027-03-15" },
  },
  {
    nombre: "Pedir el reintegro",
    origen: { tipo: "recalculado", detalle: "Art. 260: un mes. Desde el 31/01/2026, el mes siguiente no tiene 31: vence el 28/02/2026." },
    fecha: "2026-10-12",
    entrada: { reclamo: "reintegro", desde: "2026-01-31" },
    esperado: { meses: 1, vence: "2026-02-28" },
  },
  {
    nombre: "Indemnización por accidente de trabajo",
    origen: { tipo: "recalculado", detalle: "Art. 258: dos años. Desde el 10/10/2026 vence el 10/10/2028." },
    fecha: "2026-10-12",
    entrada: { reclamo: "riesgo-profesional", desde: "2026-10-10" },
    esperado: { meses: 24, vence: "2028-10-10" },
  },
]);
