import { definirCasos } from "@/motor/calculo";
import diasDeLicencia from "./dias-de-licencia";

export default definirCasos(diasDeLicencia, [
  {
    nombre: "Año completo con 1 año de antigüedad",
    origen: { tipo: "recalculado", url: "https://www.impo.com.uy/bases/leyes/12590-1958", detalle: "Ley 12.590, art. 1: 20 días por año trabajado." },
    fecha: "2026-10-12",
    entrada: { antiguedad: 1, meses: 12, sueldo: null },
    esperado: { diasAnuales: 20, dias: 20, diasExtra: 0, pago: null },
  },
  {
    nombre: "8 años de antigüedad, con sueldo",
    origen: { tipo: "recalculado", detalle: "Ley 12.590, art. 2: un día por cada 4 años desde los 5 (floor(8 / 4) = 2). 22 días. Jornal 45.000 / 30 = 1.500; 22 × 1.500 = 33.000." },
    fecha: "2026-10-12",
    entrada: { antiguedad: 8, meses: 12, sueldo: 45000 },
    esperado: { diasAnuales: 22, diasExtra: 2, dias: 22, jornal: 1500, pago: 33000 },
  },
  {
    nombre: "Seis meses trabajados en el primer año",
    origen: { tipo: "recalculado", detalle: "20 × 6 / 12 = 10 días." },
    fecha: "2026-10-12",
    entrada: { antiguedad: 0, meses: 6, sueldo: null },
    esperado: { dias: 10 },
  },
  {
    nombre: "Justo 5 años: primer día extra",
    origen: { tipo: "recalculado", detalle: "Con 5 años cumplidos se suma un día: 21." },
    fecha: "2026-10-12",
    entrada: { antiguedad: 5, meses: 12, sueldo: null },
    esperado: { diasAnuales: 21, diasExtra: 1 },
  },
]);
