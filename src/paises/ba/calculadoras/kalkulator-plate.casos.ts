import { definirCasos } from "@/motor/calculo";
import kalkulatorPlate from "./kalkulator-plate";

export default definirCasos(kalkulatorPlate, [
  {
    nombre: "FBiH, bruto 2.000 KM i faktor 1",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/d9bf6-zakon-o-porezu-na-dohodak-ispravan-tekst.pdf", detalle: "Doprinosi 31 % = 620; dohodak 1.380; odbitak 300; osnovica 1.080; porez 10 % = 108; neto 1.272; poslodavac 5 % = 100." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperado: { doprinosi: 620, porez: 108, neto: 1272, trosak: 2100 },
  },
  {
    nombre: "FBiH, najniža plata: bruto koji daje 1.027 KM neto",
    origen: { tipo: "recalculado", url: "https://fbihvlada.gov.ba/bs/1094-odluka-o-iznosu-najnize-place-za-2026-godinu", detalle: "1.605,48 bruto: doprinosi 497,70; osnovica 807,78; porez 80,78; neto 1.027,00, koliko propisuje odluka." },
    fecha: "2026-11-01",
    entrada: { bruto: 1605.48, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperado: { neto: 1027 },
  },
  {
    nombre: "FBiH, faktor 1,5 povećava odbitak na 450 KM",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/d9bf6-zakon-o-porezu-na-dohodak-ispravan-tekst.pdf", detalle: "Odbitak 300 x 1,5 = 450; osnovica 930; porez 93; neto 1.287." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, region: "fbih", faktor: 1.5, izdrzavani: null, sprema: null },
    esperado: { odbitak: 450, porez: 93, neto: 1287 },
  },
  {
    nombre: "RS, zvanični iznosi: četverogodišnja škola",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "Odluka za 2026: 1.672,13 KM bruto je 1.100,00 KM neto." },
    fecha: "2026-11-01",
    entrada: { bruto: 1672.13, region: "rs", faktor: null, izdrzavani: 0, sprema: "vise" },
    esperado: { neto: 1100 },
    tolerancia: 0.02,
  },
  {
    nombre: "RS, zvanični iznosi: visoko obrazovanje",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "Odluka za 2026: 2.245,90 KM bruto je 1.450,00 KM neto." },
    fecha: "2026-11-01",
    entrada: { bruto: 2245.9, region: "rs", faktor: null, izdrzavani: 0, sprema: "vise" },
    esperado: { neto: 1450 },
    tolerancia: 0.02,
  },
  {
    nombre: "RS, zvanični iznosi: neoporezivih 50 KM",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "Odluka za 2026: 1.476,23 KM bruto je 1.000,00 KM neto; zakon 114/25 oslobađa 50 KM." },
    fecha: "2026-11-01",
    entrada: { bruto: 1476.23, region: "rs", faktor: null, izdrzavani: 0, sprema: "do3" },
    esperado: { neto: 1000 },
    tolerancia: 0.02,
  },
  {
    nombre: "RS, dvoje izdržavanih",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-izmjenama-i-dopunama-zakona-o-porezu-na-dohodak-4", detalle: "Bruto 2.000: doprinosi 620; odbitak 1.000 + 2 x 75 = 1.150; osnovica 850; porez 8 % = 68; neto 1.312." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, region: "rs", faktor: null, izdrzavani: 2, sprema: "vise" },
    esperado: { odbitak: 1150, porez: 68, neto: 1312, trosak: 2000 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/d9bf6-zakon-o-porezu-na-dohodak-ispravan-tekst.pdf", detalle: "Bez plate nema obračuna." },
    fecha: "2026-11-01",
    entrada: { bruto: 0, region: "fbih", faktor: 1, izdrzavani: null, sprema: null },
    esperaError: true,
  },
]);
