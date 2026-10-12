import { definirCasos } from "@/motor/calculo";
import jornada from "./jornada-laboral";

const DOF = "https://dof.gob.mx/nota_detalle.php?codigo=5786537&fecha=01/05/2026";

export default definirCasos(jornada, [
  {
    nombre: "2026, cinco días a la semana",
    origen: { tipo: "oficial", url: DOF, detalle: "Transitorio segundo: 48 horas en 2026. 48 / 5 = 9.6 horas por día. Transitorio cuarto: 9 horas extra dobles; art. 68: 4 triples." },
    fecha: "2026-10-15",
    entrada: { dias: 5, horasActuales: 50 },
    esperado: { maxima: 48, porDia: 9.6, extraDobles: 9, extraTriples: 4, exceso: 2 },
  },
  {
    nombre: "Primer día de 2027: baja a 46 horas",
    origen: { tipo: "oficial", url: DOF, detalle: "Desde el 1/01/2027: 46 horas. 46 / 6 = 7.67." },
    fecha: "2027-01-01",
    entrada: { dias: 6, horasActuales: null },
    esperado: { maxima: 46, porDia: 7.67, extraDobles: 9, exceso: null },
  },
  {
    nombre: "2030: 40 horas y 12 extra",
    origen: { tipo: "oficial", url: DOF, detalle: "Desde 2030: 40 horas y 12 horas extra dobles por semana. 40 / 5 = 8." },
    fecha: "2030-03-01",
    entrada: { dias: 5, horasActuales: 40 },
    esperado: { maxima: 40, porDia: 8, extraDobles: 12, exceso: 0 },
  },
]);
