import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";
import { IKARYHMAT, KIRKOT, kirkollisvero, laskeVerot, REQ_VEROT } from "../lib/verot";

export default definirCalculadora({
  id: "fi.palkkalaskuri",
  mercado: "fi",
  concepto: "sueldo-neto",
  slug: "palkkalaskuri",
  estado: "publicado",
  requiere: {
    ...REQ_VEROT,
    "fi.kunnallisvero": "mapa",
    "fi.kirkollisvero-evl": "mapa",
    "fi.kirkollisvero-ort": "mapa",
  },
  campos: [
    { id: "kuukausipalkka", tipo: "moneda", etiqueta: "Bruttopalkka kuukaudessa", min: 0, porDefecto: 3500 },
    {
      id: "muutPalkat",
      tipo: "moneda",
      etiqueta: "Muut palkat vuodessa",
      min: 0,
      porDefecto: 0,
      ayuda: "Esimerkiksi lomaraha, bonukset tai lisät, jotka eivät ole mukana kuukausipalkassa.",
    },
    { id: "kunta", tipo: "opcion-dato", dato: "fi.kunnallisvero", etiqueta: "Kotikunta", porDefecto: "helsinki" },
    { id: "kirkko", tipo: "opcion", etiqueta: "Kirkon jäsenyys", opciones: KIRKOT, porDefecto: "ei" },
    { id: "ika", tipo: "opcion", etiqueta: "Ikä", opciones: IKARYHMAT, porDefecto: "18-64" },
    { id: "lapset", tipo: "entero", etiqueta: "Alaikäiset lapset, joiden huoltaja olet", min: 0, max: 15, porDefecto: 0 },
    { id: "yksinhuoltaja", tipo: "si-no", etiqueta: "Olen lasten ainoa huoltaja", porDefecto: false },
  ],
  tablas: [{ clave: "erittely", titulo: "Verot ja maksut vuodessa", filasVisibles: 10 }],
  calcular(e, v, { redondear }) {
    if (e.kuukausipalkka <= 0) throw new ErrorEntrada("Syötä bruttopalkka, joka on suurempi kuin nolla.", "kuukausipalkka");
    const vuosi = e.kuukausipalkka * 12 + e.muutPalkat;
    const kunnallis = enMapa(v["fi.kunnallisvero"], e.kunta);
    const kirkollis = kirkollisvero(e.kirkko, e.kunta, v["fi.kirkollisvero-evl"], v["fi.kirkollisvero-ort"]);
    const x = laskeVerot(
      { palkka: vuosi, elake: 0, etuus: 0 },
      { ika: e.ika, lapset: e.lapset, yksinhuoltaja: e.yksinhuoltaja && e.lapset > 0, kunnallisvero: kunnallis, kirkollisvero: kirkollis },
      v,
      redondear,
    );
    const m = v["fi.palkansaajan-maksut"];
    const tyelKk = redondear((e.kuukausipalkka * enMapa(m, "tyel")) / 100);
    const tyottomyysKk = e.ika === "18-64" ? redondear((e.kuukausipalkka * enMapa(m, "tyottomyys")) / 100) : 0;
    const veroKk = redondear((e.kuukausipalkka * x.veroprosentti) / 100);
    const erittely: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "era", etiqueta: "Erä", formato: "texto" },
        { clave: "euroa", etiqueta: "Vuodessa", formato: "moneda" },
      ],
      filas: [
        ["Valtion tulovero (työtulovähennyksen jälkeen)", x.valtio],
        ["Kunnallisvero", x.kunta],
        ["Kirkollisvero", x.kirkko],
        ["Sairaanhoitomaksu", x.sairaanhoito],
        ["Sairausvakuutuksen päivärahamaksu", x.paivaraha],
        ["Yle-vero", x.yle],
        ["Työeläkemaksu", x.tyel],
        ["Työttömyysvakuutusmaksu", x.tyottomyys],
        ["Työtulovähennys (pienentää veroja)", x.tyotulovahennys],
      ],
    };
    const observaciones = ["Laskelma olettaa, että saat vain palkkatuloa ja että verotuksessa tehdään vain automaattiset vähennykset."];
    if (e.muutPalkat > 0) observaciones.push("Muut palkat on lisätty vuosituloihin. Siksi veroprosentti on hieman suurempi kuin pelkällä kuukausipalkalla.");
    return {
      nettoKk: redondear(e.kuukausipalkka - veroKk - tyelKk - tyottomyysKk),
      ennakonpidatys: x.ennakonpidatys,
      veroprosentti: x.veroprosentti,
      veroKk,
      tyelKk,
      tyottomyysKk,
      bruttoVuosi: redondear(vuosi),
      verotVuosi: x.yhteensa,
      nettoVuosi: redondear(vuosi - x.yhteensa - x.tyel - x.tyottomyys),
      erittely,
      observaciones,
    };
  },
  resultado: [
    { clave: "nettoKk", etiqueta: "Nettopalkka kuukaudessa", formato: "moneda", destacada: true },
    { clave: "ennakonpidatys", etiqueta: "Arvio verokortin veroprosentista", formato: "porcentaje", decimales: 1 },
    { clave: "veroprosentti", etiqueta: "Todellinen veroprosentti", formato: "porcentaje", decimales: 2 },
    { clave: "veroKk", etiqueta: "Vero kuukaudessa", formato: "moneda" },
    { clave: "tyelKk", etiqueta: "Työeläkemaksu kuukaudessa", formato: "moneda" },
    { clave: "tyottomyysKk", etiqueta: "Työttömyysvakuutusmaksu kuukaudessa", formato: "moneda", ocultarSiCero: true },
    { clave: "bruttoVuosi", etiqueta: "Bruttotulot vuodessa", formato: "moneda" },
    { clave: "verotVuosi", etiqueta: "Verot vuodessa", formato: "moneda" },
    { clave: "nettoVuosi", etiqueta: "Nettotulot vuodessa", formato: "moneda" },
  ],
  mundo: {
    bruto: "kuukausipalkka",
    periodoBruto: "mes",
    neto: "nettoKk",
    periodoNeto: "mes",
    entrada: { muutPalkat: 0, kunta: "helsinki", kirkko: "ei", ika: "18-64", lapset: 0, yksinhuoltaja: false },
  },
});
