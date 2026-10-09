import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "Jornada completa con el SBU 2026, más de un año y décimos mensualizados",
    origen: {
      tipo: "recalculado",
      detalle:
        "SBU USD 482 (Acuerdo MDT-2025-195 incluye a las trabajadoras remuneradas del hogar). Aporte personal 9,45 % = 45,55; patronal 11,15 % = 53,74; décimo tercero 482/12 = 40,17; décimo cuarto 482/12 = 40,17; fondos de reserva 8,33 % = 40,15. Recibe 482 − 45,55 + 80,34 + 40,15 = 556,94. Costo 482 + 53,74 + 40,17 + 40,17 + 40,15 = 656,23.",
    },
    fecha: "2026-10-08",
    entrada: { horas: 40, sueldo: null, masDeUnAnio: true, decimosMensuales: true },
    esperado: {
      minimo: 482,
      sueldo: 482,
      aportePersonal: 45.55,
      aportePatronal: 53.74,
      pagoIess: 99.29,
      decimoTercero: 40.17,
      decimoCuarto: 40.17,
      decimosEnRol: 80.34,
      fondoReserva: 40.15,
      aRecibir: 556.94,
      costoMensual: 656.23,
    },
  },
  {
    nombre: "Medio tiempo (20 horas), primer año, décimos acumulados",
    origen: {
      tipo: "recalculado",
      detalle: "Mínimo 482 × 20/40 = 241. Aporte personal 22,77; patronal 26,87; décimos 20,08 cada uno; sin fondos de reserva. Recibe 218,23; costo 308,03.",
    },
    fecha: "2026-10-08",
    entrada: { horas: 20, sueldo: null, masDeUnAnio: false, decimosMensuales: false },
    esperado: { minimo: 241, aportePersonal: 22.77, aportePatronal: 26.87, decimoTercero: 20.08, decimoCuarto: 20.08, fondoReserva: 0, decimosEnRol: 0, aRecibir: 218.23, costoMensual: 308.03 },
  },
  {
    nombre: "Más de 40 horas por semana",
    origen: { tipo: "recalculado", detalle: "La jornada máxima es de 8 horas diarias y 40 semanales." },
    fecha: "2026-10-08",
    entrada: { horas: 45, sueldo: null, masDeUnAnio: false, decimosMensuales: false },
    esperaError: true,
  },
]);
