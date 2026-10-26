import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { KRAV_SKATT, regler, skattetabell, skatteavdragManad, skattPaLon } from "../lib/skatt";

export default definirCalculadora({
  id: "se.lon-efter-skatt",
  mercado: "se",
  concepto: "sueldo-neto",
  slug: "lon-efter-skatt",
  estado: "publicado",
  requiere: {
    ...KRAV_SKATT,
    "se.kommunalskatt": "mapa",
    "se.begravningsavgift": "mapa",
    "se.tabell-begravning-trossamfund": "numero",
  },
  campos: [
    { id: "manadslon", tipo: "moneda", etiqueta: "Bruttolön per månad", min: 0, porDefecto: 35000 },
    { id: "kommun", tipo: "opcion-dato", dato: "se.kommunalskatt", etiqueta: "Kommun där du är folkbokförd", porDefecto: "stockholm" },
    { id: "kyrkan", tipo: "si-no", etiqueta: "Medlem i Svenska kyrkan", porDefecto: false },
    {
      id: "kyrkoavgift",
      tipo: "porcentaje",
      etiqueta: "Kyrkoavgift i din församling",
      min: 0,
      max: 3,
      porDefecto: 1,
      visibleSi: { kyrkan: [true] },
      ayuda: "Avgiften skiljer sig mellan församlingar. Den finns i Skatteverkets lista över skattesatser.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.manadslon <= 0) throw new ErrorEntrada("Skriv en månadslön som är större än noll.", "manadslon");
    const r = regler(v);
    const kommunal = enMapa(v["se.kommunalskatt"], e.kommun);
    const begravning = enMapa(v["se.begravningsavgift"], e.kommun);
    const kyrka = e.kyrkan ? (e.kyrkoavgift ?? 0) : 0;
    const sats = kommunal + begravning + kyrka;
    const tabell = skattetabell(sats);
    const { avdrag } = skatteavdragManad(e.manadslon, tabell, v["se.tabell-begravning-trossamfund"], r);
    const ar = skattPaLon(e.manadslon * 12, kommunal, begravning + kyrka, r);
    const observaciones: string[] = [];
    if (e.manadslon > 80000) {
      observaciones.push("Över 80 000 kronor i månaden anger skattetabellen en procentsats. Vi räknar i steg om 200 kronor, på samma sätt som Skatteverket beskriver.");
    }
    if (ar.statligSkatt > 0) observaciones.push("Din årsinkomst ligger över brytpunkten, så du betalar också statlig inkomstskatt på en del av lönen.");
    observaciones.push("Beräkningen gäller lön till den som inte har fyllt 66 år vid årets början och som bara har den här inkomsten.");
    return {
      nettolon: redondear(e.manadslon - avdrag),
      skatteavdrag: avdrag,
      andel: (avdrag / e.manadslon) * 100,
      tabell,
      sats,
      nettoAr: redondear(e.manadslon * 12 - ar.skatt),
      arsinkomst: ar.arsinkomst,
      grundavdrag: ar.grundavdrag,
      kommunalskatt: ar.kommunalskatt,
      statligSkatt: ar.statligSkatt,
      pensionsavgift: ar.pensionsavgift,
      jobbskatteavdrag: ar.jobbskatteavdrag,
      reduktionForvarvsinkomst: ar.reduktionForvarvsinkomst,
      publicService: ar.publicService,
      avgifter: ar.avgifter,
      skattAr: ar.skatt,
      observaciones,
    };
  },
  resultado: [
    { clave: "nettolon", etiqueta: "Lön efter skatt per månad", formato: "moneda", destacada: true },
    { clave: "skatteavdrag", etiqueta: "Skatteavdrag per månad (skattetabellen)", formato: "moneda" },
    { clave: "andel", etiqueta: "Skatt i procent av lönen", formato: "porcentaje", decimales: 1 },
    { clave: "tabell", etiqueta: "Skattetabell (kolumn 1)", formato: "numero", decimales: 0 },
    { clave: "sats", etiqueta: "Din sammanlagda skattesats", formato: "porcentaje", decimales: 3 },
    { clave: "arsinkomst", etiqueta: "Årsinkomst", formato: "moneda", decimales: 0 },
    { clave: "grundavdrag", etiqueta: "Grundavdrag", formato: "moneda", decimales: 0 },
    { clave: "kommunalskatt", etiqueta: "Kommunal inkomstskatt per år", formato: "moneda", decimales: 0 },
    { clave: "statligSkatt", etiqueta: "Statlig inkomstskatt per år", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "pensionsavgift", etiqueta: "Allmän pensionsavgift per år (dras av igen som skattereduktion)", formato: "moneda", decimales: 0 },
    { clave: "jobbskatteavdrag", etiqueta: "Jobbskatteavdrag per år", formato: "moneda", decimales: 0 },
    { clave: "reduktionForvarvsinkomst", etiqueta: "Skattereduktion för förvärvsinkomst per år", formato: "moneda", decimales: 0 },
    { clave: "publicService", etiqueta: "Public service-avgift per år", formato: "moneda", decimales: 0 },
    { clave: "avgifter", etiqueta: "Begravningsavgift och kyrkoavgift per år", formato: "moneda", decimales: 0 },
    { clave: "skattAr", etiqueta: "Beräknad slutlig skatt för året", formato: "moneda", decimales: 0 },
    { clave: "nettoAr", etiqueta: "Lön efter skatt för hela året", formato: "moneda" },
  ],
  mundo: { bruto: "manadslon", periodoBruto: "mes", neto: "nettolon", periodoNeto: "mes", entrada: { kommun: "stockholm", kyrkan: false } },
});
