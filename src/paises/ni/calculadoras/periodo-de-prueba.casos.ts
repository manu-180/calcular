import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Contrato por tiempo indeterminado que empieza el 1 de octubre",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 28: hasta 30 días. Del 01/10/2026 contando ese día, el día 30 es el 30/10/2026." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-10-01", tipo: "general" },
    esperado: { dias: 30, fin: "2026-10-30" },
  },
  {
    nombre: "Trabajo doméstico que empieza el 20 de diciembre",
    origen: { tipo: "recalculado", detalle: "Código del Trabajo art. 148: los primeros 15 días. Del 20/12/2026 al 03/01/2027, cruzando el año." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-12-20", tipo: "domestico" },
    esperado: { dias: 15, fin: "2027-01-03" },
  },
]);
