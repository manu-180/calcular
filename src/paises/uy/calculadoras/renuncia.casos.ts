import { definirCasos } from "@/motor/calculo";
import renuncia from "./renuncia";

const BASE = { nominal: 60000, licenciaPendiente: 0, hijos: 0, conyuge: false } as const;

export default definirCasos(renuncia, [
  {
    nombre: "Renuncia el 7/10/2026 con 3 años de antigüedad",
    origen: {
      tipo: "recalculado",
      detalle:
        "Aguinaldo: semestre 1/6 a 30/11 (183 días), trabajados 129: 30.000 × 129 / 183 = 21.147,54. Licencia: 280 / 365 × 20 = 15,34 días × 2.000 = 30.680. Salario vacacional: 1.608 × 15,34 = 24.666,72. Total 76.494,26.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, ingreso: "2023-03-01", egreso: "2026-10-07" },
    esperado: { aguinaldo: 21147.54, diasLicencia: 15.34, licencia: 30680, salarioVacacional: 24666.72, total: 76494.26 },
  },
  {
    nombre: "Renuncia en diciembre con licencia pendiente",
    origen: {
      tipo: "recalculado",
      detalle: "Semestre 1/12/2026 a 31/5/2027, 15 días: 2.472,53. 21 días anuales: 20,08 más 5 pendientes = 25,08. Licencia 50.160. Salario vacacional 40.328,64. Total 92.961,17.",
    },
    fecha: "2026-12-15",
    entrada: { ...BASE, licenciaPendiente: 5, ingreso: "2020-01-01", egreso: "2026-12-15" },
    esperado: { aguinaldo: 2472.53, diasLicencia: 25.08, total: 92961.17 },
  },
  {
    nombre: "Fecha de egreso anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "El último día no puede ser antes del ingreso." },
    fecha: "2026-10-07",
    entrada: { ...BASE, ingreso: "2026-10-07", egreso: "2026-01-01" },
    esperaError: true,
  },
]);
