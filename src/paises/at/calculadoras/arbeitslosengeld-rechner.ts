import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { nettoLohn, REQ_LOHN } from "../lib/lohn";

export default definirCalculadora({
  id: "at.arbeitslosengeld-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "arbeitslosengeld-rechner",
  estado: "publicado",
  requiere: {
    ...REQ_LOHN,
    "at.arbeitslosengeld": "mapa",
    "at.alg-werte": "mapa",
  },
  campos: [
    { id: "brutto", tipo: "moneda", etiqueta: "Bruttogehalt im Monat (ohne Sonderzahlungen)", min: 0, porDefecto: 3000, ayuda: "Maßgeblich sind die Beitragsgrundlagen von zwölf Monaten, die schon etwas zurückliegen." },
    { id: "familienzuschlaege", tipo: "entero", etiqueta: "Anzahl der Familienzuschläge", min: 0, max: 15, porDefecto: 0, ayuda: "Für Kinder mit Familienbeihilfe, zu deren Unterhalt Sie wesentlich beitragen, und unter Umständen für die Partnerin oder den Partner." },
    {
      id: "wochen",
      tipo: "opcion",
      etiqueta: "Bezugsdauer",
      opciones: [
        { valor: "20", etiqueta: "20 Wochen (Grundanspruch)" },
        { valor: "30", etiqueta: "30 Wochen (3 Jahre versichert)" },
        { valor: "39", etiqueta: "39 Wochen (ab 40 Jahren, 6 Jahre in den letzten 10)" },
        { valor: "52", etiqueta: "52 Wochen (ab 50 Jahren, 9 Jahre in den letzten 15)" },
      ],
      porDefecto: "20",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const alg = valores["at.arbeitslosengeld"];
    const werte = valores["at.alg-werte"];
    const basis = Math.min(entrada.brutto, werte.hoechstbemessung);
    const lohn = nettoLohn({ brutto: basis, wien: false, avabKinder: 0, kinderUnter18: 0, kinderAb18: 0, faboHalb: false, pendler: "keine", pendlerKm: 0 }, valores, redondear);
    const nettoTag = lohn.nettoJahr / 12 / 30;
    const grundbetrag = porcentaje(nettoTag, alg.grundbetrag);
    const familienzuschlag = entrada.familienzuschlaege * werte.familienzuschlag;
    const obergrenze = porcentaje(nettoTag, entrada.familienzuschlaege > 0 ? alg["obergrenze-mit"] : alg["obergrenze-ohne"]);
    const richtsatzTag = werte.ausgleichszulage / 30;
    const ergaenzung = grundbetrag < richtsatzTag ? Math.max(0, Math.min(richtsatzTag - grundbetrag, obergrenze - grundbetrag - familienzuschlag)) : 0;
    const tagsatz = redondear(grundbetrag + ergaenzung + familienzuschlag);
    const tage = Number(entrada.wochen) * 7;
    return {
      monatlich: redondear(tagsatz * 30),
      tagsatz,
      grundbetrag: redondear(grundbetrag),
      ergaenzung: redondear(ergaenzung),
      familienzuschlag: redondear(familienzuschlag),
      nettoTag: redondear(nettoTag),
      gesamt: redondear(tagsatz * tage),
      observaciones: ["Das ist eine Schätzung. Das AMS rechnet mit Ihren gespeicherten Beitragsgrundlagen, und nur das AMS kann den genauen Betrag festlegen."],
    };
  },
  resultado: [
    { clave: "monatlich", etiqueta: "Arbeitslosengeld im Monat (30 Tage)", formato: "moneda", destacada: true },
    { clave: "tagsatz", etiqueta: "Tagsatz", formato: "moneda" },
    { clave: "grundbetrag", etiqueta: "Grundbetrag je Tag", formato: "moneda" },
    { clave: "ergaenzung", etiqueta: "Ergänzungsbetrag je Tag", formato: "moneda", ocultarSiCero: true },
    { clave: "familienzuschlag", etiqueta: "Familienzuschläge je Tag", formato: "moneda", ocultarSiCero: true },
    { clave: "nettoTag", etiqueta: "Geschätztes tägliches Nettoeinkommen", formato: "moneda" },
    { clave: "gesamt", etiqueta: "Summe über die ganze Bezugsdauer", formato: "moneda" },
  ],
});
