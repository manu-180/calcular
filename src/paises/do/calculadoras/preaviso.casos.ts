import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

export default definirCasos(preaviso, [
  {
    nombre: "Más de un año: 28 días",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2021 al 30/9/2026: más de un año (art. 76 ordinal 3), 28 días. Termina el 28/10/2026. Diario 40,000 ÷ 23.83 = 1,678.56 × 28 = 46,999.68." },
    fecha: "2026-10-12",
    entrada: { inicio: "2021-03-01", aviso: "2026-09-30", salario: 40000, quien: "empleador" },
    esperado: { dias: 28, ultimoDia: "2026-10-28", diario: 1678.56, monto: 46999.68 },
  },
  {
    nombre: "4 meses: 7 días",
    origen: { tipo: "recalculado", detalle: "Del 15/5 al 20/9/2026: 4 meses y 5 días (art. 76 ordinal 1), 7 días. Termina el 27/9. Diario 30,000 ÷ 23.83 = 1,258.92 × 7 = 8,812.44." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-05-15", aviso: "2026-09-20", salario: 30000, quien: "trabajador" },
    esperado: { dias: 7, ultimoDia: "2026-09-27", monto: 8812.44 },
  },
  {
    nombre: "8 meses: 14 días",
    origen: { tipo: "recalculado", detalle: "Del 15/1 al 20/9/2026: más de 6 meses y menos de un año (art. 76 ordinal 2), 14 días. Diario 25,000 ÷ 23.83 = 1,049.10 × 14 = 14,687.40." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-01-15", aviso: "2026-09-20", salario: 25000, quien: "empleador" },
    esperado: { dias: 14, monto: 14687.4 },
  },
  {
    nombre: "Menos de 3 meses: sin preaviso",
    origen: { tipo: "recalculado", detalle: "Art. 76: el preaviso empieza con 3 meses de trabajo continuo." },
    fecha: "2026-10-12",
    entrada: { inicio: "2026-08-01", aviso: "2026-09-30", salario: 30000, quien: "empleador" },
    esperado: { dias: 0, ultimoDia: null, monto: 0 },
  },
]);
