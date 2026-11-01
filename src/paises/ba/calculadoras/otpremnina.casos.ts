import { definirCasos } from "@/motor/calculo";
import otpremnina from "./otpremnina";

export default definirCasos(otpremnina, [
  {
    nombre: "FBiH, šest godina",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 111: 1/3 plate po godini. 1.500 x 6 / 3 = 3.000." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", plata: 1500, godine: 6 },
    esperado: { otpremnina: 3000, granica: 9000 },
  },
  {
    nombre: "RS, granica šest plata",
    origen: { tipo: "recalculado", url: "https://www.narodnaskupstinars.net/la/akti/usvojeni-zakoni/zakon-o-radu", detalle: "Član 194: 1.500 x 30 / 3 = 15.000, granica 6 x 1.500 = 9.000." },
    fecha: "2026-11-01",
    entrada: { region: "rs", plata: 1500, godine: 30 },
    esperado: { otpremnina: 9000, bezGranice: 15000 },
  },
  {
    nombre: "Ispod dvije godine",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Član 111: nakon najmanje dvije godine." },
    fecha: "2026-11-01",
    entrada: { region: "fbih", plata: 1500, godine: 1 },
    esperado: { otpremnina: 0 },
  },
  {
    nombre: "Plata nula je greška",
    origen: { tipo: "recalculado", url: "https://www.pufbih.ba/v1/public/upload/zakoni/f0787-zakon-o-radu-precisceni-tekst.pdf", detalle: "Bez plate nema obračuna." },
    fecha: "2026-11-01",
    entrada: { region: "rs", plata: 0, godine: 5 },
    esperaError: true,
  },
]);
