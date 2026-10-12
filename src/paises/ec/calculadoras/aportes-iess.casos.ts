import { definirCasos } from "@/motor/calculo";
import aportesIess from "./aportes-iess";

export default definirCasos(aportesIess, [
  {
    nombre: "Sueldo de 1.000",
    origen: {
      tipo: "oficial",
      url: "https://www.iess.gob.ec/documents/13718/54965/Tasasdeaportacion.pdf",
      detalle: "Tasas del IESS para el sector privado: personal 9,45 % = 94,50; patronal 11,15 % = 111,50; total 20,60 % = 206. Cesantía 2 % + 1 % = 30.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 1000 },
    esperado: { base: 1000, personal: 94.5, patronal: 111.5, total: 206, cesantia: 30 },
  },
  {
    nombre: "Salario básico 2026",
    origen: { tipo: "recalculado", detalle: "482 × 9,45 % = 45,55; × 11,15 % = 53,74; total 99,29. Cesantía 3 % = 14,46." },
    fecha: "2026-10-07",
    entrada: { sueldo: 482 },
    esperado: { personal: 45.55, patronal: 53.74, total: 99.29, cesantia: 14.46 },
  },
  {
    nombre: "Sueldo menor al básico: se aporta sobre el básico",
    origen: { tipo: "recalculado", detalle: "La base mínima es el salario básico: 482." },
    fecha: "2026-10-07",
    entrada: { sueldo: 300 },
    esperado: { base: 482, personal: 45.55 },
  },
]);
