import { definirCasos } from "@/motor/calculo";
import rst from "./rst";

const REVISTA = "https://dgii.gov.do/publicacionesOficiales/bibliotecaVirtual/contribuyentes/rst/Documents/Revista%20RST.pdf";

export default definirCasos(rst, [
  {
    nombre: "Empresa con RD$2,000,000 de ingresos (ejemplo de la DGII)",
    origen: { tipo: "oficial", url: REVISTA, detalle: "Revista RST de la DGII: «Empresa RD, S.R.L.» con ingresos de 2,000,000.00 paga 7 %: 140,000.00 de ISR e ITBIS." },
    fecha: "2026-10-08",
    entrada: { tipo: "juridica", ingresos: 2000000 },
    esperado: { impuesto: 140000, tasaEfectiva: 7, rentaNeta: null },
  },
  {
    nombre: "Profesional con RD$2,000,000 de honorarios",
    origen: {
      tipo: "recalculado",
      detalle:
        "Decreto 265-19, art. 17: 2,000,000 − 40 % = 1,200,000 de renta neta. Escala 2026: 79,776 + 25 % × (1,200,000 − 867,123.01) = 162,995.25. La Revista RST de la DGII usa el mismo ejemplo y muestra 162,995.40 (diferencia de centavos en su redondeo).",
    },
    fecha: "2026-10-08",
    entrada: { tipo: "fisica", ingresos: 2000000 },
    esperado: { rentaNeta: 1200000, isr: 162995.25, impuesto: 162995.25, tasaEfectiva: 8.15 },
  },
  {
    nombre: "Renta neta igual a la exención contributiva",
    origen: { tipo: "recalculado", detalle: "693,700 − 40 % = 416,220, el límite del tramo exento de 2026: ISR 0." },
    fecha: "2026-10-08",
    entrada: { tipo: "fisica", ingresos: 693700 },
    esperado: { rentaNeta: 416220, impuesto: 0 },
  },
  {
    nombre: "Justo en el tope del RST por ingresos",
    origen: {
      tipo: "recalculado",
      detalle: "Tope 2026 de 12,068,181.09 (Res. DDG-AR1-2026-00001). Renta neta 7,240,908.65; ISR 79,776 + 25 % × (7,240,908.65 − 867,123.01) = 1,673,222.41.",
    },
    fecha: "2026-10-08",
    entrada: { tipo: "fisica", ingresos: 12068181.09 },
    esperado: { rentaNeta: 7240908.65, impuesto: 1673222.41 },
  },
  {
    nombre: "Un centavo por encima del tope",
    origen: { tipo: "recalculado", detalle: "12,068,181.10 supera el tope de 2026: no puede estar en el RST por ingresos." },
    fecha: "2026-10-08",
    entrada: { tipo: "juridica", ingresos: 12068181.1 },
    esperaError: true,
  },
]);
