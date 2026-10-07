import { definirCasos } from "@/motor/calculo";
import igv from "./igv";

export default definirCasos(igv, [
  {
    nombre: "Agregar el IGV a S/ 100 en 2026",
    origen: {
      tipo: "oficial",
      url: "https://orientacion.sunat.gob.pe/3053-concepto-tasa-y-operaciones-gravadas-igv-empresas",
      detalle: "SUNAT, tabla de la Ley 32387 para 2026: IGV 15.5 % + IPM 2.5 % = 18 %. Sobre 100: 15.50 + 2.50 = 118.",
    },
    fecha: "2026-10-07",
    entrada: { monto: 100, operacion: "agregar", tasa: "general" },
    esperado: { igv: 15.5, ipm: 2.5, impuestoTotal: 18, precioFinal: 118, tasaTotal: 18 },
  },
  {
    nombre: "Quitar el IGV de S/ 118",
    origen: { tipo: "recalculado", detalle: "118 / 1.18 = 100; impuestos 18, de los que 15.50 son IGV y 2.50 IPM." },
    fecha: "2026-10-07",
    entrada: { monto: 118, operacion: "quitar", tasa: "general" },
    esperado: { base: 100, igv: 15.5, ipm: 2.5, precioFinal: 118 },
  },
  {
    nombre: "Quitar el IGV de un precio con centavos",
    origen: { tipo: "recalculado", detalle: "59.90 / 1.18 = 50.7627 → 50.76; impuestos 9.14; IGV 9.14 × 15.5 / 18 = 7.87; IPM 1.27." },
    fecha: "2026-10-07",
    entrada: { monto: 59.9, operacion: "quitar", tasa: "general" },
    esperado: { base: 50.76, impuestoTotal: 9.14, igv: 7.87, ipm: 1.27, precioFinal: 59.9 },
  },
  {
    nombre: "Restaurante MYPE en 2026: 10.5 %",
    origen: {
      tipo: "oficial",
      url: "https://orientacion.sunat.gob.pe/reduccion-del-igv-para-restaurantes-hoteles-y-alojamiento-turisticos-1",
      detalle: "SUNAT: tasa especial 2026 de IGV 8 % + IPM 2.5 % = 10.50 %.",
    },
    fecha: "2026-10-07",
    entrada: { monto: 100, operacion: "agregar", tasa: "restaurantes" },
    esperado: { igv: 8, ipm: 2.5, precioFinal: 110.5, tasaTotal: 10.5 },
  },
  {
    nombre: "Primer día de 2027: IGV 15 % e IPM 3 %",
    origen: { tipo: "recalculado", detalle: "Ley 32387: en 2027 el IGV es 15 % y el IPM 3 %; el total sigue en 18 %." },
    fecha: "2027-01-01",
    entrada: { monto: 100, operacion: "agregar", tasa: "general" },
    esperado: { igv: 15, ipm: 3, precioFinal: 118 },
  },
  {
    nombre: "Último día de 2026",
    origen: { tipo: "recalculado", detalle: "El 31/12/2026 todavía rige 15.5 % + 2.5 %." },
    fecha: "2026-12-31",
    entrada: { monto: 100, operacion: "agregar", tasa: "general" },
    esperado: { igv: 15.5, ipm: 2.5 },
  },
]);
