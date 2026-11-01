import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.barnetrygd",
  mercado: "no",
  concepto: "propio",
  slug: "barnetrygd",
  estado: "publicado",
  requiere: {
    "no.barnetrygd": "numero",
    "no.barnetrygd-tillegg": "numero",
  },
  campos: [
    { id: "barn", tipo: "entero", etiqueta: "Antall barn under 18 år", min: 1, max: 15, porDefecto: 2 },
    { id: "tillegg", tipo: "si-no", etiqueta: "Dere bor i Finnmark, Nord-Troms (tiltakssonen) eller på Svalbard", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.barn < 1) throw new ErrorEntrada("Skriv inn minst ett barn.", "barn");
    const ordinaer = v["no.barnetrygd"];
    const tillegg = e.tillegg ? v["no.barnetrygd-tillegg"] : 0;
    const perManed = redondear(e.barn * (ordinaer + tillegg));
    return {
      perManed,
      perAr: redondear(perManed * 12),
      perBarn: redondear(ordinaer + tillegg),
      tilleggPerManed: redondear(e.barn * tillegg),
    };
  },
  resultado: [
    { clave: "perManed", etiqueta: "Barnetrygd per måned", formato: "moneda", destacada: true },
    { clave: "perAr", etiqueta: "Barnetrygd per år", formato: "moneda" },
    { clave: "perBarn", etiqueta: "Per barn per måned", formato: "moneda" },
    { clave: "tilleggPerManed", etiqueta: "Finnmarks- og Svalbardtillegg per måned", formato: "moneda", ocultarSiCero: true },
  ],
});
