import { definirCasos } from "@/motor/calculo";
import impuestoPremios from "./impuesto-premios";

export default definirCasos(impuestoPremios, [
  {
    nombre: "Premio de lotería de RD$1,000,000",
    origen: { tipo: "recalculado", detalle: "Art. 309 literal c (Ley 30-26): 25 %. Retención 250,000; cobras 750,000." },
    fecha: "2026-10-12",
    entrada: { premio: 1000000, origen: "loteria" },
    esperado: { tasa: 25, impuesto: 250000, neto: 750000 },
  },
  {
    nombre: "Banca: premio de RD$500,000",
    origen: { tipo: "recalculado", detalle: "Escala de bancas desde el 1/7/2026: de 200,001 a 600,000, 15 % sobre el premio. 75,000." },
    fecha: "2026-10-12",
    entrada: { premio: 500000, origen: "banca" },
    esperado: { tasa: 15, impuesto: 75000, neto: 425000 },
  },
  {
    nombre: "Banca: premio de RD$700,000",
    origen: { tipo: "recalculado", detalle: "Más de 600,001: 25 % = 175,000." },
    fecha: "2026-10-12",
    entrada: { premio: 700000, origen: "banca" },
    esperado: { tasa: 25, impuesto: 175000 },
  },
  {
    nombre: "Banca: premio de RD$150,000",
    origen: { tipo: "recalculado", detalle: "La escala empieza en más de 200,001: sin retención." },
    fecha: "2026-10-12",
    entrada: { premio: 150000, origen: "banca" },
    esperado: { tasa: 0, impuesto: 0, neto: 150000 },
  },
  {
    nombre: "Banca antes de julio de 2026",
    origen: { tipo: "recalculado", detalle: "Guía de la DGII: de 100,001 a 500,000, 10 %. 150,000 × 10 % = 15,000." },
    fecha: "2026-06-15",
    entrada: { premio: 150000, origen: "banca" },
    esperado: { tasa: 10, impuesto: 15000 },
  },
]);
