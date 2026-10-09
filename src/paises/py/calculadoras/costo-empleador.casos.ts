import { definirCasos } from "@/motor/calculo";
import costoEmpleador from "./costo-empleador";

export default definirCasos(costoEmpleador, [
  {
    nombre: "Salario de Gs. 4.000.000 sin hijos",
    origen: { tipo: "recalculado", detalle: "IPS patronal 16,5 % = 660.000; aguinaldo 4.000.000 / 12 = 333.333. Mensual 4.993.333; anual × 12 = 59.919.996." },
    fecha: "2026-10-08",
    entrada: { salario: 4000000, hijos: 0 },
    esperado: { ips: 660000, bonificacion: 0, aguinaldo: 333333, mensual: 4993333, anual: 59919996 },
  },
  {
    nombre: "Salario mínimo con dos hijos (bonificación familiar)",
    origen: {
      tipo: "recalculado",
      detalle: "Mínimo 3.044.000. IPS 16,5 % = 502.260. Bonificación 5 % del mínimo por hijo = 152.200 × 2 = 304.400 (salario debajo del tope de 200 % = 6.088.000). Aguinaldo 253.667. Mensual 4.104.327.",
    },
    fecha: "2026-10-08",
    entrada: { salario: 3044000, hijos: 2 },
    esperado: { ips: 502260, bonificacion: 304400, aguinaldo: 253667, mensual: 4104327 },
  },
  {
    nombre: "Salario por encima del tope de la bonificación",
    origen: { tipo: "recalculado", detalle: "7.000.000 > 6.088.000: sin bonificación. IPS 1.155.000; aguinaldo 583.333; mensual 8.738.333." },
    fecha: "2026-10-08",
    entrada: { salario: 7000000, hijos: 1 },
    esperado: { bonificacion: 0, ips: 1155000, mensual: 8738333 },
  },
  {
    nombre: "Salario debajo del mínimo: IPS sobre el mínimo",
    origen: { tipo: "recalculado", detalle: "Base mínima del IPS 3.044.000: 16,5 % = 502.260." },
    fecha: "2026-10-08",
    entrada: { salario: 2500000, hijos: 0 },
    esperado: { ips: 502260 },
  },
]);
