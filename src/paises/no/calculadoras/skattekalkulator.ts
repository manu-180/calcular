import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { marginalskatt, skattPaInntekt, type SatserSkatt } from "../lib/skatt";

export default definirCalculadora({
  id: "no.skattekalkulator",
  mercado: "no",
  concepto: "impuesto-renta",
  slug: "skattekalkulator",
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
    { id: "lonn", tipo: "moneda", etiqueta: "Lønn i året (brutto)", min: 0, porDefecto: 650000 },
    { id: "kapital", tipo: "moneda", etiqueta: "Kapitalinntekter (renter på sparing, utleie og lignende)", min: 0, porDefecto: 0, requerido: false },
    { id: "gjeldsrenter", tipo: "moneda", etiqueta: "Gjeldsrenter (renter på boliglån og andre lån)", min: 0, porDefecto: 0, requerido: false },
    { id: "andreFradrag", tipo: "moneda", etiqueta: "Andre fradrag (fagforening, reiser og lignende)", min: 0, porDefecto: 0, requerido: false },
    { id: "trukket", tipo: "moneda", etiqueta: "Skatt som er trukket i løpet av året", min: 0, porDefecto: 0, requerido: false, ayuda: "Summen av skattetrekket på lønnsslippene i år. La feltet stå tomt hvis du bare vil se skatten." },
    { id: "tiltakssonen", tipo: "si-no", etiqueta: "Du bor i Finnmark eller tiltakssonen i Nord-Troms", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.lonn <= 0 && (e.kapital ?? 0) <= 0) throw new ErrorEntrada("Skriv inn lønn eller kapitalinntekter.", "lonn");
    const s: SatserSkatt = {
      trinnskatt: v["no.trinnskatt"],
      alminnelig: e.tiltakssonen ? v["no.skatt-alminnelig-tiltakssonen"] : v["no.skatt-alminnelig-inntekt"],
      personfradrag: v["no.personfradrag"],
      minsteSats: enMapa(v["no.minstefradrag-sats"], "lonn"),
      minsteMaks: enMapa(v["no.minstefradrag-maks"], "lonn"),
      trygdeSats: enMapa(v["no.trygdeavgift"], "lonn"),
      trygdeGrense: v["no.trygdeavgift-nedre-grense"],
      trygdeOpptrapping: v["no.trygdeavgift-opptrapping"],
      fradragTiltakssonen: e.tiltakssonen ? v["no.fradrag-tiltakssonen"] : 0,
    };
    const inntekt = { lonn: e.lonn, kapital: e.kapital ?? 0, fradrag: (e.gjeldsrenter ?? 0) + (e.andreFradrag ?? 0) };
    const skatt = skattPaInntekt(inntekt, s, redondear);
    const trukket = e.trukket ?? 0;
    const differanse = redondear(trukket - skatt.sum);
    const observaciones: string[] = [];
    if (trukket > 0) {
      observaciones.push(differanse >= 0 ? "Du har fått trukket mer enn skatten for året og kan vente penger til gode." : "Du har fått trukket for lite skatt og kan få restskatt.");
    }
    return {
      skatt: skatt.sum,
      skattAlminnelig: skatt.skattAlminnelig,
      trinnskatt: skatt.trinnskatt,
      trygdeavgift: skatt.trygdeavgift,
      minstefradrag: skatt.minstefradrag,
      alminneligInntekt: skatt.alminneligInntekt,
      tilGode: trukket > 0 && differanse >= 0 ? differanse : null,
      restskatt: trukket > 0 && differanse < 0 ? -differanse : null,
      effektivSkatt: e.lonn + (e.kapital ?? 0) > 0 ? redondear((skatt.sum / (e.lonn + (e.kapital ?? 0))) * 100) : null,
      marginalskatt: e.lonn > 0 ? marginalskatt(inntekt, s, redondear) : null,
      observaciones,
    };
  },
  resultado: [
    { clave: "skatt", etiqueta: "Skatt for året", formato: "moneda", destacada: true },
    { clave: "tilGode", etiqueta: "Penger til gode", formato: "moneda" },
    { clave: "restskatt", etiqueta: "Restskatt", formato: "moneda" },
    { clave: "skattAlminnelig", etiqueta: "Skatt på alminnelig inntekt", formato: "moneda" },
    { clave: "trinnskatt", etiqueta: "Trinnskatt", formato: "moneda" },
    { clave: "trygdeavgift", etiqueta: "Trygdeavgift", formato: "moneda" },
    { clave: "minstefradrag", etiqueta: "Minstefradrag", formato: "moneda" },
    { clave: "alminneligInntekt", etiqueta: "Alminnelig inntekt", formato: "moneda" },
    { clave: "effektivSkatt", etiqueta: "Skatt i prosent av inntekten", formato: "porcentaje", decimales: 1 },
    { clave: "marginalskatt", etiqueta: "Marginalskatt på lønn", formato: "porcentaje", decimales: 1 },
  ],
});
