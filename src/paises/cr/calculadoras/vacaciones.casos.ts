import { definirCasos } from "@/motor/calculo";
import vacaciones from "./vacaciones";

export default definirCasos(vacaciones, [
  {
    nombre: "Un año sin vacaciones",
    origen: { tipo: "recalculado", detalle: "CT art. 153: 12 meses × 1 día = 12 días. 600.000 / 30 = 20.000 por día. 12 × 20.000 = 240.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, meses: 12, tomados: 0 },
    esperado: { ganados: 12, pendientes: 12, salarioDiario: 20000, monto: 240000 },
  },
  {
    nombre: "Siete meses con tres días ya disfrutados",
    origen: { tipo: "recalculado", detalle: "7 días ganados − 3 = 4. 450.000 / 30 = 15.000. 4 × 15.000 = 60.000." },
    fecha: "2026-10-07",
    entrada: { salario: 450000, meses: 7, tomados: 3 },
    esperado: { pendientes: 4, monto: 60000 },
  },
  {
    nombre: "No se pueden disfrutar más días de los ganados",
    origen: { tipo: "recalculado", detalle: "3 meses dan 3 días; 5 disfrutados es imposible." },
    fecha: "2026-10-07",
    entrada: { salario: 450000, meses: 3, tomados: 5 },
    esperaError: true,
  },
]);
