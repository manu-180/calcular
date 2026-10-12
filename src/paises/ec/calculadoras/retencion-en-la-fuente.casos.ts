import { definirCasos } from "@/motor/calculo";
import retencion from "./retencion-en-la-fuente";

export default definirCasos(retencion, [
  {
    nombre: "Honorarios profesionales de 1.000 con IVA",
    origen: {
      tipo: "oficial",
      url: "https://www.sri.gob.ec/o/sri-portlet-biblioteca-alfresco-internet/descargar/e7df4e4f-ed02-4530-82f9-98a5b99b3392/Porcentajes%20de%20retencion%20Impuesto%20a%20la%20Renta.xls",
      detalle: "Tabla del SRI desde marzo de 2026: honorarios profesionales 10 %. 1.000 × 10 % = 100. IVA 15 % = 150. Total 1.150; recibe 1.050.",
    },
    fecha: "2026-10-07",
    entrada: { subtotal: 1000, concepto: "honorarios", conIva: true },
    esperado: { tasa: 10, retencion: 100, iva: 150, total: 1150, neto: 1050 },
  },
  {
    nombre: "Compra de bienes de 500",
    origen: { tipo: "recalculado", detalle: "Bienes muebles 2 %: 10. IVA 75. Total 575; recibe 565." },
    fecha: "2026-10-07",
    entrada: { subtotal: 500, concepto: "bienes", conIva: true },
    esperado: { tasa: 2, retencion: 10, iva: 75, neto: 565 },
  },
  {
    nombre: "Compra a un RIMPE negocio popular",
    origen: { tipo: "recalculado", detalle: "Negocio popular: 0 % de retención. Sin IVA en la nota de venta." },
    fecha: "2026-10-07",
    entrada: { subtotal: 300, concepto: "rimpe-popular", conIva: false },
    esperado: { tasa: 0, retencion: 0, iva: 0, neto: 300 },
  },
  {
    nombre: "Arriendo de un local de 800 sin IVA",
    origen: { tipo: "recalculado", detalle: "Arrendamiento de inmuebles: 10 % = 80. Sin IVA: recibe 720." },
    fecha: "2026-10-07",
    entrada: { subtotal: 800, concepto: "arriendo", conIva: false },
    esperado: { tasa: 10, retencion: 80, neto: 720 },
  },
]);
