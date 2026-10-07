import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion-por-egreso";

const BASE = { nominal: 60000, licenciaPendiente: 0, hijos: 0, conyuge: false } as const;

export default definirCasos(liquidacion, [
  {
    nombre: "Renuncia el 7/10/2026 con 3 años de antigüedad",
    origen: {
      tipo: "recalculado",
      detalle:
        "Aguinaldo: semestre 1/6 a 30/11 (183 días), trabajados 129: 30.000 × 129 / 183 = 21.147,54. Licencia: 280 días del año / 365 × 20 = 15,34 días; 2.000 × 15,34 = 30.680. Salario vacacional: líquido 48.240 / 30 = 1.608 × 15,34 = 24.666,72. Total 76.494,26.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, motivo: "renuncia", ingreso: "2023-03-01", egreso: "2026-10-07" },
    esperado: { aguinaldo: 21147.54, diasGenerados: 15.34, diasLicencia: 15.34, licencia: 30680, salarioVacacional: 24666.72, despido: 0, total: 76494.26 },
  },
  {
    nombre: "Mismo caso, pero despido",
    origen: {
      tipo: "recalculado",
      detalle: "Despido: 4 años (3 y fracción). Base 60.000 + 5.000 + 3.333,33 = 68.333,33 × 4 = 273.333,32. Total 76.494,26 + 273.333,32 = 349.827,58.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, motivo: "despido", ingreso: "2023-03-01", egreso: "2026-10-07" },
    esperado: { despido: 273333.32, total: 349827.58 },
  },
  {
    nombre: "Egreso en diciembre con licencia pendiente",
    origen: {
      tipo: "recalculado",
      detalle:
        "Semestre 1/12/2026 a 31/5/2027 (182 días), trabajados 15: 30.000 × 15 / 182 = 2.472,53. 6 años: 21 días anuales; 349 / 365 × 21 = 20,08 más 5 pendientes = 25,08. Licencia 50.160. Salario vacacional 1.608 × 25,08 = 40.328,64. Total 92.961,17.",
    },
    fecha: "2026-12-15",
    entrada: { ...BASE, licenciaPendiente: 5, motivo: "renuncia", ingreso: "2020-01-01", egreso: "2026-12-15" },
    esperado: { aguinaldo: 2472.53, diasGenerados: 20.08, diasLicencia: 25.08, licencia: 50160, salarioVacacional: 40328.64, total: 92961.17 },
  },
  {
    nombre: "Ingresó en el mismo semestre",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/8 al 7/10: 68 días. Aguinaldo 30.000 × 68 / 183 = 11.147,54. Licencia 68 / 365 × 20 = 3,73 días: 7.460. Salario vacacional 1.608 × 3,73 = 5.997,84. Total 24.605,38.",
    },
    fecha: "2026-10-07",
    entrada: { ...BASE, motivo: "renuncia", ingreso: "2026-08-01", egreso: "2026-10-07" },
    esperado: { aguinaldo: 11147.54, diasLicencia: 3.73, licencia: 7460, salarioVacacional: 5997.84, total: 24605.38 },
  },
  {
    nombre: "Egreso anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas imposibles: tiene que avisar el error." },
    fecha: "2026-10-07",
    entrada: { ...BASE, motivo: "renuncia", ingreso: "2026-10-08", egreso: "2026-10-07" },
    esperaError: true,
  },
]);
