import { definirCasos } from "@/motor/calculo";
import tipoDeCambio from "./tipo-de-cambio";

export default definirCasos(tipoDeCambio, [
  {
    nombre: "100 dólares con el tipo de cambio SUNAT del 7/10/2026",
    origen: {
      tipo: "oficial",
      url: "https://www.sunat.gob.pe/a/txt/tipoCambio.txt",
      detalle: "SUNAT publicó 07/10/2026|3.431|3.437. 100 × 3.437 = 343.70; 100 × 3.431 = 343.10.",
    },
    fecha: "2026-10-07",
    entrada: { direccion: "dolares-a-soles", monto: 100 },
    esperado: { venta: 3.437, compra: 3.431, fecha: "2026-10-07", conVenta: 343.7, conCompra: 343.1 },
  },
  {
    nombre: "1,000 soles a dólares",
    origen: { tipo: "recalculado", detalle: "1,000 / 3.437 = 290.95; 1,000 / 3.431 = 291.46." },
    fecha: "2026-10-07",
    entrada: { direccion: "soles-a-dolares", monto: 1000 },
    esperado: { conVenta: 290.95, conCompra: 291.46 },
  },
  {
    nombre: "Siete días después todavía vale el último dato",
    origen: { tipo: "recalculado", detalle: "La serie admite hasta 7 días de antigüedad." },
    fecha: "2026-10-14",
    entrada: { direccion: "dolares-a-soles", monto: 10 },
    esperado: { conVenta: 34.37, fecha: "2026-10-07" },
  },
]);
