import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.arbeidsgiveravgift",
  mercado: "no",
  concepto: "costo-empleador",
  slug: "arbeidsgiveravgift",
  estado: "publicado",
  requiere: {
    "no.arbeidsgiveravgift": "mapa",
    "no.fribelop-sone-1a": "numero",
    "no.feriepenger-sats": "numero",
  },
  campos: [
    { id: "lonn", tipo: "moneda", etiqueta: "Årslønn", min: 0, porDefecto: 600000 },
    { id: "sone", tipo: "opcion-dato", dato: "no.arbeidsgiveravgift", etiqueta: "Sone for arbeidsgiveravgift", porDefecto: "1" },
    { id: "feriepenger", tipo: "si-no", etiqueta: "Legg til feriepenger etter ferieloven", porDefecto: true },
    { id: "pensjon", tipo: "porcentaje", etiqueta: "Innskudd til tjenestepensjon (prosent av lønnen)", min: 0, max: 30, porDefecto: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.lonn <= 0) throw new ErrorEntrada("Skriv inn en lønn over null.", "lonn");
    const sats = enMapa(v["no.arbeidsgiveravgift"], e.sone);
    const ferie = e.feriepenger ? redondear((e.lonn * v["no.feriepenger-sats"]) / 100) : 0;
    const pensjon = redondear((e.lonn * (e.pensjon ?? 0)) / 100);
    const grunnlag = redondear(e.lonn + ferie + pensjon);
    const avgift = redondear((grunnlag * sats) / 100);
    const kostnad = redondear(grunnlag + avgift);
    const observaciones: string[] = [];
    if (e.sone === "1a") {
      observaciones.push("I sone 1a gjelder den lave satsen til virksomheten har spart hele fribeløpet sammenlignet med sone 1. Deretter betales full sats.");
    }
    return {
      kostnad,
      avgift,
      perManed: redondear(kostnad / 12),
      feriepenger: ferie,
      pensjon,
      grunnlag,
      sats,
      paslag: redondear((kostnad / e.lonn - 1) * 100),
      observaciones,
    };
  },
  resultado: [
    { clave: "kostnad", etiqueta: "Kostnad for arbeidsgiveren i året", formato: "moneda", destacada: true },
    { clave: "perManed", etiqueta: "Kostnad per måned (snitt)", formato: "moneda" },
    { clave: "avgift", etiqueta: "Arbeidsgiveravgift", formato: "moneda" },
    { clave: "feriepenger", etiqueta: "Feriepenger", formato: "moneda", ocultarSiCero: true },
    { clave: "pensjon", etiqueta: "Tjenestepensjon", formato: "moneda", ocultarSiCero: true },
    { clave: "grunnlag", etiqueta: "Grunnlag for arbeidsgiveravgift", formato: "moneda" },
    { clave: "sats", etiqueta: "Sats i sonen", formato: "porcentaje", decimales: 1 },
    { clave: "paslag", etiqueta: "Påslag i prosent av årslønnen", formato: "porcentaje", decimales: 1 },
  ],
});
