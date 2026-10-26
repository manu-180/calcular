import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { kr } from "../lib/format";

export default definirCalculadora({
  id: "no.sykepenger",
  mercado: "no",
  concepto: "propio",
  slug: "sykepenger",
  estado: "publicado",
  requiere: {
    "no.grunnbelop": "numero",
    "no.sykepenger-dekning": "mapa",
    "no.ytelse-tak-g": "numero",
    "no.ytelse-min-g": "numero",
    "no.dagsats-divisor": "numero",
    "no.arbeidsgiverperiode": "numero",
  },
  campos: [
    { id: "inntekt", tipo: "moneda", etiqueta: "Årsinntekt (vanlig lønn i året)", min: 0, porDefecto: 600000 },
    { id: "rolle", tipo: "opcion-dato", dato: "no.sykepenger-dekning", etiqueta: "Du er", porDefecto: "arbeidstaker" },
    { id: "grad", tipo: "porcentaje", etiqueta: "Sykmeldingsgrad", min: 20, max: 100, porDefecto: 100, ayuda: "100 % hvis du er helt sykmeldt. Er du delvis sykmeldt, skriv inn graden." },
  ],
  calcular(e, v, { redondear }) {
    if (e.inntekt <= 0) throw new ErrorEntrada("Skriv inn årsinntekten.", "inntekt");
    const g = v["no.grunnbelop"];
    const tak = v["no.ytelse-tak-g"] * g;
    const minste = v["no.ytelse-min-g"] * g;
    const dekning = enMapa(v["no.sykepenger-dekning"], e.rolle);
    const observaciones: string[] = [];
    if (e.inntekt < minste) {
      observaciones.push(`Med årsinntekt under ${kr(minste)} (halvparten av G) har du ikke rett til sykepenger fra Nav.`);
      return { rett: "Nei", grunnlag: null, perAr: null, perManed: null, dagsats: null, perUke: null, dekning, observaciones };
    }
    const grunnlag = Math.min(e.inntekt, tak);
    const perAr = redondear((grunnlag * dekning * e.grad) / 10000);
    if (e.inntekt > tak) observaciones.push(`Nav dekker inntekt opp til 6 G, ${kr(tak)}. Noen arbeidsgivere dekker mer etter avtale.`);
    if (e.rolle === "arbeidstaker") observaciones.push(`Arbeidsgiveren betaler de første ${v["no.arbeidsgiverperiode"]} dagene. Deretter betaler Nav.`);
    if (e.rolle === "selvstendig") observaciones.push(`Som selvstendig næringsdrivende får du sykepenger fra Nav fra dag ${v["no.arbeidsgiverperiode"] + 1}.`);
    return {
      rett: "Ja",
      grunnlag: redondear(grunnlag),
      perAr,
      perManed: redondear(perAr / 12),
      dagsats: redondear(perAr / v["no.dagsats-divisor"]),
      perUke: redondear((perAr / v["no.dagsats-divisor"]) * 5),
      dekning,
      observaciones,
    };
  },
  resultado: [
    { clave: "perManed", etiqueta: "Sykepenger per måned (snitt)", formato: "moneda", destacada: true },
    { clave: "dagsats", etiqueta: "Dagsats (betales for fem dager i uken)", formato: "moneda" },
    { clave: "perUke", etiqueta: "Per uke", formato: "moneda" },
    { clave: "perAr", etiqueta: "Omregnet til ett år", formato: "moneda" },
    { clave: "grunnlag", etiqueta: "Sykepengegrunnlag", formato: "moneda" },
    { clave: "dekning", etiqueta: "Dekning", formato: "porcentaje", decimales: 0 },
    { clave: "rett", etiqueta: "Rett til sykepenger", formato: "texto" },
  ],
});
