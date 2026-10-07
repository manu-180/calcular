import { definirCasos } from "@/motor/calculo";
import iva from "./iva";

export default definirCasos(iva, [
  {
    nombre: "Sacar el IVA general de una factura",
    origen: { tipo: "recalculado", url: "https://www.dnit.gov.py/web/portal-institucional/iva", detalle: "Tasa 10 % incluida: 110.000 × 10 / 110 = 10.000. Gravado 100.000." },
    fecha: "2026-10-07",
    entrada: { operacion: "discriminar", tasa: "general", monto: 110000 },
    esperado: { tasa: 10, sinIva: 100000, iva: 10000, total: 110000 },
  },
  {
    nombre: "Sacar el IVA reducido",
    origen: { tipo: "recalculado", detalle: "Tasa 5 % incluida: 105.000 × 5 / 105 = 5.000." },
    fecha: "2026-10-07",
    entrada: { operacion: "discriminar", tasa: "reducida", monto: 105000 },
    esperado: { tasa: 5, sinIva: 100000, iva: 5000 },
  },
  {
    nombre: "Sumar el IVA general",
    origen: { tipo: "recalculado", detalle: "250.000 × 10 % = 25.000; total 275.000." },
    fecha: "2026-10-07",
    entrada: { operacion: "agregar", tasa: "general", monto: 250000 },
    esperado: { sinIva: 250000, iva: 25000, total: 275000 },
  },
  {
    nombre: "Redondeo a guaraníes enteros",
    origen: { tipo: "recalculado", detalle: "99.999 / 11 = 9.090,82, redondeado 9.091. Gravado 90.908." },
    fecha: "2026-10-07",
    entrada: { operacion: "discriminar", tasa: "general", monto: 99999 },
    esperado: { iva: 9091, sinIva: 90908, total: 99999 },
  },
]);
