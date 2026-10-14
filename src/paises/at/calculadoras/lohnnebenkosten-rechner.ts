import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.lohnnebenkosten-rechner",
  mercado: "at",
  concepto: "costo-empleador",
  slug: "lohnnebenkosten-rechner",
  estado: "publicado",
  requiere: {
    "at.sv-dienstgeber": "mapa",
    "at.beitragsgrundlage": "mapa",
    "at.lohnnebenkosten": "mapa",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat", min: 0, porDefecto: 3500, ayuda: "Gerechnet wird mit 14 Gehältern." },
    { id: "wien", tipo: "si-no", etiqueta: "Arbeitsort in Wien", porDefecto: false },
    { id: "dz", tipo: "porcentaje", etiqueta: "Zuschlag zum Dienstgeberbeitrag (DZ)", min: 0, requerido: false, ayuda: "Der Satz hängt vom Bundesland ab. Leer lassen, wenn Sie ihn nicht einrechnen möchten." },
    { id: "bv", tipo: "si-no", etiqueta: "Abfertigung neu (Betriebliche Vorsorge)", porDefecto: true, ayuda: "Gilt für alle Dienstverhältnisse, die ab 2003 begonnen haben." },
  ],
  calcular(entrada, valores, { redondear }) {
    const dg = valores["at.sv-dienstgeber"];
    const grenzen = valores["at.beitragsgrundlage"];
    const ln = valores["at.lohnnebenkosten"];
    const dzSatz = entrada.dz ?? 0;
    if (dzSatz > ln["dz-hoechst"]) throw new ErrorEntrada("Der Zuschlag zum Dienstgeberbeitrag ist in keinem Bundesland so hoch.", "dz");
    const geringfuegig = entrada.brutto <= grenzen.geringfuegig;
    const sozial = dg.kv + dg.uv + dg.pv + dg.av + dg.iesg;
    const wbf = entrada.wien ? dg["wbf-wien"] : dg.wbf;
    const svLaufend = geringfuegig ? redondear(porcentaje(entrada.brutto, dg.uv)) : redondear(porcentaje(Math.min(entrada.brutto, grenzen["hoechst-monat"]), sozial + wbf));
    const szBasis1 = Math.min(entrada.brutto, grenzen["hoechst-sonderzahlungen"]);
    const szBasis2 = Math.min(entrada.brutto, grenzen["hoechst-sonderzahlungen"] - szBasis1);
    const svSz1 = geringfuegig ? redondear(porcentaje(entrada.brutto, dg.uv)) : redondear(porcentaje(szBasis1, sozial));
    const svSz2 = geringfuegig ? redondear(porcentaje(entrada.brutto, dg.uv)) : redondear(porcentaje(szBasis2, sozial));
    const db = redondear(porcentaje(entrada.brutto, ln.db));
    const dz = redondear(porcentaje(entrada.brutto, dzSatz));
    const kommunalsteuer = redondear(porcentaje(entrada.brutto, ln.kommunalsteuer));
    const bv = entrada.bv ? redondear(porcentaje(entrada.brutto, dg.bv)) : 0;
    const abgaben = db + dz + kommunalsteuer + bv;
    const dgMonat = redondear(svLaufend + abgaben);
    const dgJahr = redondear(12 * dgMonat + svSz1 + svSz2 + 2 * abgaben);
    const observaciones: string[] = [];
    if (geringfuegig) observaciones.push("Bei geringfügiger Beschäftigung zahlt der Dienstgeber nur die Unfallversicherung. Übersteigen die Gehälter aller geringfügig Beschäftigten im Betrieb eine bestimmte Grenze, kommt die Dienstgeberabgabe dazu, die hier nicht enthalten ist.");
    return {
      kostenMonat: redondear(entrada.brutto + dgMonat),
      dgMonat,
      sv: svLaufend,
      db,
      dz,
      kommunalsteuer,
      bv,
      dgSonderzahlung: redondear(svSz1 + abgaben),
      kostenJahr: redondear(14 * entrada.brutto + dgJahr),
      dgJahr,
      aufschlag: entrada.brutto > 0 ? (dgJahr / (14 * entrada.brutto)) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "kostenMonat", etiqueta: "Gesamtkosten im Monat", formato: "moneda", destacada: true },
    { clave: "dgMonat", etiqueta: "Lohnnebenkosten im Monat", formato: "moneda" },
    { clave: "sv", etiqueta: "Sozialversicherung Dienstgeber", formato: "moneda" },
    { clave: "db", etiqueta: "Dienstgeberbeitrag (DB)", formato: "moneda" },
    { clave: "dz", etiqueta: "Zuschlag zum DB (DZ)", formato: "moneda", ocultarSiCero: true },
    { clave: "kommunalsteuer", etiqueta: "Kommunalsteuer", formato: "moneda" },
    { clave: "bv", etiqueta: "Betriebliche Vorsorge (Abfertigung neu)", formato: "moneda", ocultarSiCero: true },
    { clave: "dgSonderzahlung", etiqueta: "Lohnnebenkosten auf eine Sonderzahlung", formato: "moneda" },
    { clave: "kostenJahr", etiqueta: "Gesamtkosten im Jahr", formato: "moneda" },
    { clave: "dgJahr", etiqueta: "Lohnnebenkosten im Jahr", formato: "moneda" },
    { clave: "aufschlag", etiqueta: "Lohnnebenkosten in % vom Brutto", formato: "porcentaje", decimales: 2 },
  ],
});
