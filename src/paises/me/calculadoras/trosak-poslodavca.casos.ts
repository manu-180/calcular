import { definirCasos } from "@/motor/calculo";
import trosakPoslodavca from "./trosak-poslodavca";

const DOPRINOSI = "https://amrrs.gov.me/wp-content/uploads/2026/03/Zakon-o-doprinosima-za-obavezno-socijalno-osiguranje-1.pdf";

export default definirCasos(trosakPoslodavca, [
  {
    nombre: "Bruto 1.000 eura",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "PIO 0 %, nezaposlenost 0,5 % = 5; Fond rada 0,2 % = 2; trošak 1.007." },
    fecha: "2026-10-31",
    entrada: { bruto: 1000, zaposlenih: 1, prirez: 13 },
    esperado: { trosak: 1007, nezaposlenost: 5, fondRada: 2 },
  },
  {
    nombre: "Pet zaposlenih sa bruto 1.500 eura",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "1.500 x 1,007 = 1.510,50; x 5 = 7.552,50; x 12 = 90.630." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, zaposlenih: 5, prirez: 13 },
    esperado: { trosak: 1510.5, ukupnoMjesecno: 7552.5, ukupnoGodisnje: 90630 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: DOPRINOSI, detalle: "Bez zarade nema troška." },
    fecha: "2026-10-31",
    entrada: { bruto: 0, zaposlenih: 1, prirez: 13 },
    esperaError: true,
  },
]);
