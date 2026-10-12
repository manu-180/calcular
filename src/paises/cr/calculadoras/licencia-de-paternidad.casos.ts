import { definirCasos } from "@/motor/calculo";
import licenciaDePaternidad from "./licencia-de-paternidad";

export default definirCasos(licenciaDePaternidad, [
  {
    nombre: "Nacimiento el 12 de octubre de 2026",
    origen: { tipo: "recalculado", detalle: "Art. 95 b: dos días por semana durante las primeras cuatro semanas. 8 días entre el 12/10 y el 8/11/2026." },
    fecha: "2026-10-12",
    entrada: { fechaNacimiento: "2026-10-12" },
    esperado: { totalDias: 8, inicio: "2026-10-12", fin: "2026-11-08" },
  },
  {
    nombre: "Nacimiento a fin de año",
    origen: { tipo: "recalculado", detalle: "Desde el 20/12/2026, cuatro semanas terminan el 16/1/2027." },
    fecha: "2026-10-12",
    entrada: { fechaNacimiento: "2026-12-20" },
    esperado: { fin: "2027-01-16" },
  },
]);
