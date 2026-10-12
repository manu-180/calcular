import { definirCasos } from "@/motor/calculo";
import cotizacionPesoArgentino from "./cotizacion-peso-argentino";

export default definirCasos(cotizacionPesoArgentino, [
  {
    nombre: "100.000 pesos argentinos el 7/10/2026",
    origen: { tipo: "oficial", url: "https://www.bcp.gov.py/webapps/web/cotizacion/monedas", detalle: "Planilla del BCP al 7/10/2026: 3,78 guaraníes por peso argentino. 100.000 × 3,78 = 378.000,00." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-guaranies", monto: 100000 },
    esperado: { cotizacion: 3.78, fecha: "2026-10-07", guaranies: 378000.0, moneda: null },
  },
  {
    nombre: "Un millón de guaraníes a pesos argentinos",
    origen: { tipo: "recalculado", detalle: "1.000.000 / 3,78 = 264.550,26." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-moneda", monto: 1000000 },
    esperado: { moneda: 264550.26, guaranies: null },
  },
  {
    nombre: "Sábado: vale la del viernes",
    origen: { tipo: "recalculado", detalle: "El sábado 3/10/2026 no hay cotización; se usa la del viernes 2/10: 3,86." },
    fecha: "2026-10-03",
    entrada: { sentido: "a-guaranies", monto: 1 },
    esperado: { cotizacion: 3.86, fecha: "2026-10-02" },
  },
]);
