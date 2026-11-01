import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";
import { IKARYHMAT, KIRKOT, kirkollisvero, laskeVerot, REQ_ELAKE, REQ_VEROT } from "../lib/verot";

export default definirCalculadora({
  id: "fi.veroprosenttilaskuri",
  mercado: "fi",
  concepto: "impuesto-renta",
  slug: "veroprosenttilaskuri",
  estado: "publicado",
  requiere: {
    ...REQ_VEROT,
    ...REQ_ELAKE,
    "fi.kunnallisvero": "mapa",
    "fi.kirkollisvero-evl": "mapa",
    "fi.kirkollisvero-ort": "mapa",
  },
  campos: [
    {
      id: "tulolaji",
      tipo: "opcion",
      etiqueta: "Tulon laji",
      opciones: [
        { valor: "palkka", etiqueta: "Palkka" },
        { valor: "elake", etiqueta: "Eläke" },
        { valor: "etuus", etiqueta: "Etuus (esim. työttömyysetuus tai sairauspäiväraha)" },
      ],
      porDefecto: "palkka",
    },
    { id: "vuositulot", tipo: "moneda", etiqueta: "Tulot vuodessa (brutto)", min: 0, porDefecto: 40000 },
    { id: "kunta", tipo: "opcion-dato", dato: "fi.kunnallisvero", etiqueta: "Kotikunta", porDefecto: "helsinki" },
    { id: "kirkko", tipo: "opcion", etiqueta: "Kirkon jäsenyys", opciones: KIRKOT, porDefecto: "ei" },
    { id: "ika", tipo: "opcion", etiqueta: "Ikä", opciones: IKARYHMAT, porDefecto: "18-64" },
    { id: "lapset", tipo: "entero", etiqueta: "Alaikäiset lapset, joiden huoltaja olet", min: 0, max: 15, porDefecto: 0, visibleSi: { tulolaji: ["palkka"] } },
  ],
  tablas: [{ clave: "erittely", titulo: "Näin vero muodostuu", filasVisibles: 14 }],
  calcular(e, v, { redondear }) {
    if (e.vuositulot <= 0) throw new ErrorEntrada("Syötä vuositulot, jotka ovat suurempia kuin nolla.", "vuositulot");
    const tulot = { palkka: e.tulolaji === "palkka" ? e.vuositulot : 0, elake: e.tulolaji === "elake" ? e.vuositulot : 0, etuus: e.tulolaji === "etuus" ? e.vuositulot : 0 };
    const x = laskeVerot(
      tulot,
      {
        ika: e.ika,
        lapset: e.lapset ?? 0,
        yksinhuoltaja: false,
        kunnallisvero: enMapa(v["fi.kunnallisvero"], e.kunta),
        kirkollisvero: kirkollisvero(e.kirkko, e.kunta, v["fi.kirkollisvero-evl"], v["fi.kirkollisvero-ort"]),
      },
      v,
      redondear,
      v,
    );
    const filas: [string, number][] = [
      ["Puhdas ansiotulo", x.puhdas],
      ["Eläketulovähennys", x.elaketulovahennys],
      ["Perusvähennys", x.perusvahennys],
      ["Verotettava tulo", x.verotettava],
      ["Valtion tulovero", x.valtio],
      ["Kunnallisvero", x.kunta],
      ["Kirkollisvero", x.kirkko],
      ["Sairaanhoitomaksu", x.sairaanhoito],
      ["Päivärahamaksu", x.paivaraha],
      ["Yle-vero", x.yle],
      ["Eläketulon lisävero", x.lisavero],
      ["Työtulovähennys (jo vähennetty veroista)", x.tyotulovahennys],
    ];
    const erittely: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "era", etiqueta: "Erä", formato: "texto" },
        { clave: "euroa", etiqueta: "Euroa vuodessa", formato: "moneda" },
      ],
      filas: filas.filter(([, n], i) => n !== 0 || i < 4),
    };
    const observaciones: string[] = [];
    if (e.tulolaji === "palkka") observaciones.push("Palkasta peritään veron lisäksi työeläkemaksu ja työttömyysvakuutusmaksu. Ne eivät sisälly veroprosenttiin.");
    if (x.lisavero > 0) observaciones.push("Eläketulon lisävero peritään vain vuosieläkkeen siitä osasta, joka ylittää lisäveron rajan.");
    return {
      ennakonpidatys: x.ennakonpidatys,
      veroprosentti: x.veroprosentti,
      verot: x.yhteensa,
      verotKk: redondear(x.yhteensa / 12),
      kateen: redondear(x.brutto - x.yhteensa - x.tyel - x.tyottomyys),
      erittely,
      observaciones,
    };
  },
  resultado: [
    { clave: "ennakonpidatys", etiqueta: "Veroprosentti (verokortin tarkkuudella)", formato: "porcentaje", decimales: 1, destacada: true },
    { clave: "veroprosentti", etiqueta: "Tarkka veroprosentti", formato: "porcentaje", decimales: 2 },
    { clave: "verot", etiqueta: "Verot ja veronluonteiset maksut vuodessa", formato: "moneda" },
    { clave: "verotKk", etiqueta: "Verot keskimäärin kuukaudessa", formato: "moneda" },
    { clave: "kateen", etiqueta: "Käteen vuodessa", formato: "moneda" },
  ],
});
