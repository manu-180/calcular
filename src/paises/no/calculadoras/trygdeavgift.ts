import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { trygdeavgift } from "../lib/skatt";

export default definirCalculadora({
  id: "no.trygdeavgift",
  mercado: "no",
  concepto: "aportes-seguridad-social",
  slug: "trygdeavgift",
  estado: "publicado",
  requiere: {
    "no.trygdeavgift": "mapa",
    "no.trygdeavgift-nedre-grense": "numero",
    "no.trygdeavgift-opptrapping": "numero",
  },
  campos: [
    { id: "inntekt", tipo: "moneda", etiqueta: "Inntekt i året", min: 0, porDefecto: 500000 },
    { id: "type", tipo: "opcion-dato", dato: "no.trygdeavgift", etiqueta: "Type inntekt", porDefecto: "lonn" },
  ],
  calcular(e, v, { redondear }) {
    if (e.inntekt <= 0) throw new ErrorEntrada("Skriv inn en inntekt over null.", "inntekt");
    const sats = enMapa(v["no.trygdeavgift"], e.type);
    const grense = v["no.trygdeavgift-nedre-grense"];
    const opptrapping = v["no.trygdeavgift-opptrapping"];
    const avgift = redondear(trygdeavgift(e.inntekt, sats, grense, opptrapping));
    const full = redondear((e.inntekt * sats) / 100);
    const observaciones: string[] = [];
    if (e.inntekt <= grense) observaciones.push("Inntekten er under den nedre grensen, så du betaler ingen trygdeavgift.");
    else if (avgift < full) observaciones.push("Inntekten er like over den nedre grensen. Avgiften er derfor begrenset av opptrappingsregelen og er lavere enn full sats.");
    return {
      avgift,
      perManed: redondear(avgift / 12),
      sats,
      effektiv: redondear((avgift / e.inntekt) * 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "avgift", etiqueta: "Trygdeavgift i året", formato: "moneda", destacada: true },
    { clave: "perManed", etiqueta: "Trygdeavgift per måned (snitt)", formato: "moneda" },
    { clave: "sats", etiqueta: "Sats for denne inntekten", formato: "porcentaje", decimales: 1 },
    { clave: "effektiv", etiqueta: "Avgift i prosent av inntekten", formato: "porcentaje", decimales: 2 },
  ],
});
