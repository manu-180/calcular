import { definirTextos } from "@/motor/edicion";
import overtime from "../../us/calculadoras/overtime";
import { COMUN } from "../lib/comun";

export default definirTextos(overtime, {
  calculadora: "us-es.overtime",
  slug: "calculadora-horas-extras",
  campos: {
    tarifa: { etiqueta: "Tarifa normal por hora" },
    horas: { etiqueta: "Horas trabajadas en la semana" },
  },
  filas: {
    regulares: { etiqueta: "Horas regulares" },
    extra: { etiqueta: "Horas extras" },
    tarifaExtra: { etiqueta: "Tarifa de horas extras" },
    pagoRegular: { etiqueta: "Pago regular" },
    pagoExtra: { etiqueta: "Pago de horas extras" },
    total: { etiqueta: "Pago total de la semana" },
    prima: { etiqueta: "Prima de horas extras (la mitad adicional)", ayuda: "Es la parte que puede deducir con la regla de horas extras sin impuestos." },
  },
  ...COMUN,
});
