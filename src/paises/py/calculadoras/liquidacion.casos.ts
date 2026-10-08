import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Despido sin causa a los 3 años y 6 meses, sin preaviso",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle:
        "Diario 4.500.000 / 30 = 150.000. Preaviso (art. 87 b) 45 días = 6.750.000. Indemnización (art. 91, Ley 496): 3 años, la fracción de 6 meses justos no suma: 45 días = 6.750.000. Vacaciones proporcionales del 4.º año: 12 × 184 / 365 = 6,0493 días = 907.397. Aguinaldo 36.000.000 / 12 = 3.000.000. Total 17.407.397.",
    },
    fecha: "2026-09-01",
    entrada: {
      motivo: "despido",
      salario: 4500000,
      ingreso: "2023-03-01",
      egreso: "2026-08-31",
      preavisoCumplido: false,
      cobradoEnElAnio: 36000000,
      vacacionesPendientes: 0,
      vacacionesVencidas: false,
    },
    esperado: { preaviso: 6750000, indemnizacion: 6750000, vacacionesCausadas: 0, vacacionesProporcionales: 907397, aguinaldo: 3000000, descuentoPreaviso: 0, total: 17407397 },
  },
  {
    nombre: "Renuncia sin preaviso, aguinaldo estimado",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 100.000. 1 año y 6 meses: preaviso de 45 días; quien renuncia sin darlo debe la mitad (art. 90): 2.250.000. Vacaciones pendientes 12 × 100.000 = 1.200.000. Cobrado estimado 3.000.000 × 212 / 30 = 21.200.000; aguinaldo 1.766.667. Total 716.667.",
    },
    fecha: "2026-08-01",
    entrada: {
      motivo: "renuncia",
      salario: 3000000,
      ingreso: "2025-02-01",
      egreso: "2026-07-31",
      preavisoCumplido: false,
      cobradoEnElAnio: null,
      vacacionesPendientes: 12,
      vacacionesVencidas: false,
    },
    esperado: { preaviso: 0, indemnizacion: 0, vacacionesCausadas: 1200000, vacacionesProporcionales: 0, aguinaldo: 1766667, descuentoPreaviso: -2250000, total: 716667 },
  },
  {
    nombre: "Despido con causa y vacaciones vencidas (pago doble)",
    origen: {
      tipo: "recalculado",
      detalle: "Sin preaviso ni indemnización. Art. 221: vacaciones causadas dobles si el despido ocurre después del período de goce: 18 × 166.666,67 × 2 = 6.000.000. Aguinaldo 45.000.000 / 12 = 3.750.000.",
    },
    fecha: "2026-10-05",
    entrada: {
      motivo: "despido-con-causa",
      salario: 5000000,
      ingreso: "2020-01-06",
      egreso: "2026-10-02",
      preavisoCumplido: false,
      cobradoEnElAnio: 45000000,
      vacacionesPendientes: 18,
      vacacionesVencidas: true,
    },
    esperado: { preaviso: 0, indemnizacion: 0, vacacionesCausadas: 6000000, aguinaldo: 3750000, total: 9750000 },
  },
  {
    nombre: "Despido sin causa antes del año, con el salario mínimo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 3.044.000 / 30. 8 meses: preaviso 30 días = 3.044.000; la fracción de más de seis meses vale un año: 15 días = 1.522.000. Proporcionales 12 × 243 / 365 = 7,989 días × 101.466,67 = 810.621,37. Aguinaldo estimado 3.044.000 × 243 / 30 / 12 = 2.054.700. Total 7.431.321.",
    },
    fecha: "2026-09-05",
    entrada: {
      motivo: "despido",
      salario: 3044000,
      ingreso: "2026-01-05",
      egreso: "2026-09-04",
      preavisoCumplido: false,
      cobradoEnElAnio: null,
      vacacionesPendientes: 0,
      vacacionesVencidas: false,
    },
    esperado: { preaviso: 3044000, indemnizacion: 1522000, vacacionesProporcionales: 810621, aguinaldo: 2054700, total: 7431321 },
  },
  {
    nombre: "Egreso antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas invertidas." },
    fecha: "2026-10-07",
    entrada: {
      motivo: "renuncia",
      salario: 3000000,
      ingreso: "2026-09-01",
      egreso: "2026-08-01",
      preavisoCumplido: true,
      cobradoEnElAnio: null,
      vacacionesPendientes: 0,
      vacacionesVencidas: false,
    },
    esperaError: true,
  },
]);
