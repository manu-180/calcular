import { definirCasos } from "@/motor/calculo";
import calculadora from "./sachar-neto";

export default definirCasos(calculadora, [
  {
    nombre: "15.000 brutos, hombre, pensión 6 %",
    origen: {
      tipo: "recalculado",
      detalle:
        "Impuesto: 7.010 x 10 % + 3.050 x 14 % + 4.940 x 20 % = 2.116; menos 2,25 x 242 = 544,5 y 35 % de min(900; 7 % de 9.700 = 679) = 237,65: 1.333,85. BL: 7.703 x 1,04 % + 7.297 x 7 % = 590,90. Salud: 7.703 x 3,23 % + 7.297 x 5,17 % = 626,06. Neto 15.000 - 1.333,85 - 590,90 - 626,06 - 900 = 11.549,19.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 15000, min: "gever", nekudotNosafot: 0, pensia: 6 },
    esperado: { masHachnasa: 1333.85, bituachLeumi: 590.9, masBriut: 626.06, pensia: 900, neto: 11549.19, shiurShuli: 20 },
  },
  {
    nombre: "10.000 brutos, mujer con 2 puntos más: sin impuesto",
    origen: {
      tipo: "recalculado",
      detalle: "Impuesto 701 + 2.990 x 14 % = 1.119,6, menos 4,75 x 242 = 1.149,5 y 35 % de 600 = 210: queda 0. BL 80,11 + 2.297 x 7 % = 240,90. Salud 248,81 + 2.297 x 5,17 % = 367,56. Neto 10.000 - 240,90 - 367,56 - 600 = 8.791,54.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 10000, min: "isha", nekudotNosafot: 2, pensia: 6 },
    esperado: { masHachnasa: 0, bituachLeumi: 240.9, masBriut: 367.56, neto: 8791.54 },
  },
  {
    nombre: "70.000 brutos: מס יסף y tope del ביטוח לאומי",
    origen: {
      tipo: "recalculado",
      detalle:
        "Escala completa = 23.319,2; menos 544,5 y 237,65; más 3 % de (70.000 - 60.130) = 296,1: 22.833,15. BL sobre 51.910: 80,11 + 44.207 x 7 % = 3.174,60. Salud 248,81 + 44.207 x 5,17 % = 2.534,31. Neto 70.000 - 22.833,15 - 3.174,60 - 2.534,31 - 4.200 = 37.257,94.",
    },
    fecha: "2026-10-24",
    entrada: { bruto: 70000, min: "gever", nekudotNosafot: 0, pensia: 6 },
    esperado: { masHachnasa: 22833.15, bituachLeumi: 3174.6, masBriut: 2534.31, neto: 37257.94, shiurShuli: 50 },
  },
  {
    nombre: "Sin bruto",
    origen: { tipo: "recalculado", detalle: "Bruto 0." },
    fecha: "2026-10-24",
    entrada: { bruto: 0, min: "gever", nekudotNosafot: 0, pensia: 6 },
    esperaError: true,
  },
]);
