import { definirCasos } from "@/motor/calculo";
import obracunDoprinosa from "./obracun-doprinosa";

const DOPRINOSI = "https://amrrs.gov.me/wp-content/uploads/2026/03/Zakon-o-doprinosima-za-obavezno-socijalno-osiguranje-1.pdf";

export default definirCasos(obracunDoprinosa, [
  {
    nombre: "Bruto 1.000 eura",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "Čl. 15 i 18: 100 + 5 iz zarade; 5 + 2 na zaradu; ukupno 112." },
    fecha: "2026-10-31",
    entrada: { bruto: 1000, prirez: 13 },
    esperado: { ukupno: 112, zaposleni: 105, pio: 100, poslodavac: 7 },
  },
  {
    nombre: "Bruto 670,39 eura",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "PIO 67,04; nezaposlenost 3,35; zaposleni 70,39." },
    fecha: "2026-10-31",
    entrada: { bruto: 670.39, prirez: 13 },
    esperado: { zaposleni: 70.39, pio: 67.04, nezaposlenost: 3.35 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "Bez osnovice nema doprinosa." },
    fecha: "2026-10-31",
    entrada: { bruto: 0, prirez: 13 },
    esperaError: true,
  },
]);
