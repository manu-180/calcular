import { definirCasos } from "@/motor/calculo";
import minimalnaPlata from "./minimalna-plata";

export default definirCasos(minimalnaPlata, [
  {
    nombre: "FBiH 2026",
    origen: { tipo: "oficial", url: "https://fbihvlada.gov.ba/bs/1094-odluka-o-iznosu-najnize-place-za-2026-godinu", detalle: "Odluka: najniža plaća od 1. 1. do 31. 12. 2026. je 1.027,00 KM neto." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", sprema: null },
    esperado: { neto: 1027, bruto: 1605.47, trosak: 1685.75 },
  },
  {
    nombre: "RS 2026, bez uslova o obrazovanju",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "1.476,23 KM bruto, 1.000,00 KM neto." },
    fecha: "2026-11-01",
    entrada: { region: "rs", sprema: "osnovna" },
    esperado: { neto: 1000, bruto: 1476.23 },
  },
  {
    nombre: "RS 2026, trogodišnja škola",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "1.558,19 KM bruto, 1.050,00 KM neto." },
    fecha: "2026-11-01",
    entrada: { region: "rs", sprema: "trogodisnja" },
    esperado: { neto: 1050, bruto: 1558.19 },
  },
  {
    nombre: "RS 2026, visoko obrazovanje",
    origen: { tipo: "oficial", url: "https://vladars.rs/sr-SP-Cyrl/Vlada/media/vijesti/Pages/261225-%D0%B2%D0%BB%D0%B0%D0%B4%D0%B01.aspx", detalle: "2.245,90 KM bruto, 1.450,00 KM neto." },
    fecha: "2026-11-01",
    entrada: { region: "rs", sprema: "visoka" },
    esperado: { neto: 1450, bruto: 2245.9 },
  },
]);
