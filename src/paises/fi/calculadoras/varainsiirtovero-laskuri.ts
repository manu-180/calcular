import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.varainsiirtovero-laskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "varainsiirtovero-laskuri",
  estado: "publicado",
  requiere: { "fi.varainsiirtovero": "mapa" },
  campos: [
    { id: "kohde", tipo: "opcion-dato", dato: "fi.varainsiirtovero", etiqueta: "Mitä ostat", porDefecto: "asunto-osake" },
    { id: "kauppahinta", tipo: "moneda", etiqueta: "Kauppahinta (myyntihinta)", min: 0, porDefecto: 200000 },
    {
      id: "yhtiolaina",
      tipo: "moneda",
      etiqueta: "Asunnon osuus taloyhtiön lainasta",
      min: 0,
      porDefecto: 0,
      ayuda: "Asunto-osakkeessa vero lasketaan velattomasta hinnasta eli kauppahinnasta ja yhtiölainaosuudesta yhteensä.",
      visibleSi: { kohde: ["asunto-osake"] },
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.kauppahinta <= 0) throw new ErrorEntrada("Syötä kauppahinta, joka on suurempi kuin nolla.", "kauppahinta");
    const prosentti = enMapa(v["fi.varainsiirtovero"], e.kohde);
    const peruste = e.kauppahinta + (e.kohde === "asunto-osake" ? (e.yhtiolaina ?? 0) : 0);
    return {
      vero: redondear((peruste * prosentti) / 100),
      peruste: redondear(peruste),
      prosentti,
      observaciones: ["Ostaja tekee varainsiirtoveroilmoituksen ja maksaa veron oma-aloitteisesti OmaVerossa."],
    };
  },
  resultado: [
    { clave: "vero", etiqueta: "Varainsiirtovero", formato: "moneda", destacada: true },
    { clave: "peruste", etiqueta: "Veron peruste", formato: "moneda" },
    { clave: "prosentti", etiqueta: "Veroprosentti", formato: "porcentaje", decimales: 1 },
  ],
});
