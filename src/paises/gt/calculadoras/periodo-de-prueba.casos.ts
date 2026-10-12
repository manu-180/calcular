import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Ingreso el 12 de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "CT art. 81: dos meses, del 12/10/2026 al 11/12/2026. Desde el 12/10 faltan 61 días contando los dos extremos." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-10-12" },
    esperado: { fin: "2026-12-11", restantes: 61 },
  },
  {
    nombre: "Período ya terminado",
    origen: { tipo: "recalculado", detalle: "Ingreso 01/01/2026: terminó el 28/02/2026." },
    fecha: "2026-10-12",
    entrada: { fechaIngreso: "2026-01-01" },
    esperado: { fin: "2026-02-28", restantes: 0 },
  },
]);
