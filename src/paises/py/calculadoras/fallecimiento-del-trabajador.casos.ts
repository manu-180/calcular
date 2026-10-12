import { definirCasos } from "@/motor/calculo";
import fallecimiento from "./fallecimiento-del-trabajador";

export default definirCasos(fallecimiento, [
  {
    nombre: "Tres años y medio, total cobrado conocido",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Art. 91: 3 años (los 6 meses justos no suman). Diario 150.000 × 15 × 3 = 6.750.000; la mitad para los herederos: 3.375.000. Aguinaldo 36.000.000 / 12 = 3.000.000. Total 6.375.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 4500000, ingreso: "2023-03-01", fallecimiento: "2026-08-31", cobradoEnElAnio: 36000000, vacacionesPendientes: 0 },
    esperado: { anios: 3, indemnizacion: 3375000, aguinaldo: 3000000, vacaciones: 0, total: 6375000 },
  },
  {
    nombre: "Ocho años con el salario mínimo y vacaciones pendientes",
    origen: {
      tipo: "recalculado",
      detalle: "Diario 3.044.000 / 30 = 101.466,67. 8 años × 15 = 120 días = 12.176.000; mitad 6.088.000. Aguinaldo estimado: del 1/1 al 20/5 son 140 días, 3.044.000 × 140 / 30 / 12 = 1.183.777,78 (1.183.778). Vacaciones 18 × 101.466,67 = 1.826.400. Total 9.098.178.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3044000, ingreso: "2018-05-02", fallecimiento: "2026-05-20", cobradoEnElAnio: null, vacacionesPendientes: 18 },
    esperado: { anios: 8, indemnizacion: 6088000, aguinaldo: 1183778, vacaciones: 1826400, total: 9098178 },
  },
]);
