import { definirCasos } from "@/motor/calculo";
import retencionesIr from "./retenciones-ir";

export default definirCasos(retencionesIr, [
  {
    nombre: "Compra de bienes por C$50,000",
    origen: { tipo: "recalculado", detalle: "Reglamento de la LCT, art. 44 numeral 2.2 (Decreto 08-2019): 2 %. 50000 × 2 % = 1000; pago 49000." },
    fecha: "2026-10-12",
    entrada: { tipo: "bienes-servicios", monto: 50000 },
    esperado: { tasa: 2, retencion: 1000, neto: 49000 },
  },
  {
    nombre: "Factura de C$900 en bienes: no se retiene",
    origen: { tipo: "recalculado", detalle: "Numeral 3: las retenciones de 2.1 y 2.2 se aplican desde C$1,000 por factura." },
    fecha: "2026-10-12",
    entrada: { tipo: "bienes-servicios", monto: 900 },
    esperado: { retencion: 0, neto: 900 },
  },
  {
    nombre: "Ventas con tarjeta por C$20,000",
    origen: { tipo: "recalculado", detalle: "Numeral 2.1: 1.5 %. 20000 × 1.5 % = 300." },
    fecha: "2026-10-12",
    entrada: { tipo: "tarjetas", monto: 20000 },
    esperado: { tasa: 1.5, retencion: 300 },
  },
  {
    nombre: "Compra agropecuaria chica",
    origen: { tipo: "recalculado", detalle: "Numeral 2.3: 3 %, sin mínimo. 500 × 3 % = 15." },
    fecha: "2026-10-12",
    entrada: { tipo: "agropecuarios", monto: 500 },
    esperado: { retencion: 15 },
  },
]);
