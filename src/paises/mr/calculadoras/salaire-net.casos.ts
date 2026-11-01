import { definirCasos } from "@/motor/calculo";
import calculadora from "./salaire-net";

export default definirCasos(calculadora, [
  {
    nombre: "Bruto 30.000 MRU con CNAM",
    origen: {
      tipo: "recalculado",
      detalle: "CNSS 1 % de 15.000 (tope) = 150. CNAM 4 % de 30.000 = 1.200. Base ITS 30.000 - 150 - 1.200 - 6.000 = 22.650. ITS 22.650 x 0,40 - 4.050 = 5.010 (art. 114 CGI). Neto 30.000 - 150 - 1.200 - 5.010 = 23.640.",
    },
    fecha: "2026-10-29",
    entrada: { brut: 30000, cnam: true },
    esperado: { cnss: 150, cnam: 1200, imponible: 22650, its: 5010, neto: 23640, retenues: 6360, anual: 283680 },
  },
  {
    nombre: "Bruto 12.000 MRU sin CNAM, primer tramo",
    origen: { tipo: "recalculado", detalle: "CNSS 1 % de 12.000 = 120. Base 12.000 - 120 - 6.000 = 5.880. ITS 15 % = 882. Neto 12.000 - 120 - 882 = 10.998." },
    fecha: "2026-10-29",
    entrada: { brut: 12000, cnam: false },
    esperado: { cnss: 120, cnam: 0, imponible: 5880, its: 882, neto: 10998 },
  },
  {
    nombre: "Bruto 20.000 MRU, segundo tramo y redondeo a la decena",
    origen: { tipo: "recalculado", detalle: "CNSS 150. CNAM 800. Base 20.000 - 150 - 800 - 6.000 = 13.050. ITS 13.050 x 0,25 - 900 = 2.362,5. Neto 20.000 - 150 - 800 - 2.362,5 = 16.687,5." },
    fecha: "2026-10-29",
    entrada: { brut: 20000, cnam: true },
    esperado: { imponible: 13050, its: 2362.5, neto: 16687.5 },
  },
  {
    nombre: "Sueldo mínimo sin ITS",
    origen: { tipo: "recalculado", detalle: "Bruto 5.000: CNSS 50, CNAM 200. Base 5.000 - 250 - 6.000 < 0: sin ITS. Neto 4.750." },
    fecha: "2026-10-29",
    entrada: { brut: 5000, cnam: true },
    esperado: { its: 0, neto: 4750 },
  },
  {
    nombre: "Sin bruto",
    origen: { tipo: "recalculado", detalle: "Bruto 0." },
    fecha: "2026-10-29",
    entrada: { brut: 0, cnam: true },
    esperaError: true,
  },
]);
