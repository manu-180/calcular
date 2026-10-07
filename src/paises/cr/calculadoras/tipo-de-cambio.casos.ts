import { definirCasos } from "@/motor/calculo";
import tipoDeCambio from "./tipo-de-cambio";

export default definirCasos(tipoDeCambio, [
  {
    nombre: "Vender 100 dólares el 7 de octubre de 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.bccr.fi.cr/content/bccr/cr/es/home/jcr:content/root/container/container/economicindicators/cardindicador.indicator.317.json",
      detalle: "Tipo de cambio de referencia de compra del BCCR para el 7/10/2026: 453,46. 100 × 453,46 = 45.346.",
    },
    fecha: "2026-10-07",
    entrada: { direccion: "usd-a-crc", monto: 100 },
    esperado: { compra: 453.46, venta: 457.8, fecha: "2026-10-07", colones: 45346, dolares: null },
  },
  {
    nombre: "Comprar dólares con ₡100.000",
    origen: { tipo: "recalculado", detalle: "Referencia de venta 457,80. 100.000 / 457,80 = 218,44." },
    fecha: "2026-10-07",
    entrada: { direccion: "crc-a-usd", monto: 100000 },
    esperado: { colones: null, dolares: 218.44 },
  },
]);
