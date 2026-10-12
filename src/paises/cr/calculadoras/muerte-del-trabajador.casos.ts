import { definirCasos } from "@/motor/calculo";
import muerteDelTrabajador from "./muerte-del-trabajador";

export default definirCasos(muerteDelTrabajador, [
  {
    nombre: "Diez años y seis meses de trabajo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 1/1/2016 al 30/6/2026: 10 años y 6 meses exactos (la fracción no pasa de seis meses): fila 10 del art. 29, 21,5 días, tope de 8 años: 172 días × 30.000 = 5.160.000. Aguinaldo 7 meses: 900.000 × 7 / 12 = 525.000. Total 5.685.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 900000, fechaIngreso: "2016-01-01", fechaSalida: "2026-06-30", vacaciones: 0, salariosAguinaldo: null },
    esperado: { diasCesantia: 172, cesantia: 5160000, aguinaldo: 525000, total: 5685000 },
  },
  {
    nombre: "Dos meses de trabajo",
    origen: { tipo: "recalculado", detalle: "Menos de tres meses: sin cesantía. Vacaciones 2 × 10.000 = 20.000; aguinaldo 300.000 × 2 / 12 = 50.000. Total 70.000." },
    fecha: "2026-10-12",
    entrada: { salario: 300000, fechaIngreso: "2026-08-01", fechaSalida: "2026-09-30", vacaciones: 2, salariosAguinaldo: null },
    esperado: { diasCesantia: 0, cesantia: 0, vacaciones: 20000, aguinaldo: 50000, total: 70000 },
  },
]);
