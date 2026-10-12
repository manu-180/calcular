import { definirCasos } from "@/motor/calculo";
import detracciones from "./detracciones";

export default definirCasos(detracciones, [
  {
    nombre: "Caso práctico de la cartilla de SUNAT: servicio de catering",
    origen: {
      tipo: "oficial",
      url: "https://orientacion.sunat.gob.pe/sites/default/files/inline-files/Cartilla_detracciones.pdf",
      detalle: "Cartilla de detracciones, caso práctico: S/ 55,000 más IGV = 64,900; demás servicios gravados con el IGV al 12 %: 7,788.",
    },
    fecha: "2026-10-12",
    entrada: { importe: 64900, servicio: "demas-servicios" },
    esperado: { tasa: 12, detraccion: 7788, saldo: 57112 },
  },
  {
    nombre: "Contrato de construcción",
    origen: { tipo: "recalculado", detalle: "Anexo 3: construcción 4 %. 118,000 × 4 % = 4,720." },
    fecha: "2026-10-12",
    entrada: { importe: 118000, servicio: "construccion" },
    esperado: { tasa: 4, detraccion: 4720 },
  },
  {
    nombre: "Factura de S/ 700: no se detrae",
    origen: { tipo: "recalculado", detalle: "Operaciones de S/ 700 o menos están exceptuadas." },
    fecha: "2026-10-12",
    entrada: { importe: 700, servicio: "demas-servicios" },
    esperado: { detraccion: 0, saldo: 700 },
  },
  {
    nombre: "Arrendamiento de bienes apenas sobre el mínimo",
    origen: { tipo: "recalculado", detalle: "Arrendamiento 10 %: 700.01 × 10 % = 70.00." },
    fecha: "2026-10-12",
    entrada: { importe: 700.01, servicio: "arrendamiento" },
    esperado: { detraccion: 70 },
  },
]);
