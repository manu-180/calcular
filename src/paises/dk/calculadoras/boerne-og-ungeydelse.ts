import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.boerne-og-ungeydelse",
  mercado: "dk",
  concepto: "propio",
  slug: "boerne-og-ungeydelse",
  estado: "publicado",
  requiere: {
    "dk.boerneydelse": "mapa",
    "dk.boerneydelse-aftrapning-graense": "numero",
    "dk.boerneydelse-aftrapning-sats": "numero",
  },
  campos: [
    { id: "b02", tipo: "entero", etiqueta: "Børn på 0-2 år", min: 0, max: 10, porDefecto: 1 },
    { id: "b36", tipo: "entero", etiqueta: "Børn på 3-6 år", min: 0, max: 10, porDefecto: 0 },
    { id: "b714", tipo: "entero", etiqueta: "Børn på 7-14 år", min: 0, max: 10, porDefecto: 0 },
    { id: "u1517", tipo: "entero", etiqueta: "Unge på 15-17 år", min: 0, max: 10, porDefecto: 0 },
    { id: "deles", tipo: "si-no", etiqueta: "Ydelsen deles ligeligt mellem to forældre", porDefecto: true },
    {
      id: "indkomst",
      tipo: "moneda",
      etiqueta: "Din indkomst om året (topskattegrundlag)",
      ayuda: "Personlig indkomst efter am-bidrag plus positiv kapitalindkomst. Har du under grænsen, kan du lade feltet stå tomt.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(e, v, { redondear }) {
    const antal = e.b02 + e.b36 + e.b714 + e.u1517;
    if (antal <= 0) throw new ErrorEntrada("Skriv mindst ét barn.", "b02");
    const y = v["dk.boerneydelse"];
    const andel = e.deles ? 0.5 : 1;
    const boern = (e.b02 * enMapa(y, "0-2") + e.b36 * enMapa(y, "3-6") + e.b714 * enMapa(y, "7-14")) * andel;
    const unge = e.u1517 * enMapa(y, "15-17") * andel;
    const fuld = boern + unge;
    const over = Math.max(0, (e.indkomst ?? 0) - v["dk.boerneydelse-aftrapning-graense"]);
    const aftrapning = redondear(Math.min(fuld, porcentaje(over, v["dk.boerneydelse-aftrapning-sats"])));
    const efter = redondear(fuld - aftrapning);
    // Aftrapningen fordeles forholdsmæssigt på børne- og ungeydelsen.
    const faktor = fuld > 0 ? efter / fuld : 0;
    return {
      aar: efter,
      kvartal: redondear((boern * faktor) / 4),
      maaned: redondear((unge * faktor) / 12),
      fuld: redondear(fuld),
      aftrapning,
      observaciones: e.deles ? ["Hver forælder får halvdelen. Aftrapningen beregnes ud fra hver forælders egen indkomst."] : [],
    };
  },
  resultado: [
    { clave: "aar", etiqueta: "Børne- og ungeydelse i alt om året", formato: "moneda", destacada: true },
    { clave: "kvartal", etiqueta: "Børneydelse pr. kvartal (0-14 år)", formato: "moneda", ocultarSiCero: true },
    { clave: "maaned", etiqueta: "Ungeydelse pr. måned (15-17 år)", formato: "moneda", ocultarSiCero: true },
    { clave: "fuld", etiqueta: "Fuld ydelse før aftrapning", formato: "moneda" },
    { clave: "aftrapning", etiqueta: "Aftrapning på grund af indkomst", formato: "moneda", ocultarSiCero: true },
  ],
});
