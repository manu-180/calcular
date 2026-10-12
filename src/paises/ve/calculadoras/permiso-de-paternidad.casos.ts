import { definirCasos } from "@/motor/calculo";
import paternidad from "./permiso-de-paternidad";

export default definirCasos(paternidad, [
  {
    nombre: "Nacimiento el 12 de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "LOTTT art. 339: 14 días continuos desde el nacimiento, del 12 al 25/10/2026. Inamovilidad hasta dos años después: 12/10/2028." },
    fecha: "2026-10-12",
    entrada: { nacimiento: "2026-10-12" },
    esperado: { dias: 14, ultimoDia: "2026-10-25", regreso: "2026-10-26", finInamovilidad: "2028-10-12" },
  },
  {
    nombre: "Nacimiento a fin de mes que cruza el año",
    origen: { tipo: "recalculado", detalle: "Del 25/12/2026, 14 días: último día 07/01/2027." },
    fecha: "2026-10-12",
    entrada: { nacimiento: "2026-12-25" },
    esperado: { ultimoDia: "2027-01-07", regreso: "2027-01-08", finInamovilidad: "2028-12-25" },
  },
]);
