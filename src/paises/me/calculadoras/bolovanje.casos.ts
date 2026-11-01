import { definirCasos } from "@/motor/calculo";
import bolovanje from "./bolovanje";

const ZDR = "https://amrrs.gov.me/wp-content/uploads/2025/12/Zakon-o-obaveznom-zdravstvenom-osiguranju.pdf";

export default definirCasos(bolovanje, [
  {
    nombre: "Deset dana bolesti",
    origen: { tipo: "recalculado", url: ZDR, detalle: "Čl. 40: 70 %. 900 / 30 x 0,7 = 21; x 10 = 210." },
    fecha: "2026-10-31",
    entrada: { osnov: 900, dana: 10, vrsta: "opsti" },
    esperado: { naknada: 210, dnevno: 21, stopa: 70, poslodavacDana: 10, fondDana: 0 },
  },
  {
    nombre: "Povreda na radu, 90 dana",
    origen: { tipo: "recalculado", url: ZDR, detalle: "Čl. 40 st. 3: 100 %; čl. 38: 60 dana bez refundacije, 30 refundira Fond. 900 / 30 x 90 = 2.700." },
    fecha: "2026-10-31",
    entrada: { osnov: 900, dana: 90, vrsta: "puni" },
    esperado: { naknada: 2700, stopa: 100, poslodavacDana: 60, fondDana: 30 },
  },
  {
    nombre: "Osnov nula je greška",
    origen: { tipo: "recalculado", url: ZDR, detalle: "Bez osnova nema naknade." },
    fecha: "2026-10-31",
    entrada: { osnov: 0, dana: 10, vrsta: "opsti" },
    esperaError: true,
  },
]);
