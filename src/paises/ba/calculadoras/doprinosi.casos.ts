import { definirCasos } from "@/motor/calculo";
import doprinosi from "./doprinosi";

export default definirCasos(doprinosi, [
  {
    nombre: "FBiH, bruto 2.000 KM",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/50ea7-zakon-o-izmjenama-i-dopunama-zakona-o-doprinosima-33-25.pdf", detalle: "17 % = 340; 12,5 % = 250; 1,5 % = 30; ukupno 620. Poslodavac: 50 + 40 + 10 = 100." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, region: "fbih", sprema: null },
    esperado: { ukupno: 620, pio: 340, zdravstvo: 250, nezaposlenost: 30, poslodavac: 100 },
  },
  {
    nombre: "RS, bruto 2.000 KM",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-izmjenama-i-dopunama-zakona-o-doprinosima-1", detalle: "18,5 % = 370; 10,2 % = 204; 0,6 % = 12; 1,7 % = 34; ukupno 620." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, region: "rs", sprema: "vise" },
    esperado: { ukupno: 620, pio: 370, zdravstvo: 204, nezaposlenost: 12, djecija: 34, poslodavac: 0 },
  },
  {
    nombre: "RS, neoporezivih 50 KM smanjuje osnovicu",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "Iz odluke za 2026: 1.558,19 bruto i 1.050 neto znače osnovicu 1.508,19; 31 % = 467,54." },
    fecha: "2026-11-01",
    entrada: { bruto: 1558.19, region: "rs", sprema: "do3" },
    esperado: { ukupno: 467.54 },
    tolerancia: 0.02,
  },
]);
