import { definirCasos } from "@/motor/calculo";
import brutoIzNeta from "./bruto-iz-neta";

export default definirCasos(brutoIzNeta, [
  {
    nombre: "FBiH, neto 1.272 KM",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/d9bf6-zakon-o-porezu-na-dohodak-ispravan-tekst.pdf", detalle: "Neto = 0,621 x bruto + 30. (1.272 - 30) / 0,621 = 2.000." },
    fecha: "2026-11-01",
    entrada: { neto: 1272, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperado: { bruto: 2000, porez: 108 },
  },
  {
    nombre: "FBiH, najniža plata",
    origen: { tipo: "recalculado", url: "https://fbihvlada.gov.ba/bs/1094-odluka-o-iznosu-najnize-place-za-2026-godinu", detalle: "(1.027 - 30) / 0,621 = 1.605,48; uz zaokruživanje stavki neto 1.027 daje već 1.605,47." },
    fecha: "2026-11-01",
    entrada: { neto: 1027, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperado: { bruto: 1605.47 },
  },
  {
    nombre: "RS, neto 1.100 KM po odluci o najnižoj plati",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "Odluka za 2026: neto 1.100,00 KM je bruto 1.672,13 KM." },
    fecha: "2026-11-01",
    entrada: { neto: 1100, region: "rs", faktor: null, izdrzavani: 0, sprema: "vise" },
    esperado: { bruto: 1672.13 },
    tolerancia: 0.02,
  },
  {
    nombre: "RS, neto 1.050 KM s neoporezivih 50 KM",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "Odluka za 2026: neto 1.050,00 KM je bruto 1.558,19 KM." },
    fecha: "2026-11-01",
    entrada: { neto: 1050, region: "rs", faktor: null, izdrzavani: 0, sprema: "do3" },
    esperado: { bruto: 1558.19 },
    tolerancia: 0.02,
  },
  {
    nombre: "Neto nula je greška",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/d9bf6-zakon-o-porezu-na-dohodak-ispravan-tekst.pdf", detalle: "Bez iznosa nema obračuna." },
    fecha: "2026-11-01",
    entrada: { neto: 0, region: "rs", faktor: null, izdrzavani: 0, sprema: "vise" },
    esperaError: true,
  },
]);
