import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.feriepenger",
  mercado: "no",
  concepto: "vacaciones",
  slug: "feriepenger",
  estado: "publicado",
  requiere: {
    "no.feriepenger-sats": "numero",
    "no.feriepenger-tillegg-60": "numero",
    "no.feriepenger-tak-60-g": "numero",
    "no.feriedager": "mapa",
    "no.grunnbelop": "numero",
  },
  campos: [
    { id: "grunnlag", tipo: "moneda", etiqueta: "Feriepengegrunnlag (lønn utbetalt i opptjeningsåret)", min: 0, porDefecto: 550000, ayuda: "Vanligvis lønnen du fikk utbetalt i fjor, uten feriepengene selv." },
    {
      id: "sats",
      tipo: "opcion",
      etiqueta: "Sats",
      opciones: [
        { valor: "lov", etiqueta: "Ferieloven (4 uker og 1 dag)" },
        { valor: "egen", etiqueta: "Egen sats (for eksempel etter tariffavtale)" },
      ],
      porDefecto: "lov",
    },
    { id: "egenSats", tipo: "porcentaje", etiqueta: "Din sats for feriepenger", min: 0, max: 30, porDefecto: 12, visibleSi: { sats: ["egen"] } },
    { id: "over60", tipo: "si-no", etiqueta: "Du fyller 60 år eller mer i ferieåret", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.grunnlag <= 0) throw new ErrorEntrada("Skriv inn feriepengegrunnlaget.", "grunnlag");
    const lovSats = v["no.feriepenger-sats"];
    const sats = e.sats === "egen" ? (e.egenSats ?? lovSats) : lovSats;
    if (sats < lovSats) throw new ErrorEntrada("Satsen kan ikke være lavere enn den i ferieloven.", "egenSats");
    const ordinaer = redondear((e.grunnlag * sats) / 100);
    const tak = v["no.feriepenger-tak-60-g"] * v["no.grunnbelop"];
    const tillegg = e.over60 ? redondear((Math.min(e.grunnlag, tak) * v["no.feriepenger-tillegg-60"]) / 100) : 0;
    const dager = enMapa(v["no.feriedager"], "ordinaer") + (e.over60 ? enMapa(v["no.feriedager"], "ekstra-60") : 0);
    const observaciones: string[] = [];
    if (e.over60 && e.grunnlag > tak) observaciones.push("Tillegget for arbeidstakere over 60 år regnes bare av den delen av grunnlaget som er under 6 G.");
    return {
      feriepenger: redondear(ordinaer + tillegg),
      ordinaer,
      tillegg60: tillegg,
      sats,
      dager,
      observaciones,
    };
  },
  resultado: [
    { clave: "feriepenger", etiqueta: "Feriepenger", formato: "moneda", destacada: true },
    { clave: "ordinaer", etiqueta: "Feriepenger etter satsen", formato: "moneda" },
    { clave: "tillegg60", etiqueta: "Tillegg for 60 år og eldre", formato: "moneda", ocultarSiCero: true },
    { clave: "sats", etiqueta: "Sats", formato: "porcentaje", decimales: 1 },
    { clave: "dager", etiqueta: "Feriedager etter ferieloven (virkedager)", formato: "dias", decimales: 0 },
  ],
});
