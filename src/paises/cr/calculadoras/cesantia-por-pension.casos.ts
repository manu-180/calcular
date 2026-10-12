import { definirCasos } from "@/motor/calculo";
import cesantiaPorPension from "./cesantia-por-pension";

export default definirCasos(cesantiaPorPension, [
  {
    nombre: "Veintiséis años en la empresa",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 1/3/2000 al 28/2/2026: 26 años. Art. 29: fila 13 y siguientes, 20 días por año, tope de 8 años: 160 días × 40.000 = 6.400.000. Aguinaldo 3 meses: 300.000. Vacaciones 10 × 40.000 = 400.000. Total 7.100.000.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1200000, fechaIngreso: "2000-03-01", fechaSalida: "2026-02-28", vacaciones: 10, salariosAguinaldo: null },
    esperado: { diasCesantia: 160, cesantia: 6400000, aguinaldo: 300000, vacaciones: 400000, total: 7100000 },
  },
  {
    nombre: "Cinco años y siete meses",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2021 al 30/9/2026: cuentan 6 años, fila 6: 21,5 × 6 = 129 días × 20.000 = 2.580.000. Aguinaldo con salarios reales 6.000.000 / 12 = 500.000." },
    fecha: "2026-10-12",
    entrada: { salario: 600000, fechaIngreso: "2021-03-01", fechaSalida: "2026-09-30", vacaciones: 0, salariosAguinaldo: 6000000 },
    esperado: { diasCesantia: 129, cesantia: 2580000, aguinaldo: 500000, total: 3080000 },
  },
]);
