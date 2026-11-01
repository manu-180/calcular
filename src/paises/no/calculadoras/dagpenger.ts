import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { kr } from "../lib/format";

export default definirCalculadora({
  id: "no.dagpenger",
  mercado: "no",
  concepto: "propio",
  slug: "dagpenger",
  estado: "publicado",
  requiere: {
    "no.grunnbelop": "numero",
    "no.dagpenger-sats": "numero",
    "no.dagsats-divisor": "numero",
    "no.ytelse-tak-g": "numero",
    "no.dagpenger-krav-12": "numero",
    "no.dagpenger-krav-36": "numero",
    "no.dagpenger-grense-lang": "numero",
    "no.dagpenger-uker": "mapa",
    "no.dagpenger-barnetillegg": "numero",
    "no.dagpenger-maks-andel": "numero",
  },
  campos: [
    { id: "inntekt12", tipo: "moneda", etiqueta: "Inntekt de siste 12 månedene", min: 0, porDefecto: 500000 },
    { id: "inntekt36", tipo: "moneda", etiqueta: "Inntekt de siste 36 månedene til sammen", min: 0, requerido: false, ayuda: "Valgfritt. Nav bruker det som er best for deg av de siste 12 månedene og snittet av de siste 36." },
    { id: "barn", tipo: "entero", etiqueta: "Barn du forsørger", min: 0, max: 15, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.inntekt12 <= 0 && (e.inntekt36 ?? 0) <= 0) throw new ErrorEntrada("Skriv inn inntekten din.", "inntekt12");
    const g = v["no.grunnbelop"];
    const snitt36 = (e.inntekt36 ?? 0) / 3;
    const harRett = e.inntekt12 >= v["no.dagpenger-krav-12"] * g || (e.inntekt36 ?? 0) >= v["no.dagpenger-krav-36"] * g;
    const observaciones: string[] = [];
    if (!harRett) {
      observaciones.push(`For å få dagpenger må du ha tjent minst ${kr(v["no.dagpenger-krav-12"] * g)} de siste 12 månedene eller ${kr(v["no.dagpenger-krav-36"] * g)} de siste 36.`);
      return { rett: "Nei", dagsats: null, perUke: null, perMeldekort: null, perManed: null, uker: null, grunnlag: null, observaciones };
    }
    const brukt = Math.max(e.inntekt12, snitt36);
    const grunnlag = Math.min(brukt, v["no.ytelse-tak-g"] * g);
    const divisor = v["no.dagsats-divisor"];
    const uten = (grunnlag * v["no.dagpenger-sats"]) / 100 / divisor;
    const maks = (grunnlag * v["no.dagpenger-maks-andel"]) / 100 / divisor;
    const dagsats = redondear(Math.min(uten + e.barn * v["no.dagpenger-barnetillegg"], maks));
    const lang = brukt >= v["no.dagpenger-grense-lang"] * g;
    if (brukt > grunnlag) observaciones.push(`Inntekt over 6 G (${kr(v["no.ytelse-tak-g"] * g)}) teller ikke med.`);
    if (snitt36 > e.inntekt12) observaciones.push("Snittet av de siste 36 månedene gir høyere dagpenger, så det er brukt.");
    return {
      rett: "Ja",
      dagsats,
      perUke: redondear(dagsats * 5),
      perMeldekort: redondear(dagsats * 10),
      perManed: redondear((dagsats * divisor) / 12),
      uker: enMapa(v["no.dagpenger-uker"], lang ? "lang" : "kort"),
      grunnlag: redondear(grunnlag),
      observaciones,
    };
  },
  resultado: [
    { clave: "perMeldekort", etiqueta: "Dagpenger per meldekort (14 dager)", formato: "moneda", destacada: true },
    { clave: "dagsats", etiqueta: "Dagsats (fem dager i uken)", formato: "moneda" },
    { clave: "perUke", etiqueta: "Per uke", formato: "moneda" },
    { clave: "perManed", etiqueta: "Per måned (snitt)", formato: "moneda" },
    { clave: "uker", etiqueta: "Så lenge kan du få dagpenger", formato: "semanas", decimales: 0 },
    { clave: "grunnlag", etiqueta: "Dagpengegrunnlag", formato: "moneda" },
    { clave: "rett", etiqueta: "Rett til dagpenger", formato: "texto" },
  ],
});
