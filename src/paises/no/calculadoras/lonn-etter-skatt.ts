import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { marginalskatt, skattPaInntekt, type SatserSkatt } from "../lib/skatt";

export default definirCalculadora({
  id: "no.lonn-etter-skatt",
  mercado: "no",
  concepto: "sueldo-neto",
  slug: "lonn-etter-skatt",
  estado: "publicado",
  requiere: {
    "no.trinnskatt": "escala",
    "no.skatt-alminnelig-inntekt": "numero",
    "no.skatt-alminnelig-tiltakssonen": "numero",
    "no.fradrag-tiltakssonen": "numero",
    "no.personfradrag": "numero",
    "no.minstefradrag-sats": "mapa",
    "no.minstefradrag-maks": "mapa",
    "no.trygdeavgift": "mapa",
    "no.trygdeavgift-nedre-grense": "numero",
    "no.trygdeavgift-opptrapping": "numero",
  },
  campos: [
    { id: "lonn", tipo: "moneda", etiqueta: "Bruttolønn", min: 0, porDefecto: 600000 },
    {
      id: "periode",
      tipo: "opcion",
      etiqueta: "Lønnen over er",
      opciones: [
        { valor: "ar", etiqueta: "Årslønn" },
        { valor: "mnd", etiqueta: "Månedslønn" },
      ],
      porDefecto: "ar",
    },
    { id: "fradrag", tipo: "moneda", etiqueta: "Andre fradrag i året (for eksempel gjeldsrenter)", min: 0, porDefecto: 0, requerido: false },
    { id: "tiltakssonen", tipo: "si-no", etiqueta: "Du bor i Finnmark eller tiltakssonen i Nord-Troms", porDefecto: false },
    { id: "ungEllerEldre", tipo: "si-no", etiqueta: "Du er under 17 eller over 69 år i år", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.lonn <= 0) throw new ErrorEntrada("Skriv inn en lønn over null.", "lonn");
    const arslonn = e.periode === "mnd" ? e.lonn * 12 : e.lonn;
    const s: SatserSkatt = {
      trinnskatt: v["no.trinnskatt"],
      alminnelig: e.tiltakssonen ? v["no.skatt-alminnelig-tiltakssonen"] : v["no.skatt-alminnelig-inntekt"],
      personfradrag: v["no.personfradrag"],
      minsteSats: enMapa(v["no.minstefradrag-sats"], "lonn"),
      minsteMaks: enMapa(v["no.minstefradrag-maks"], "lonn"),
      trygdeSats: enMapa(v["no.trygdeavgift"], e.ungEllerEldre ? "pensjon" : "lonn"),
      trygdeGrense: v["no.trygdeavgift-nedre-grense"],
      trygdeOpptrapping: v["no.trygdeavgift-opptrapping"],
      fradragTiltakssonen: e.tiltakssonen ? v["no.fradrag-tiltakssonen"] : 0,
    };
    const inntekt = { lonn: arslonn, kapital: 0, fradrag: e.fradrag ?? 0 };
    const skatt = skattPaInntekt(inntekt, s, redondear);
    const nettoAr = redondear(arslonn - skatt.sum);
    const observaciones = ["Trekket på lønnsslippen følger skattekortet og kan variere fra måned til måned. Summen for året avgjøres i skatteoppgjøret."];
    return {
      nettoMnd: redondear(nettoAr / 12),
      nettoAr,
      skattMnd: redondear(skatt.sum / 12),
      skattAr: skatt.sum,
      skattAlminnelig: skatt.skattAlminnelig,
      trinnskatt: skatt.trinnskatt,
      trygdeavgift: skatt.trygdeavgift,
      minstefradrag: skatt.minstefradrag,
      effektivSkatt: redondear((skatt.sum / arslonn) * 100),
      marginalskatt: marginalskatt(inntekt, s, redondear),
      bruttoAr: redondear(arslonn),
      observaciones,
    };
  },
  resultado: [
    { clave: "nettoMnd", etiqueta: "Utbetalt per måned (snitt)", formato: "moneda", destacada: true },
    { clave: "nettoAr", etiqueta: "Lønn etter skatt i året", formato: "moneda" },
    { clave: "skattMnd", etiqueta: "Skatt per måned (snitt)", formato: "moneda" },
    { clave: "skattAr", etiqueta: "Skatt i året", formato: "moneda" },
    { clave: "skattAlminnelig", etiqueta: "Skatt på alminnelig inntekt", formato: "moneda" },
    { clave: "trinnskatt", etiqueta: "Trinnskatt", formato: "moneda" },
    { clave: "trygdeavgift", etiqueta: "Trygdeavgift", formato: "moneda" },
    { clave: "minstefradrag", etiqueta: "Minstefradrag", formato: "moneda" },
    { clave: "effektivSkatt", etiqueta: "Skatt i prosent av bruttolønnen", formato: "porcentaje", decimales: 1 },
    { clave: "marginalskatt", etiqueta: "Marginalskatt (av neste krone i lønn)", formato: "porcentaje", decimales: 1 },
    { clave: "bruttoAr", etiqueta: "Bruttolønn i året", formato: "moneda" },
  ],
  mundo: { bruto: "lonn", periodoBruto: "anio", neto: "nettoAr", periodoNeto: "anio", entrada: { periode: "ar", fradrag: 0, tiltakssonen: false, ungEllerEldre: false } },
});
