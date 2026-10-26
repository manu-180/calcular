import { definirCasos } from "@/motor/calculo";
import calculadora from "./real-estate-transaction-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Venta de 1.200.000 sin apoyo",
    origen: { tipo: "recalculado", detalle: "ZATCA: 5 % del valor. 1.200.000 x 5 % = 60.000." },
    fecha: "2026-10-24",
    entrada: { valor: 1200000, primera: false },
    esperado: { impuesto: 60000, pagar: 60000, apoyo: 0 },
  },
  {
    nombre: "Primera vivienda por encima del millón",
    origen: { tipo: "recalculado", detalle: "El Estado cubre 5 % de 1.000.000 = 50.000; el comprador paga 10.000." },
    fecha: "2026-10-24",
    entrada: { valor: 1200000, primera: true },
    esperado: { impuesto: 60000, apoyo: 50000, pagar: 10000, total: 1210000 },
  },
  {
    nombre: "Primera vivienda de 800.000",
    origen: { tipo: "recalculado", detalle: "40.000 de impuesto, todo a cargo del Estado." },
    fecha: "2026-10-24",
    entrada: { valor: 800000, primera: true },
    esperado: { pagar: 0, apoyo: 40000 },
  },
  {
    nombre: "Valor cero",
    origen: { tipo: "recalculado", detalle: "Valor 0." },
    fecha: "2026-10-24",
    entrada: { valor: 0, primera: false },
    esperaError: true,
  },
]);
