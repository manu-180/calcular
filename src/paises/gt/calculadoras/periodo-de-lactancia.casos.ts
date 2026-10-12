import { definirCasos } from "@/motor/calculo";
import periodoDeLactancia from "./periodo-de-lactancia";

export default definirCasos(periodoDeLactancia, [
  {
    nombre: "Regreso el 8 de febrero de 2027, jornada diurna",
    origen: { tipo: "recalculado", detalle: "CT art. 153: diez meses desde el regreso, hasta el 08/12/2027. Hora 4800 / 30 / 8 = 20." },
    fecha: "2026-10-12",
    entrada: { regreso: "2027-02-08", salario: 4800, jornada: "diurna" },
    esperado: { fin: "2027-12-08", horasDiarias: 1, valorHora: 20, valorDiario: 20 },
  },
  {
    nombre: "Regreso un 31 de marzo, jornada mixta",
    origen: { tipo: "recalculado", detalle: "31/03/2026 más diez meses: 31/01/2027. Hora 4200 / 30 / 7 = 20." },
    fecha: "2026-10-12",
    entrada: { regreso: "2026-03-31", salario: 4200, jornada: "mixta" },
    esperado: { fin: "2027-01-31", valorHora: 20 },
  },
]);
