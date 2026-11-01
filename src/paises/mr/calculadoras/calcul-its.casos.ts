import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-its";

export default definirCasos(calculadora, [
  {
    nombre: "Desde el bruto 30.000 MRU",
    origen: {
      tipo: "recalculado",
      detalle: "Base 30.000 - 150 (CNSS) - 1.200 (CNAM) - 6.000 = 22.650. Tramos: 9.000 x 15 % = 1.350; 12.000 x 25 % = 3.000; 1.650 x 40 % = 660. Total 5.010 = 22.650 x 0,40 - 4.050 (fórmula del art. 114 CGI).",
    },
    fecha: "2026-10-29",
    entrada: { modo: "brut", montant: 30000, indemnites: 0, cnam: true },
    esperado: { imponible: 22650, tranche1: 1350, tranche2: 3000, tranche3: 660, its: 5010, marginal: 40, anual: 60120 },
  },
  {
    nombre: "Con indemnizaciones exentas por encima del tope",
    origen: { tipo: "recalculado", detalle: "Exentas 2.000 topadas en 1.000 (art. 110 b). Base 30.000 - 1.000 - 150 - 1.200 - 6.000 = 21.650. ITS 21.650 x 0,40 - 4.050 = 4.610." },
    fecha: "2026-10-29",
    entrada: { modo: "brut", montant: 30000, indemnites: 2000, cnam: true },
    esperado: { imponible: 21650, its: 4610 },
  },
  {
    nombre: "Base imponible directa con redondeo",
    origen: { tipo: "recalculado", detalle: "15.003 se redondea a 15.000 (art. 114, 3). ITS 15.000 x 0,25 - 900 = 2.850. Tasa media 19 %." },
    fecha: "2026-10-29",
    entrada: { modo: "imposable", montant: 15003, indemnites: null, cnam: null },
    esperado: { imponible: 15000, its: 2850, tranche3: 0, moyen: 19, marginal: 25 },
  },
  {
    nombre: "Primer tramo",
    origen: { tipo: "recalculado", detalle: "Base 8.000 x 15 % = 1.200." },
    fecha: "2026-10-29",
    entrada: { modo: "imposable", montant: 8000, indemnites: null, cnam: null },
    esperado: { its: 1200, marginal: 15 },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Sin monto." },
    fecha: "2026-10-29",
    entrada: { modo: "imposable", montant: 0, indemnites: null, cnam: null },
    esperaError: true,
  },
]);
