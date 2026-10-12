import { definirCasos } from "@/motor/calculo";
import feriadoTrabajado from "./feriado-trabajado";

export default definirCasos(feriadoTrabajado, [
  {
    nombre: "Un feriado completo con el salario mínimo",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Hora 3.044.000 / 30 / 8 = 12.683,33. Con 100 % de recargo (art. 234): 25.366,67. Por 8 horas: 202.933,33, redondeado 202.933.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3044000, horas: 8 },
    esperado: { hora: 12683, valorHora: 25367, pago: 202933 },
  },
  {
    nombre: "Cuatro horas con 4,8 millones",
    origen: { tipo: "recalculado", detalle: "Hora 4.800.000 / 240 = 20.000; en feriado 40.000; 4 horas = 160.000." },
    fecha: "2026-10-12",
    entrada: { salario: 4800000, horas: 4 },
    esperado: { hora: 20000, valorHora: 40000, pago: 160000 },
  },
]);
