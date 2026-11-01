import { definirCasos } from "@/motor/calculo";
import kalkulatorPlate from "./kalkulator-plate";

const ZPDG = "https://www.mfin.gov.rs//upload/media/MOq4eO_6aa14ac8c7a47.docx";

export default definirCasos(kalkulatorPlate, [
  {
    nombre: "Bruto 100.000 dinara u 2026",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "Doprinosi 19,9 % = 19.900; porez 10 % na 65.779 = 6.577,90; neto 73.522,10." },
    fecha: "2026-10-31",
    entrada: { bruto: 100000, radnoVreme: 100 },
    esperado: { doprinosi: 19900, porez: 6577.9, neto: 73522.1, trosakPoslodavca: 115150 },
  },
  {
    nombre: "Isti bruto od januara 2027, neoporezivi iznos 37.369",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "Porez 10 % na 62.631 = 6.263,10; neto 100.000 - 19.900 - 6.263,10 = 73.836,90 (čl. 15a, Sl. glasnik 80/2026)." },
    fecha: "2027-01-15",
    entrada: { bruto: 100000, radnoVreme: 100 },
    esperado: { porez: 6263.1, neto: 73836.9 },
  },
  {
    nombre: "Zarada ispod najniže osnovice, pola radnog vremena",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "Bruto 45.000; doprinosi na 51.297 = 7.181,58 + 2.641,80 + 384,73 = 10.208,11; neoporezivi 17.110,50; porez 2.788,95; neto 32.002,94." },
    fecha: "2026-10-31",
    entrada: { bruto: 45000, radnoVreme: 50 },
    esperado: { doprinosi: 10208.11, porez: 2788.95, neto: 32002.94 },
  },
  {
    nombre: "Zarada iznad najviše osnovice",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "Bruto 1.000.000; doprinosi na 732.820 = 145.831,18; porez na 965.779 = 96.577,90; neto 757.590,92." },
    fecha: "2026-10-31",
    entrada: { bruto: 1000000, radnoVreme: 100 },
    esperado: { doprinosi: 145831.18, neto: 757590.92 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "Bez zarade nema obračuna." },
    fecha: "2026-10-31",
    entrada: { bruto: 0, radnoVreme: 100 },
    esperaError: true,
  },
]);
