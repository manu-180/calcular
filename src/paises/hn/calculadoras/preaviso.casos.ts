import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

export default definirCasos(preaviso, [
  {
    nombre: "Despido sin preaviso después de más de dos años",
    origen: {
      tipo: "recalculado",
      detalle: "CT art. 116 e): más de dos años, dos meses (60 días). Art. 118: el patrono culpable paga el salario del preaviso. 15000 / 30 = 500; 500 × 60 = 30000. Fin: 12/10/2026 + 60 días = 11/12/2026.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 15000, fechaIngreso: "2020-01-15", fechaAviso: "2026-10-12", quien: "patrono" },
    esperado: { dias: 60, fechaFin: "2026-12-11", salarioPreaviso: 30000, montoOmitido: 30000 },
  },
  {
    nombre: "Renuncia sin preaviso después de más de dos años",
    origen: { tipo: "recalculado", detalle: "Art. 118: el trabajador culpable paga la mitad del salario del preaviso. 30000 × 50 % = 15000." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, fechaIngreso: "2020-01-15", fechaAviso: "2026-10-12", quien: "trabajador" },
    esperado: { dias: 60, montoOmitido: 15000 },
  },
  {
    nombre: "Dos meses de trabajo: 24 horas",
    origen: { tipo: "recalculado", detalle: "Art. 116 a): menos de tres meses, 24 horas (1 día). 12000 / 30 = 400." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, fechaIngreso: "2026-08-12", fechaAviso: "2026-10-12", quien: "patrono" },
    esperado: { dias: 1, salarioPreaviso: 400, montoOmitido: 400 },
  },
  {
    nombre: "Ocho meses de trabajo: dos semanas",
    origen: { tipo: "recalculado", detalle: "Art. 116 c): de seis meses a un año, dos semanas (14 días). 12000 / 30 × 14 = 5600." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, fechaIngreso: "2026-02-01", fechaAviso: "2026-10-12", quien: "patrono" },
    esperado: { dias: 14, salarioPreaviso: 5600 },
  },
  {
    nombre: "Aviso antes del ingreso",
    origen: { tipo: "recalculado", detalle: "La fecha del aviso no puede ser anterior a la de ingreso." },
    fecha: "2026-10-12",
    entrada: { salario: 12000, fechaIngreso: "2026-11-01", fechaAviso: "2026-10-12", quien: "patrono" },
    esperaError: true,
  },
]);
