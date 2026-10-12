import { definirCasos } from "@/motor/calculo";
import cargasSociales from "./cargas-sociales";

export default definirCasos(cargasSociales, [
  {
    nombre: "Salario de ₡1.000.000 en 2026 con INA",
    origen: {
      tipo: "recalculado",
      detalle:
        "Trabajador: 5,50 % + 4,33 % + 1 % = 55.000 + 43.300 + 10.000 = 108.300. Patrono: SEM 9,25 % 92.500, IVM 5,58 % 55.800, Banco Popular 0,5 % 5.000, Fodesaf 5 % 50.000, IMAS 0,5 % 5.000, INA 1,5 % 15.000, FCL 1,5 % 15.000, ROP 3 % 30.000: 268.300 (26,83 %). Total 376.600.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1000000, ina: true },
    esperado: { totalTrabajador: 108300, ivmPatrono: 55800, totalPatrono: 268300, tasaPatrono: 26.83, total: 376600 },
  },
  {
    nombre: "Empresa con menos de cinco trabajadores",
    origen: { tipo: "recalculado", detalle: "Sin INA el patrono paga 25,33 %: 500.000 × 25,33 % = 126.650. Trabajador 10,83 % = 54.150. Total 180.800." },
    fecha: "2026-10-12",
    entrada: { salario: 500000, ina: false },
    esperado: { ina: 0, totalPatrono: 126650, totalTrabajador: 54150, total: 180800 },
  },
  {
    nombre: "Escalón del IVM de 2029",
    origen: {
      tipo: "recalculado",
      detalle: "Desde el 1/1/2029 el IVM es 5,75 % patronal y 4,50 % obrero. Patrono: 268.300 − 55.800 + 57.500 = 270.000. Trabajador: 55.000 + 45.000 + 10.000 = 110.000.",
    },
    fecha: "2029-02-01",
    entrada: { salario: 1000000, ina: true },
    esperado: { ivmPatrono: 57500, totalPatrono: 270000, totalTrabajador: 110000, total: 380000 },
  },
]);
