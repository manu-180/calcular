import { definirCasos } from "@/motor/calculo";
import calc from "./bruto-neto-kalkulator";

const U = "https://porezna-uprava.gov.hr/hr/place-i-mirovine/4428";
const Z = { djeca: 0, uzdrzavani: 0 };

export default definirCasos(calc, [
  {
    nombre: "Bruto 2.000 eura u Zagrebu",
    origen: { tipo: "recalculado", url: U, detalle: "I. stup 300, II. stup 100; dohodak 1.600; osnovica 1.000; porez 23 % = 230; neto 1.370; zdravstveno 330." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, grad: "zagreb", drugiStup: true, ...Z },
    esperado: { mioI: 300, mioII: 100, osnovica: 1000, porez: 230, neto: 1370, trosak: 2330 },
  },
  {
    nombre: "Bruto 1.000 eura, umanjenje 150 eura",
    origen: { tipo: "recalculado", url: U, detalle: "Umanjenje 0,5 x (1.300 - 1.000) = 150; I. stup 15 % na 850 = 127,50; II. stup 50; osnovica 222,50; porez 23 % = 51,18; neto 771,32." },
    fecha: "2026-11-01",
    entrada: { bruto: 1000, grad: "zagreb", drugiStup: true, ...Z },
    esperado: { umanjenje: 150, mioI: 127.5, mioII: 50, porez: 51.18, neto: 771.32 },
  },
  {
    nombre: "Bruto 600 eura, puno umanjenje i bez poreza",
    origen: { tipo: "recalculado", url: U, detalle: "Umanjenje 300; I. stup 15 % na 300 = 45; II. stup 30; dohodak 525 ispod odbitka; porez 0; neto 525." },
    fecha: "2026-11-01",
    entrada: { bruto: 600, grad: "zagreb", drugiStup: true, ...Z },
    esperado: { umanjenje: 300, mioI: 45, mioII: 30, porez: 0, neto: 525 },
  },
  {
    nombre: "Samo I. stup, bruto 1.000 eura",
    origen: { tipo: "recalculado", url: U, detalle: "20 % na 850 = 170; dohodak 830; osnovica 230; porez 23 % = 52,90; neto 777,10." },
    fecha: "2026-11-01",
    entrada: { bruto: 1000, grad: "zagreb", drugiStup: false, ...Z },
    esperado: { mioI: 170, mioII: 0, porez: 52.9, neto: 777.1 },
  },
  {
    nombre: "Rijeka, dvoje djece",
    origen: { tipo: "recalculado", url: "https://porezna-uprava.gov.hr/hr/osobni-odbitak-ili-neoporezivi-dio-place/4677", detalle: "Odbitak 600 x (1 + 0,5 + 0,7) = 1.320; osnovica 280; porez 20 % = 56; neto 1.544." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, grad: "rijeka", drugiStup: true, djeca: 2, uzdrzavani: 0 },
    esperado: { odbitak: 1320, osnovica: 280, porez: 56, neto: 1544 },
  },
  {
    nombre: "Split, dio osnovice po višoj stopi",
    origen: { tipo: "recalculado", url: U, detalle: "Bruto 8.000; doprinosi 1.600; osnovica 5.800; 5.000 x 21,5 % = 1.075; 800 x 32 % = 256; neto 5.069." },
    fecha: "2026-11-01",
    entrada: { bruto: 8000, grad: "split", drugiStup: true, ...Z },
    esperado: { porez: 1331, neto: 5069 },
  },
  {
    nombre: "Plaća iznad najviše osnovice",
    origen: { tipo: "recalculado", url: "https://narodne-novine.nn.hr/clanci/sluzbeni/2025_12_150_2237.html", detalle: "Mirovinsko do 11.958: 1.793,70 + 597,90; osnovica 12.008,40; porez 1.150 + 7.008,40 x 33 % = 3.462,77; neto 9.145,63; zdravstveno na 15.000 = 2.475." },
    fecha: "2026-11-01",
    entrada: { bruto: 15000, grad: "zagreb", drugiStup: true, ...Z },
    esperado: { mioI: 1793.7, mioII: 597.9, porez: 3462.77, neto: 9145.63, trosak: 17475 },
  },
  {
    nombre: "Bruto nula nije dopušten",
    origen: { tipo: "recalculado", url: U, detalle: "Greška unosa." },
    fecha: "2026-11-01",
    entrada: { bruto: 0, grad: "zagreb", drugiStup: true, ...Z },
    esperaError: true,
  },
]);
