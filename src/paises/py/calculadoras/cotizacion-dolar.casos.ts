import { definirCasos } from "@/motor/calculo";
import cotizacionDolar from "./cotizacion-dolar";

export default definirCasos(cotizacionDolar, [
  {
    nombre: "Cien dólares el 7/10/2026",
    origen: { tipo: "oficial", url: "https://www.bcp.gov.py/webapps/web/cotizacion/monedas", detalle: "Planilla del BCP al 7/10/2026: USD 5.751,99. 100 × 5.751,99 = 575.199." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-guaranies", monto: 100 },
    esperado: { cotizacion: 5751.99, fecha: "2026-10-07", guaranies: 575199, dolares: null },
  },
  {
    nombre: "Un millón de guaraníes a dólares",
    origen: { tipo: "recalculado", detalle: "1.000.000 / 5.751,99 = 173,853..., redondeado 173,85." },
    fecha: "2026-10-07",
    entrada: { sentido: "a-dolares", monto: 1000000 },
    esperado: { dolares: 173.85, guaranies: null },
  },
  {
    nombre: "Sábado: vale la del viernes",
    origen: { tipo: "recalculado", detalle: "El sábado 3/10/2026 no hay cotización; se usa la del viernes 2/10: 5.873,69." },
    fecha: "2026-10-03",
    entrada: { sentido: "a-guaranies", monto: 100 },
    esperado: { cotizacion: 5873.69, fecha: "2026-10-02", guaranies: 587369 },
  },
]);
