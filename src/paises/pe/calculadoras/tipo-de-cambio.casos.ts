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
  // Con la serie real, un caso fechado días después de su dato se rompía cada vez que entraba un
  // punto nuevo en el medio, y eso frenaba la publicación de Perú (issue #16). El dato va fijo.
  {
    nombre: "Consulta días después del dato: el resultado lleva la fecha del dato",
    origen: { tipo: "recalculado", detalle: "Dato SUNAT del 07/10/2026 (3.431 / 3.437) consultado el 14/10: 10 × 3.437 = 34.37." },
    fecha: "2026-10-14",
    valores: {
      "pe.tc-sunat-compra": { fecha: "2026-10-07", valor: 3.431 },
      "pe.tc-sunat-venta": { fecha: "2026-10-07", valor: 3.437 },
    },
    entrada: { direccion: "dolares-a-soles", monto: 10 },
    esperado: { conVenta: 34.37, fecha: "2026-10-07" },
  },
]);
