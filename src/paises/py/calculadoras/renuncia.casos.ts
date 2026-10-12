import { definirCasos } from "@/motor/calculo";
import renuncia from "./renuncia";

export default definirCasos(renuncia, [
  {
    nombre: "Renuncia sin preaviso, aguinaldo estimado",
    origen: {
      tipo: "recalculado",
      url: "https://www.bacn.gov.py/leyes-paraguayas/2608/ley-n-213-establece-el-codigo-del-trabajo",
      detalle: "Diario 100.000. 1 año y 6 meses: preaviso de 45 días; sin darlo se debe la mitad (art. 90): 2.250.000. Vacaciones 12 × 100.000 = 1.200.000. Cobrado estimado 3.000.000 × 212 / 30 = 21.200.000; aguinaldo 1.766.667. Total 716.667.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3000000, ingreso: "2025-02-01", egreso: "2026-07-31", preavisoDado: false, cobradoEnElAnio: null, vacacionesPendientes: 12 },
    esperado: { aguinaldo: 1766667, vacaciones: 1200000, descuentoPreaviso: -2250000, total: 716667 },
  },
  {
    nombre: "Renuncia con preaviso y total cobrado conocido",
    origen: { tipo: "recalculado", detalle: "Aguinaldo 30.000.000 / 12 = 2.500.000. Sin vacaciones pendientes ni descuento." },
    fecha: "2026-10-12",
    entrada: { salario: 3500000, ingreso: "2022-04-01", egreso: "2026-09-30", preavisoDado: true, cobradoEnElAnio: 30000000, vacacionesPendientes: 0 },
    esperado: { aguinaldo: 2500000, vacaciones: 0, descuentoPreaviso: 0, total: 2500000 },
  },
]);
