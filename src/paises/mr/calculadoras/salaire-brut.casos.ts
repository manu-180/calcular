import { definirCasos } from "@/motor/calculo";
import calculadora from "./salaire-brut";

export default definirCasos(calculadora, [
  {
    nombre: "Neto 23.640 MRU con CNAM",
    origen: {
      tipo: "recalculado",
      detalle: "Con base ITS entre 22.640 y 22.650 (redondeo a la decena), ITS = 22.640 x 0,40 - 4.050 = 5.006 y neto = 0,96 B - 150 - 5.006. Neto 23.640 da B = 29.995,84. El bruto 30.000 también da 23.640 (ver salaire-net).",
    },
    fecha: "2026-10-29",
    entrada: { net: 23640, cnam: true },
    esperado: { brut: 29996, net: 23640 },
    tolerancia: 5,
  },
  {
    nombre: "Neto 10.998 MRU sin CNAM",
    origen: { tipo: "recalculado", detalle: "Inverso del caso de salaire-net: bruto 12.000 deja 10.998 (CNSS 120, ITS 882). Base 0,99 B - 6.000 en el primer tramo: neto = 0,99 B - 0,15 x (0,99 B - 6.000) = 0,8415 B + 900." },
    fecha: "2026-10-29",
    entrada: { net: 10998, cnam: false },
    esperado: { brut: 12000, cnss: 120, its: 882 },
    tolerancia: 5,
  },
  {
    nombre: "Sin neto",
    origen: { tipo: "recalculado", detalle: "Neto 0." },
    fecha: "2026-10-29",
    entrada: { net: 0, cnam: true },
    esperaError: true,
  },
]);
