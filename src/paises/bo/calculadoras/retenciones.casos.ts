import { definirCasos } from "@/motor/calculo";
import retenciones from "./retenciones";

const L843 = "https://www.impuestos.gob.bo/wp-content/uploads/2026/09/1.-LEY-N%C2%B0-843-08-26.pdf" as const;

export default definirCasos(retenciones, [
  {
    nombre: "Servicio sin factura de Bs 1.000",
    origen: { tipo: "recalculado", url: L843, detalle: "D.S. 21531 art. 11 (RC-IVA 13 %) y D.S. 21532 art. 10 (IT 3 %): 130 + 30 = 160. Recibe 840." },
    fecha: "2026-10-12",
    entrada: { tipo: "servicio", modo: "bruto", monto: 1000 },
    esperado: { bruto: 1000, rcIva: 130, iue: 0, it: 30, tasaTotal: 16, total: 160, liquido: 840 },
  },
  {
    nombre: "Compra de bienes sin factura",
    origen: { tipo: "recalculado", url: L843, detalle: "D.S. 24051 art. 3: 25 % del 20 % = 5 % de IUE; más 3 % de IT. Sobre 1.000: 50 + 30 = 80." },
    fecha: "2026-10-12",
    entrada: { tipo: "bienes", modo: "bruto", monto: 1000 },
    esperado: { rcIva: 0, iue: 50, it: 30, tasaTotal: 8, total: 80, liquido: 920 },
  },
  {
    nombre: "Servicio con grossing up",
    origen: { tipo: "recalculado", detalle: "La persona debe recibir 840: bruto 840 / 0,84 = 1.000; retiene 160." },
    fecha: "2026-10-12",
    entrada: { tipo: "servicio", modo: "liquido", monto: 840 },
    esperado: { bruto: 1000, total: 160, liquido: 840 },
  },
  {
    nombre: "Alquiler sin factura",
    origen: { tipo: "recalculado", detalle: "Alquiler 2.500: RC-IVA 325 + IT 75 = 400. Recibe 2.100." },
    fecha: "2026-10-12",
    entrada: { tipo: "alquiler", modo: "bruto", monto: 2500 },
    esperado: { rcIva: 325, it: 75, total: 400, liquido: 2100 },
  },
]);
