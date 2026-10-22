import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { alvHaelfte, bpvMindestHaelfte, parameter, REQ_LOHN, satzAn, verifiziereLohn } from "../lib/lohn";
import { escalaFuer, pruefeZuschlag, REQ_STEUER, steuer, TARIFE, type Tarif } from "../lib/steuer";

export default definirCalculadora({
  id: "li.lohnsteuer-rechner",
  mercado: "li",
  concepto: "propio",
  slug: "lohnsteuer-rechner",
  estado: "publicado",
  requiere: {
    ...REQ_LOHN,
    ...REQ_STEUER,
    "li.gewinnungskosten-pauschale": "numero",
    "li.kinderabzug": "numero",
    "li.versicherungsabzug": "mapa",
  },
  campos: [
    { id: "jahreslohn", tipo: "moneda", etiqueta: "Bruttojahreslohn", min: 0, porDefecto: 85000 },
    { id: "tarif", tipo: "opcion", etiqueta: "Tarif", opciones: TARIFE, porDefecto: "alleinstehend" },
    { id: "kinder", tipo: "entero", etiqueta: "Kinder mit Kinderabzug", min: 0, max: 10, porDefecto: 0 },
    { id: "praemien", tipo: "moneda", etiqueta: "Prämien für Kranken- und Lebensversicherungen pro Jahr", min: 0, porDefecto: 3700 },
    { id: "zuschlag", tipo: "porcentaje", etiqueta: "Gemeindezuschlag Ihrer Wohngemeinde", min: 150, max: 250, porDefecto: 150, ayuda: "Der Gemeinderat legt ihn jedes Jahr zwischen 150 und 250 % fest." },
  ],
  calcular(entrada, valores, { redondear }) {
    verifiziereLohn(entrada.jahreslohn, "jahreslohn");
    if (!Number.isInteger(entrada.kinder) || entrada.kinder < 0 || entrada.kinder > 10) throw new ErrorEntrada("Bitte eine Zahl von 0 bis 10 eingeben.", "kinder");
    pruefeZuschlag(entrada.zuschlag, valores["li.gemeindezuschlag"]);
    const p = parameter(valores);
    const tarif = entrada.tarif as Tarif;
    const sozial = redondear((entrada.jahreslohn * satzAn(p)) / 100 + alvHaelfte(entrada.jahreslohn, p));
    const bpv = redondear(bpvMindestHaelfte(entrada.jahreslohn, 30, p));
    const va = valores["li.versicherungsabzug"];
    const praemienMax = (tarif === "ehegatten" ? enMapa(va, "ehegatten") : enMapa(va, "person")) + entrada.kinder * enMapa(va, "kind");
    const praemien = Math.min(entrada.praemien, praemienMax);
    const kinderabzug = entrada.kinder * valores["li.kinderabzug"];
    const abzuege = redondear(sozial + bpv + valores["li.gewinnungskosten-pauschale"] + praemien + kinderabzug);
    const s = steuer(entrada.jahreslohn - abzuege, escalaFuer(tarif, valores), entrada.zuschlag, redondear);
    return {
      total: s.total,
      monat: redondear(s.total / 12),
      landessteuer: s.landessteuer,
      gemeindesteuer: s.gemeindesteuer,
      erwerb: s.erwerb,
      abzuege,
      durchschnitt: (s.total / entrada.jahreslohn) * 100,
      observaciones: [
        "Schätzung für einen Lohn als einziges Einkommen, ohne Vermögen. Abgezogen werden AHV/IV/FAK, ALV, der Mindestbeitrag an die Pensionskasse, die Pauschale für Gewinnungskosten, die Versicherungsprämien bis zum Höchstbetrag und die Kinderabzüge.",
        "Massgebend ist die Veranlagung der Steuerverwaltung. Der Steuerabzug vom Lohn ist eine Vorauszahlung darauf.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Geschätzte Landes- und Gemeindesteuer pro Jahr", formato: "moneda", destacada: true },
    { clave: "monat", etiqueta: "Pro Monat", formato: "moneda" },
    { clave: "landessteuer", etiqueta: "Landessteuer", formato: "moneda" },
    { clave: "gemeindesteuer", etiqueta: "Gemeindesteuer (Zuschlag)", formato: "moneda" },
    { clave: "erwerb", etiqueta: "Steuerpflichtiger Erwerb", formato: "moneda", decimales: 0 },
    { clave: "abzuege", etiqueta: "Abzüge insgesamt", formato: "moneda" },
    { clave: "durchschnitt", etiqueta: "Anteil am Bruttolohn", formato: "porcentaje", decimales: 2 },
  ],
});
