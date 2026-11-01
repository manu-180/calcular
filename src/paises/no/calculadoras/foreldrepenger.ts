import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { kr } from "../lib/format";

export default definirCalculadora({
  id: "no.foreldrepenger",
  mercado: "no",
  concepto: "propio",
  slug: "foreldrepenger",
  estado: "publicado",
  requiere: {
    "no.grunnbelop": "numero",
    "no.ytelse-tak-g": "numero",
    "no.ytelse-min-g": "numero",
    "no.dagsats-divisor": "numero",
    "no.foreldrepenger-dager": "mapa",
    "no.engangsstonad": "numero",
  },
  campos: [
    { id: "inntekt", tipo: "moneda", etiqueta: "Årsinntekt før skatt", min: 0, porDefecto: 600000 },
    {
      id: "dekning",
      tipo: "opcion",
      etiqueta: "Dekningsgrad",
      opciones: [
        { valor: "100", etiqueta: "100 % (kortere periode)" },
        { valor: "80", etiqueta: "80 % (lengre periode)" },
      ],
      porDefecto: "100",
    },
    {
      id: "hvem",
      tipo: "opcion",
      etiqueta: "Hvem har rett til foreldrepenger",
      opciones: [
        { valor: "begge", etiqueta: "Begge foreldrene" },
        { valor: "mor-alene", etiqueta: "Mor alene" },
        { valor: "far-alene", etiqueta: "Far eller medmor alene" },
      ],
      porDefecto: "begge",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.inntekt <= 0) throw new ErrorEntrada("Skriv inn årsinntekten.", "inntekt");
    const g = v["no.grunnbelop"];
    const tak = v["no.ytelse-tak-g"] * g;
    const minste = v["no.ytelse-min-g"] * g;
    const dager = enMapa(v["no.foreldrepenger-dager"], `${e.hvem === "far-alene" ? "far-alene" : "begge"}-${e.dekning}`);
    const observaciones: string[] = [];
    if (e.inntekt < minste) {
      observaciones.push(`Med årsinntekt under ${kr(minste)} har du ikke rett til foreldrepenger. Da kan du ha rett til engangsstønad.`);
      return { rett: "Nei", dagsats: null, perUke: null, perManed: null, totalt: null, uker: null, engangsstonad: v["no.engangsstonad"], observaciones };
    }
    const grunnlag = Math.min(e.inntekt, tak);
    if (e.inntekt > tak) observaciones.push(`Nav regner foreldrepenger av inntekt opp til 6 G, ${kr(tak)}.`);
    if (e.hvem === "begge") observaciones.push("Perioden deles i mødrekvote, fedrekvote og fellesperiode. Totalen gjelder for begge foreldrene samlet.");
    const dagsats = redondear((grunnlag * Number(e.dekning)) / 100 / v["no.dagsats-divisor"]);
    return {
      rett: "Ja",
      dagsats,
      perUke: redondear(dagsats * 5),
      perManed: redondear((grunnlag * Number(e.dekning)) / 100 / 12),
      totalt: redondear(dagsats * dager),
      uker: dager / 5,
      engangsstonad: null,
      observaciones,
    };
  },
  resultado: [
    { clave: "perManed", etiqueta: "Foreldrepenger per måned (snitt)", formato: "moneda", destacada: true },
    { clave: "dagsats", etiqueta: "Dagsats (fem dager i uken)", formato: "moneda" },
    { clave: "perUke", etiqueta: "Per uke", formato: "moneda" },
    { clave: "uker", etiqueta: "Lengde på perioden", formato: "semanas", decimales: 1 },
    { clave: "totalt", etiqueta: "Foreldrepenger for hele perioden", formato: "moneda" },
    { clave: "engangsstonad", etiqueta: "Engangsstønad", formato: "moneda" },
    { clave: "rett", etiqueta: "Rett til foreldrepenger", formato: "texto" },
  ],
});
