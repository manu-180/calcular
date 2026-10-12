import { definirCasos } from "@/motor/calculo";
import costoDeUnEmpleado from "./costo-de-un-empleado";

export default definirCasos(costoDeUnEmpleado, [
  {
    nombre: "Salario de ₡1.000.000 con INA",
    origen: {
      tipo: "recalculado",
      detalle: "Cargas 26,83 % = 268.300. Aguinaldo 1.000.000 / 12 = 83.333,33. Mes: 1.351.633,33. Año: 13 salarios (12 + aguinaldo) = 13.000.000 + 268.300 × 12 = 16.219.600.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000000, ina: true },
    esperado: { tasa: 26.83, cargas: 268300, aguinaldo: 83333.33, costoMensual: 1351633.33, costoAnual: 16219600 },
  },
  {
    nombre: "Pequeña empresa sin INA",
    origen: { tipo: "recalculado", detalle: "25,33 % de 400.000 = 101.320. Aguinaldo 33.333,33. Mes 534.653,33. Año 5.200.000 + 1.215.840 = 6.415.840." },
    fecha: "2026-10-12",
    entrada: { salario: 400000, ina: false },
    esperado: { tasa: 25.33, cargas: 101320, costoMensual: 534653.33, costoAnual: 6415840 },
  },
]);
