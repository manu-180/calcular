import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

export default definirCasos(costoEmpleador, [
  {
    nombre: "Sueldo de USD 1.000 con más de un año",
    origen: {
      tipo: "recalculado",
      detalle: "Patronal 11,15 % = 111,50; décimo tercero 1.000/12 = 83,33; décimo cuarto 482/12 = 40,17; fondos de reserva 8,33 % = 83,30. Mensual 1.318,30; anual 15.819,60.",
    },
    fecha: "2026-10-08",
    entrada: { sueldo: 1000, masDeUnAnio: true },
    esperado: { aportePatronal: 111.5, decimoTercero: 83.33, decimoCuarto: 40.17, fondoReserva: 83.3, mensual: 1318.3, anual: 15819.6 },
  },
  {
    nombre: "Salario básico en el primer año",
    origen: { tipo: "recalculado", detalle: "482 + 53,74 + 40,17 + 40,17 + 0 = 616,08." },
    fecha: "2026-10-08",
    entrada: { sueldo: 482, masDeUnAnio: false },
    esperado: { fondoReserva: 0, mensual: 616.08 },
  },
]);
