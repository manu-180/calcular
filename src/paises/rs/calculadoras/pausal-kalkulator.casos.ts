import { definirCasos } from "@/motor/calculo";
import pausalKalkulator from "./pausal-kalkulator";

const ZPDG = "https://www.mfin.gov.rs//upload/media/MOq4eO_6aa14ac8c7a47.docx";

export default definirCasos(pausalKalkulator, [
  {
    nombre: "Paušalni prihod 100.000",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "Porez 10 % = 10.000; PIO 24 % = 24.000; zdravstvo 10,3 % = 10.300; nezaposlenost 0,75 % = 750; ukupno 45.050." },
    fecha: "2026-10-31",
    entrada: { prihod: 100000, promet: null },
    esperado: { ukupno: 45050, porez: 10000, pio: 24000, zdravstvo: 10300, nezaposlenost: 750, godisnje: 540600 },
  },
  {
    nombre: "Prihod ispod najniže osnovice",
    origen: { tipo: "recalculado", url: ZPDG, detalle: "Porez 10 % od 40.000 = 4.000; doprinosi 35,05 % na 51.297 = 17.979,60; ukupno 21.979,60." },
    fecha: "2026-10-31",
    entrada: { prihod: 40000, promet: null },
    esperado: { ukupno: 21979.6, osnovica: 51297 },
    tolerancia: 0.02,
  },
]);
