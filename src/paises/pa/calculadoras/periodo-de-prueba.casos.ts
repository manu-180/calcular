import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Inicio el 1 de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "Art. 78: tres meses. Del 1/10/2026 al 31/12/2026. Al 12/10 faltan 80 días." },
    fecha: "2026-10-12",
    entrada: { fechaInicio: "2026-10-01", tipo: "general" },
    esperado: { fin: "2026-12-31", restantes: 80 },
  },
  {
    nombre: "Trabajo doméstico",
    origen: { tipo: "recalculado", detalle: "Art. 231: dos semanas. Del 1/10/2026 al 14/10/2026. Al 12/10 faltan 2 días." },
    fecha: "2026-10-12",
    entrada: { fechaInicio: "2026-10-01", tipo: "domestico" },
    esperado: { fin: "2026-10-14", restantes: 2 },
  },
  {
    nombre: "Prueba ya vencida",
    origen: { tipo: "recalculado", detalle: "Del 1/6/2026 al 31/8/2026: al 12/10 no falta nada." },
    fecha: "2026-10-12",
    entrada: { fechaInicio: "2026-06-01", tipo: "general" },
    esperado: { fin: "2026-08-31", restantes: 0 },
  },
]);
