import { definirCasos } from "@/motor/calculo";
import calc from "./doprinosi-na-placu";

const U = "https://porezna-uprava.gov.hr/sdg/Stranice/doprinosi_radni_odnos_JDP.aspx";

export default definirCasos(calc, [
  {
    nombre: "Bruto 2.000 eura",
    origen: { tipo: "recalculado", url: U, detalle: "15 % = 300, 5 % = 100, 16,5 % = 330; ukupno 730." },
    fecha: "2026-11-01",
    entrada: { bruto: 2000, drugiStup: true },
    esperado: { mioI: 300, mioII: 100, zdravstveno: 330, ukupno: 730 },
  },
  {
    nombre: "Bruto 1.300 eura, granica umanjenja",
    origen: { tipo: "recalculado", url: "https://narodne-novine.nn.hr/clanci/sluzbeni/2023_10_114_1611.html", detalle: "0,5 x (1.300 - 1.300) = 0; 15 % = 195; 5 % = 65." },
    fecha: "2026-11-01",
    entrada: { bruto: 1300, drugiStup: true },
    esperado: { umanjenje: 0, mioI: 195, mioII: 65 },
  },
  {
    nombre: "Bruto 700 eura, zadnja svota punog umanjenja",
    origen: { tipo: "recalculado", url: "https://narodne-novine.nn.hr/clanci/sluzbeni/2023_10_114_1611.html", detalle: "Umanjenje 300; 15 % na 400 = 60; 5 % na 700 = 35; zdravstveno 115,50." },
    fecha: "2026-11-01",
    entrada: { bruto: 700, drugiStup: true },
    esperado: { umanjenje: 300, mioI: 60, mioII: 35, zdravstveno: 115.5 },
  },
]);
