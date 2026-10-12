import { definirCasos } from "@/motor/calculo";
import periodoDePrueba from "./periodo-de-prueba";

export default definirCasos(periodoDePrueba, [
  {
    nombre: "Máximo de 60 días desde el 1 de octubre",
    origen: { tipo: "recalculado", detalle: "CT art. 49: hasta 60 días. Del 01/10/2026 contando 60 días, el último es el 29/11/2026." },
    fecha: "2026-10-12",
    entrada: { fechaInicio: "2026-10-01", tipo: "general", diasPactados: null },
    esperado: { maximo: 60, dias: 60, fechaFin: "2026-11-29" },
  },
  {
    nombre: "Trabajo doméstico: 15 días",
    origen: { tipo: "recalculado", detalle: "Arts. 50 y 158: en el trabajo doméstico los primeros 15 días son de prueba. Del 01/10 al 15/10/2026." },
    fecha: "2026-10-12",
    entrada: { fechaInicio: "2026-10-01", tipo: "domestico", diasPactados: null },
    esperado: { maximo: 15, fechaFin: "2026-10-15" },
  },
  {
    nombre: "Contrato con 30 días de prueba",
    origen: { tipo: "recalculado", detalle: "Art. 51: puede pactarse menos. Del 15/01/2026 contando 30 días, el último es el 13/02/2026." },
    fecha: "2026-10-12",
    entrada: { fechaInicio: "2026-01-15", tipo: "general", diasPactados: 30 },
    esperado: { dias: 30, fechaFin: "2026-02-13" },
  },
  {
    nombre: "Prueba de 90 días",
    origen: { tipo: "recalculado", detalle: "Art. 49: no puede exceder de 60 días." },
    fecha: "2026-10-12",
    entrada: { fechaInicio: "2026-10-01", tipo: "general", diasPactados: 90 },
    esperaError: true,
  },
]);
