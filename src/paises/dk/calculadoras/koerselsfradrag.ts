import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.koerselsfradrag",
  mercado: "dk",
  concepto: "propio",
  slug: "koerselsfradrag",
  estado: "publicado",
  requiere: {
    "dk.koerselsfradrag": "mapa",
    "dk.koerselsfradrag-km": "mapa",
    "dk.kommuneskat": "mapa",
    "dk.kirkeskat": "mapa",
  },
  campos: [
    { id: "km", tipo: "numero", etiqueta: "Kilometer tur-retur pr. arbejdsdag", min: 0, max: 2000, porDefecto: 60, ayuda: "Den korteste vej mellem hjem og arbejde, frem og tilbage." },
    { id: "dage", tipo: "entero", etiqueta: "Arbejdsdage med kørsel i år", min: 0, max: 366, porDefecto: 216 },
    { id: "yderkommune", tipo: "si-no", etiqueta: "Jeg bor i en yderkommune eller på en af de omfattede småøer", porDefecto: false },
    { id: "kommune", tipo: "opcion-dato", dato: "dk.kommuneskat", etiqueta: "Din kommune (til fradragets skatteværdi)", porDefecto: "koebenhavn" },
    { id: "kirkeskat", tipo: "si-no", etiqueta: "Medlem af folkekirken", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.km < 0) throw new ErrorEntrada("Afstanden kan ikke være negativ.", "km");
    if (e.dage < 0 || e.dage > 366) throw new ErrorEntrada("Skriv et antal dage mellem 0 og 366.", "dage");
    const s = v["dk.koerselsfradrag"];
    // De første km om dagen giver intet fradrag; satsen falder over den øvre grænse (ikke i yderkommuner).
    const fri = enMapa(v["dk.koerselsfradrag-km"], "uden-fradrag");
    const lavOver = enMapa(v["dk.koerselsfradrag-km"], "lav-sats-over");
    const mellem = Math.max(0, Math.min(e.km, lavOver) - fri);
    const over = Math.max(0, e.km - lavOver);
    const prDag = e.yderkommune ? (mellem + over) * enMapa(s, "yderkommune") : mellem * enMapa(s, "mellem") + over * enMapa(s, "over-120");
    const fradrag = redondear(prDag * e.dage);
    const sats = enMapa(v["dk.kommuneskat"], e.kommune) + (e.kirkeskat ? enMapa(v["dk.kirkeskat"], e.kommune) : 0);
    const vaerdi = redondear(porcentaje(fradrag, sats));
    return {
      fradrag,
      prDag: redondear(prDag),
      vaerdi,
      vaerdiMaaned: redondear(vaerdi / 12),
      sats,
      observaciones: e.km <= fri ? [`Til og med ${fri} km om dagen tur-retur giver ikke kørselsfradrag.`] : [],
    };
  },
  resultado: [
    { clave: "fradrag", etiqueta: "Kørselsfradrag om året", formato: "moneda", destacada: true },
    { clave: "prDag", etiqueta: "Fradrag pr. arbejdsdag", formato: "moneda" },
    { clave: "vaerdi", etiqueta: "Skatteværdi om året", formato: "moneda" },
    { clave: "vaerdiMaaned", etiqueta: "Skatteværdi pr. måned", formato: "moneda" },
    { clave: "sats", etiqueta: "Fradragets værdi (kommuneskat og kirkeskat)", formato: "porcentaje", decimales: 2 },
  ],
});
