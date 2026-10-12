import { definirCasos } from "@/motor/calculo";
import sociedades from "./impuesto-renta-sociedades";

export default definirCasos(sociedades, [
  {
    nombre: "Utilidad de 100.000 con 5.000 no deducibles",
    origen: {
      tipo: "recalculado",
      detalle: "CT art. 97: 15 % = 15.000. Base 100.000 − 15.000 + 5.000 = 90.000. LRTI art. 37: 25 % = 22.500. Utilidad neta 62.500.",
    },
    fecha: "2026-10-07",
    entrada: { utilidad: 100000, noDeducibles: 5000, exentos: 0, recargo: false },
    esperado: { participacion: 15000, base: 90000, tarifa: 25, impuesto: 22500, utilidadNeta: 62500 },
  },
  {
    nombre: "Con recargo de tres puntos",
    origen: { tipo: "recalculado", detalle: "Utilidad 40.000: participación 6.000, base 34.000, tarifa 28 % = 9.520." },
    fecha: "2026-10-07",
    entrada: { utilidad: 40000, noDeducibles: 0, exentos: 0, recargo: true },
    esperado: { participacion: 6000, base: 34000, tarifa: 28, impuesto: 9520 },
  },
  {
    nombre: "Pérdida: sin participación ni impuesto",
    origen: { tipo: "recalculado", detalle: "Con pérdida no hay participación y la base no puede ser negativa." },
    fecha: "2026-10-07",
    entrada: { utilidad: -5000, noDeducibles: 1000, exentos: 0, recargo: false },
    esperado: { participacion: 0, base: 0, impuesto: 0 },
  },
]);
