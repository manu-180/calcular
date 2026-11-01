import { definirCasos } from "@/motor/calculo";
import sjuklon from "./sjuklon";

const LAG = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-19911047-om-sjuklon_sfs-1991-1047/";

export default definirCasos(sjuklon, [
  {
    nombre: "32 000 kr, 40 timmar, sjuk i tre dagar",
    origen: {
      tipo: "recalculado",
      url: LAG,
      detalle:
        "Timlön 32 000 × 12 / 52 / 40 = 184,62. Lön för tre dagar 4 430,77. 80 % = 3 544,62. Karensavdrag 20 % av veckosjuklönen 5 907,69 = 1 181,54. Sjuklön 2 363,08 kr.",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 32000, veckotimmar: 40, dagarPerVecka: 5, sjukdagar: 3 },
    esperado: { forlorad: 4430.77, fore: 3544.62, karens: 1181.54, sjuklon: 2363.08 },
  },
  {
    nombre: "Sjuk en dag: karensavdraget tar hela sjuklönen",
    origen: { tipo: "recalculado", url: LAG, detalle: "Med fem arbetsdagar i veckan är karensavdraget lika stort som en dags sjuklön." },
    fecha: "2026-10-24",
    entrada: { manadslon: 32000, veckotimmar: 40, dagarPerVecka: 5, sjukdagar: 1 },
    esperado: { sjuklon: 0, karens: 1181.54 },
  },
  {
    nombre: "Ingen lön",
    origen: { tipo: "recalculado", url: LAG, detalle: "Utan lön finns ingen sjuklön att räkna." },
    fecha: "2026-10-24",
    entrada: { manadslon: 0, veckotimmar: 40, dagarPerVecka: 5, sjukdagar: 2 },
    esperaError: true,
  },
]);
