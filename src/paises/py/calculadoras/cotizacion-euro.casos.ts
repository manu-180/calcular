import { definirCasos } from "@/motor/calculo";
import cotizacionEuro from "./cotizacion-euro";

export default definirCasos(cotizacionEuro, [
  {
    nombre: "100 euros el 7/10/2026",
    origen: { tipo: "oficial", url: "https://www.bcp.gov.py/webapps/web/cotizacion/monedas", detalle: "Planilla del BCP al 7/10/2026: 6.439,35 guaraníes por euro. 100 × 6.439,35 = 643.935,00." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-guaranies", monto: 100 },
    esperado: { cotizacion: 6439.35, fecha: "2026-10-07", guaranies: 643935.0, moneda: null },
  },
  {
    nombre: "Un millón de guaraníes a euros",
    origen: { tipo: "recalculado", detalle: "1.000.000 / 6.439,35 = 155,30." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-moneda", monto: 1000000 },
    esperado: { moneda: 155.3, guaranies: null },
  },
  {
    nombre: "Sábado: vale la del viernes",
    origen: { tipo: "recalculado", detalle: "El sábado 3/10/2026 no hay cotización; se usa la del viernes 2/10: 6.623,17." },
    fecha: "2026-10-03",
    entrada: { sentido: "a-guaranies", monto: 1 },
    esperado: { cotizacion: 6623.17, fecha: "2026-10-02" },
  },
]);
