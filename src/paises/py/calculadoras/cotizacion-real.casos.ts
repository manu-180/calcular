import { definirCasos } from "@/motor/calculo";
import cotizacionReal from "./cotizacion-real";

export default definirCasos(cotizacionReal, [
  {
    nombre: "100 reales el 7/10/2026",
    origen: { tipo: "oficial", url: "https://www.bcp.gov.py/webapps/web/cotizacion/monedas", detalle: "Planilla del BCP al 7/10/2026: 1.151,43 guaraníes por real. 100 × 1.151,43 = 115.143,00." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-guaranies", monto: 100 },
    esperado: { cotizacion: 1151.43, fecha: "2026-10-07", guaranies: 115143.0, moneda: null },
  },
  {
    nombre: "Un millón de guaraníes a reales",
    origen: { tipo: "recalculado", detalle: "1.000.000 / 1.151,43 = 868,49." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-moneda", monto: 1000000 },
    esperado: { moneda: 868.49, guaranies: null },
  },
  {
    nombre: "Sábado: vale la del viernes",
    origen: { tipo: "recalculado", detalle: "El sábado 3/10/2026 no hay cotización; se usa la del viernes 2/10: 1.122,90." },
    fecha: "2026-10-03",
    entrada: { sentido: "a-guaranies", monto: 1 },
    esperado: { cotizacion: 1122.9, fecha: "2026-10-02" },
  },
]);
