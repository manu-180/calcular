import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

export default definirCasos(liquidacion, [
  {
    nombre: "Cinco años y fracción con $600",
    origen: {
      tipo: "recalculado",
      url: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/D/2/1970-1979/1972/07/886E0.PDF",
      detalle:
        "Del 1/3/2021 al 30/9/2026: 5 años y 214 días. Diario 20. Art. 58: (150 + 30 × 214 / 365) × 20 = 3.351,78. Art. 187: 15 × 214 / 365 × 20 × 1,3 = 228,66. Art. 202 (D.L. 669): del 13/12/2025 al 30/9/2026 son 292 días; 19 × 292 / 365 × 20 = 304. Total 3.884,44.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 600, inicio: "2021-03-01", fin: "2026-09-30", region: "comercio-servicios", vacacionesPendientes: false, diasPendientes: 0 },
    esperado: { tiempo: "5 años y 214 días", indemnizacion: 3351.78, vacaciones: 228.66, aguinaldo: 304, total: 3884.44 },
  },
  {
    nombre: "Diez años con salario alto, vacaciones sin gozar y días pendientes",
    origen: {
      tipo: "recalculado",
      detalle: "Tope 4 × 13,44 = 53,76: 300 × 53,76 = 16.128. Vacaciones completas 15 × 100 × 1,3 = 1.950. Aguinaldo 21 × 292 / 365 × 100 = 1.680. Diez días: 1.000. Total 20.758.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 3000, inicio: "2016-10-01", fin: "2026-09-30", region: "comercio-servicios", vacacionesPendientes: true, diasPendientes: 10 },
    esperado: { indemnizacion: 16128, vacaciones: 1950, aguinaldo: 1680, salarioPendiente: 1000, total: 20758 },
  },
  {
    nombre: "Despido después del 12 de diciembre",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/6 al 20/12/2026: 203 días. Indemnización 30 × 203 / 365 × 15 = 250,27. Vacaciones 15 × 203 / 365 × 15 × 1,3 = 162,68. Aguinaldo desde el 13/12: 8 días, 15 × 8 / 365 × 15 = 4,93.",
    },
    fecha: "2026-12-20",
    entrada: { salario: 450, inicio: "2026-06-01", fin: "2026-12-20", region: "comercio-servicios", vacacionesPendientes: false, diasPendientes: 0 },
    esperado: { indemnizacion: 250.27, vacaciones: 162.68, aguinaldo: 4.93, total: 417.88 },
  },
  {
    nombre: "Último día anterior al inicio",
    origen: { tipo: "recalculado", detalle: "Entrada imposible: tiene que dar error." },
    fecha: "2026-10-12",
    entrada: { salario: 600, inicio: "2026-05-01", fin: "2026-04-30", region: "comercio-servicios", vacacionesPendientes: false, diasPendientes: 0 },
    esperaError: true,
  },
]);
