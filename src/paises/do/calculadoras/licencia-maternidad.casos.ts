import { definirCasos } from "@/motor/calculo";
import licenciaMaternidad from "./licencia-maternidad";

export default definirCasos(licenciaMaternidad, [
  {
    nombre: "Parto probable el 1/12/2026, licencia desde 7 semanas antes",
    origen: { tipo: "recalculado", detalle: "DIDA (ABC 35): desde 7 semanas antes del parto y por 14 semanas. 1/12/2026 menos 49 días = 13/10/2026. 98 días hasta el 18/1/2027." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-01", desde: "antes" },
    esperado: { semanas: 14, inicio: "2026-10-13", fin: "2027-01-18", vuelta: "2027-01-19" },
  },
  {
    nombre: "Licencia desde el parto",
    origen: { tipo: "recalculado", detalle: "Desde el 15/11/2026, 98 días: hasta el 20/2/2027." },
    fecha: "2026-10-12",
    entrada: { parto: "2026-11-15", desde: "parto" },
    esperado: { inicio: "2026-11-15", fin: "2027-02-20", vuelta: "2027-02-21" },
  },
]);
