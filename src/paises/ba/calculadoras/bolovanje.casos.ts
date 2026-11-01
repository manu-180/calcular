import { definirCasos } from "@/motor/calculo";
import bolovanje from "./bolovanje";

export default definirCasos(bolovanje, [
  {
    nombre: "Obična bolest, 70 %",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-obaveznom-zdravstvenom-osiguranju", detalle: "Član 83, tačka 5: 70 %. 1.500 x 70 % = 1.050; dnevno 35; 10 dana 350." },
    fecha: "2026-11-01",
    entrada: { plata: 1500, uzrok: "opsta", dani: 10 },
    esperado: { mjesecna: 1050, naknada: 350 },
  },
  {
    nombre: "Izolacija, 90 %",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-obaveznom-zdravstvenom-osiguranju", detalle: "Član 83, tačka 4: 90 %. 1.350; dnevno 45; 14 dana 630." },
    fecha: "2026-11-01",
    entrada: { plata: 1500, uzrok: "izolacija", dani: 14 },
    esperado: { naknada: 630 },
  },
  {
    nombre: "Komplikacije u trudnoći, 100 %",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-obaveznom-zdravstvenom-osiguranju", detalle: "Član 83, tačka 1: 100 %." },
    fecha: "2026-11-01",
    entrada: { plata: 1500, uzrok: "trudnoca", dani: 30 },
    esperado: { naknada: 1500 },
  },
  {
    nombre: "Plata nula je greška",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-obaveznom-zdravstvenom-osiguranju", detalle: "Bez osnova nema obračuna." },
    fecha: "2026-11-01",
    entrada: { plata: 0, uzrok: "opsta", dani: 10 },
    esperaError: true,
  },
]);
