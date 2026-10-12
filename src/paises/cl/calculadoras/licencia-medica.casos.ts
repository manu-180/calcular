import { definirCasos } from "@/motor/calculo";
import licenciaMedica from "./licencia-medica";

export default definirCasos(licenciaMedica, [
  {
    nombre: "Licencia de 15 días con $1.500.000 imponible",
    origen: {
      tipo: "recalculado",
      detalle:
        "DFL 44 arts. 7, 14 y 16. Neta = 1.500.000 − AFP Uno 156.900 − salud 105.000 − cesantía 9.000 − impuesto 10.202 = 1.218.898. Diario 1.218.898 / 30 = 40.629,93 → 40.630. Más de 10 días: se pagan los 15. 40.629,93 × 15 = 609.449.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 1500000, afp: "uno", contrato: "indefinido", dias: 15 },
    esperado: { neta: 1218898, diario: 40630, diasPagados: 15, subsidio: 609449 },
  },
  {
    nombre: "Licencia de 7 días: 3 sin pago",
    origen: { tipo: "recalculado", detalle: "Art. 14: licencias de 10 días o menos se pagan desde el cuarto día. 4 días × 40.629,93 = 162.519,7 → 162.520." },
    fecha: "2026-10-07",
    entrada: { imponible: 1500000, afp: "uno", contrato: "indefinido", dias: 7 },
    esperado: { diasPagados: 4, diasSinPago: 3, subsidio: 162520 },
  },
  {
    nombre: "Sueldo bajo: se aplica el mínimo",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 17: mínimo diario = 50 % de 553.553 / 30 = 9.225,88. Imponible 300.000 (AFP Modelo, plazo fijo): neta 300.000 − 31.740 − 21.000 = 247.260; / 30 = 8.242 < mínimo. 12 días × 9.225,88 = 110.710,6 → 110.711.",
    },
    fecha: "2026-10-07",
    entrada: { imponible: 300000, afp: "modelo", contrato: "plazo-fijo", dias: 12 },
    esperado: { neta: 247260, diario: 9226, subsidio: 110711 },
  },
]);
