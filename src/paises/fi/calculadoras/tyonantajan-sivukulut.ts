import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";

export default definirCalculadora({
  id: "fi.tyonantajan-sivukulut",
  mercado: "fi",
  concepto: "costo-empleador",
  slug: "tyonantajan-sivukulut",
  estado: "publicado",
  requiere: {
    "fi.tyel-tyonantaja": "numero",
    "fi.sairausvakuutusmaksu-tyonantaja": "numero",
    "fi.tyottomyysvakuutusmaksu-tyonantaja": "mapa",
    "fi.tyottomyysvakuutusmaksun-palkkasummaraja": "numero",
  },
  campos: [
    { id: "palkka", tipo: "moneda", etiqueta: "Bruttopalkka kuukaudessa", min: 0, porDefecto: 3500 },
    {
      id: "palkkasumma",
      tipo: "opcion",
      etiqueta: "Yrityksen koko palkkasumma vuodessa",
      opciones: [
        { valor: "pieni", etiqueta: "Enintään työttömyysvakuutusmaksun raja-arvo" },
        { valor: "suuri", etiqueta: "Yli raja-arvon" },
      ],
      porDefecto: "pieni",
    },
    {
      id: "tyel",
      tipo: "porcentaje",
      etiqueta: "Oma TyEL-maksusi (työnantajan osuus)",
      min: 0,
      max: 40,
      requerido: false,
      ayuda: "Jätä tyhjäksi, niin laskuri käyttää keskimääräistä työnantajan maksua.",
    },
    {
      id: "tapaturma",
      tipo: "porcentaje",
      etiqueta: "Tapaturma- ja ryhmähenkivakuutus",
      min: 0,
      max: 10,
      requerido: false,
      ayuda: "Maksu vaihtelee vakuutusyhtiön ja alan mukaan. Katso prosentti omasta vakuutuksestasi.",
    },
  ],
  tablas: [{ clave: "erittely", titulo: "Sivukulut kuukaudessa", filasVisibles: 5 }],
  calcular(e, v, { redondear }) {
    if (e.palkka <= 0) throw new ErrorEntrada("Syötä palkka, joka on suurempi kuin nolla.", "palkka");
    const tyelProsentti = e.tyel ?? v["fi.tyel-tyonantaja"];
    const tvmProsentti = enMapa(v["fi.tyottomyysvakuutusmaksu-tyonantaja"], e.palkkasumma === "suuri" ? "ylempi" : "alempi");
    const tyel = redondear((e.palkka * tyelProsentti) / 100);
    const tyottomyys = redondear((e.palkka * tvmProsentti) / 100);
    const sairausvakuutus = redondear((e.palkka * v["fi.sairausvakuutusmaksu-tyonantaja"]) / 100);
    const tapaturma = redondear((e.palkka * (e.tapaturma ?? 0)) / 100);
    const sivukulut = redondear(tyel + tyottomyys + sairausvakuutus + tapaturma);
    const erittely: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "maksu", etiqueta: "Maksu", formato: "texto" },
        { clave: "prosentti", etiqueta: "Prosentti", formato: "porcentaje" },
        { clave: "euroa", etiqueta: "Kuukaudessa", formato: "moneda" },
      ],
      filas: [
        ["Työeläkemaksu (TyEL)", tyelProsentti, tyel],
        ["Työttömyysvakuutusmaksu", tvmProsentti, tyottomyys],
        ["Sairausvakuutusmaksu", v["fi.sairausvakuutusmaksu-tyonantaja"], sairausvakuutus],
        ["Tapaturma- ja ryhmähenkivakuutus", e.tapaturma ?? 0, tapaturma],
      ],
    };
    const observaciones: string[] = [];
    if (e.tapaturma === null) observaciones.push("Tapaturma- ja ryhmähenkivakuutus puuttuu laskelmasta. Lisää oma prosenttisi, niin kokonaiskustannus tarkentuu.");
    return {
      sivukulut,
      kokonais: redondear(e.palkka + sivukulut),
      sivukuluprosentti: (sivukulut / e.palkka) * 100,
      vuodessa: redondear((e.palkka + sivukulut) * 12),
      erittely,
      observaciones,
    };
  },
  resultado: [
    { clave: "kokonais", etiqueta: "Palkan kokonaiskustannus kuukaudessa", formato: "moneda", destacada: true },
    { clave: "sivukulut", etiqueta: "Lakisääteiset sivukulut kuukaudessa", formato: "moneda" },
    { clave: "sivukuluprosentti", etiqueta: "Sivukulut palkasta", formato: "porcentaje", decimales: 2 },
    { clave: "vuodessa", etiqueta: "Kokonaiskustannus 12 kuukaudelta", formato: "moneda" },
  ],
});
