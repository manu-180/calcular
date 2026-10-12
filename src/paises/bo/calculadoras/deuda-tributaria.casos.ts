import { definirCasos } from "@/motor/calculo";
import deudaTributaria from "./deuda-tributaria";

const CT = "https://www.impuestos.gob.bo/wp-content/uploads/2026/07/2.-LEY-N%C2%B0-2492-06-26-3.pdf" as const;

export default definirCasos(deudaTributaria, [
  {
    nombre: "Veintiséis días de mora",
    origen: {
      tipo: "recalculado",
      url: CT,
      detalle:
        "Art. 47: TO = 10.000 / 3,34497 = 2.989,56 UFV. Al 12/10/2026 (UFV 3,35681): 10.035,40. Intereses 4 % anual, 26 días: TO × ((1 + 0,04/360)^26 − 1) × 3,35681 = 29,03. Deuda 10.064,43. Multa 60 % = 6.021,24.",
    },
    fecha: "2026-10-12",
    entrada: { tributo: 10000, vencimiento: "2026-09-16", ufvVencimiento: 3.34497 },
    esperado: { omitidoUfv: 2989.56, dias: 26, actualizado: 10035.4, mantenimiento: 35.4, intereses: 29.03, deuda: 10064.43, multa: 6021.24 },
  },
  {
    nombre: "Más de cuatro años: tramos de 4 % y 6 %",
    origen: {
      tipo: "recalculado",
      url: CT,
      detalle: "Vence 20/01/2021. Hasta el 20/01/2025 son 1.461 días al 4 %; después 630 días al 6 %. TO = 5.000 / 2,35 = 2.127,66 UFV. Intereses sumados por tramo: 2.049,39. Deuda 9.191,54.",
    },
    fecha: "2026-10-12",
    entrada: { tributo: 5000, vencimiento: "2021-01-20", ufvVencimiento: 2.35 },
    esperado: { dias: 2091, actualizado: 7142.15, intereses: 2049.39, deuda: 9191.54 },
  },
  {
    nombre: "Más de siete años: los tres tramos",
    origen: { tipo: "recalculado", url: CT, detalle: "Vence 15/06/2017: 1.461 días al 4 %, 1.096 al 6 % y 849 al 10 %. TO = 1.000 / 2,2 = 454,55 UFV. Intereses 980,43. Deuda 2.506,25." },
    fecha: "2026-10-12",
    entrada: { tributo: 1000, vencimiento: "2017-06-15", ufvVencimiento: 2.2 },
    esperado: { dias: 3406, actualizado: 1525.82, intereses: 980.43, deuda: 2506.25 },
  },
  {
    nombre: "Vencimiento en el futuro",
    origen: { tipo: "recalculado", detalle: "Sin mora no hay deuda tributaria." },
    fecha: "2026-10-12",
    entrada: { tributo: 1000, vencimiento: "2026-11-15", ufvVencimiento: 3.35 },
    esperaError: true,
  },
]);
