import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

const CT = "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo" as const;

export default definirCasos(preaviso, [
  {
    nombre: "Despido sin aviso con 3 años y 6 meses",
    origen: {
      tipo: "recalculado",
      url: CT,
      detalle: "Art. 87 b: más de 1 y hasta 5 años, 45 días. Diario 4.500.000 / 30 = 150.000; 45 × 150.000 = 6.750.000, que paga el empleador (art. 90). Termina el 31/8 + 45 días = 15/10/2026.",
    },
    fecha: "2026-10-12",
    entrada: { quien: "empleador", salario: 4500000, ingreso: "2023-03-01", aviso: "2026-08-31", preavisoDado: false },
    esperado: { diasPreaviso: 45, fin: "2026-10-15", monto: 6750000, pagaEmpleador: 6750000, debeTrabajador: 0 },
  },
  {
    nombre: "Renuncia sin aviso: se debe la mitad",
    origen: {
      tipo: "recalculado",
      url: CT,
      detalle: "1 año y 6 meses: 45 días. Diario 100.000; salario del período 4.500.000; el trabajador que lo omite debe la mitad (art. 90): 2.250.000.",
    },
    fecha: "2026-10-12",
    entrada: { quien: "trabajador", salario: 3000000, ingreso: "2025-02-01", aviso: "2026-07-31", preavisoDado: false },
    esperado: { diasPreaviso: 45, monto: 4500000, pagaEmpleador: 0, debeTrabajador: 2250000 },
  },
  {
    nombre: "Más de 10 años y preaviso trabajado",
    origen: { tipo: "recalculado", detalle: "Art. 87 d: más de 10 años, 90 días. Diario 200.000 × 90 = 18.000.000. Se dio el preaviso: nadie paga nada aparte." },
    fecha: "2026-10-12",
    entrada: { quien: "empleador", salario: 6000000, ingreso: "2015-01-05", aviso: "2026-10-01", preavisoDado: true },
    esperado: { diasPreaviso: 90, monto: 18000000, pagaEmpleador: 0, debeTrabajador: 0 },
  },
  {
    nombre: "Aviso antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas invertidas." },
    fecha: "2026-10-12",
    entrada: { quien: "empleador", salario: 3000000, ingreso: "2026-09-01", aviso: "2026-08-01", preavisoDado: false },
    esperaError: true,
  },
]);
