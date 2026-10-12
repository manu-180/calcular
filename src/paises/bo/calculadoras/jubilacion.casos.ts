import { definirCasos } from "@/motor/calculo";
import jubilacion from "./jubilacion";

const SIP = "https://media.economiayfinanzas.gob.bo/sites/default/files/2025-10/Bolet%C3%ADn%20SIP_diciembre%202024.pdf" as const;

export default definirCasos(jubilacion, [
  {
    nombre: "Hombre de 58 años con 150 aportes",
    origen: { tipo: "recalculado", url: SIP, detalle: "Ley 065 (boletín SIP, cuadro 2): 58 años y 120 aportes para la Pensión Solidaria. Nacido el 10/05/1968: cumple 58 el 10/05/2026. Renta Dignidad a los 60: 10/05/2028." },
    fecha: "2026-10-12",
    entrada: { nacimiento: "1968-05-10", sexo: "hombre", hijos: 2, aportes: 150 },
    esperado: { edadHoy: 58, edadRequerida: 58, fechaEdad: "2026-05-10", aportesPorHijos: 0, aportesFaltantes: 0, fechaRentaDignidad: "2028-05-10" },
  },
  {
    nombre: "Mujer de 54 años con dos hijos",
    origen: { tipo: "recalculado", url: SIP, detalle: "Un año menos por hijo: 58 − 2 = 56. Nacida el 01/03/1972: cumple 56 el 01/03/2028. Con 100 aportes le faltan 20." },
    fecha: "2026-10-12",
    entrada: { nacimiento: "1972-03-01", sexo: "mujer", hijos: 2, aportes: 100 },
    esperado: { edadHoy: 54, edadRequerida: 56, fechaEdad: "2028-03-01", aportesFaltantes: 20, fechaRentaDignidad: "2032-03-01" },
  },
  {
    nombre: "Mujer de 59 años con cuatro hijos: suma aportes",
    origen: { tipo: "recalculado", url: SIP, detalle: "Con 58 o más suma 12 aportes por hijo, hasta 3 hijos: 36. Con 90 aportes llega a 126: no le faltan." },
    fecha: "2026-10-12",
    entrada: { nacimiento: "1967-01-15", sexo: "mujer", hijos: 4, aportes: 90 },
    esperado: { edadHoy: 59, edadRequerida: 58, aportesPorHijos: 36, aportesFaltantes: 0 },
  },
  {
    nombre: "Fecha de nacimiento futura",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { nacimiento: "2027-01-01", sexo: "hombre", hijos: 0, aportes: 0 },
    esperaError: true,
  },
]);
