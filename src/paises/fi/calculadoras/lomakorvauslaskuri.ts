import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.lomakorvauslaskuri",
  mercado: "fi",
  concepto: "liquidacion-final",
  slug: "lomakorvauslaskuri",
  estado: "publicado",
  requiere: {
    "fi.lomapaivat": "mapa",
    "fi.lomapalkka-prosentti": "mapa",
    "fi.lomakorvauksen-jakajat": "mapa",
  },
  campos: [
    {
      id: "palkkaus",
      tipo: "opcion",
      etiqueta: "Palkkaus",
      opciones: [
        { valor: "kuukausi", etiqueta: "Kuukausipalkka" },
        { valor: "prosentti", etiqueta: "Töitä alle 14 päivänä kuukaudessa (prosenttiperusteinen)" },
      ],
      porDefecto: "kuukausi",
    },
    { id: "vuosi", tipo: "si-no", etiqueta: "Työsuhde jatkui päättyessään vähintään vuoden", porDefecto: true },
    { id: "kuukausipalkka", tipo: "moneda", etiqueta: "Kuukausipalkka", min: 0, porDefecto: 3000, visibleSi: { palkkaus: ["kuukausi"] } },
    {
      id: "pitamattomat",
      tipo: "numero",
      etiqueta: "Aiemmin ansaitut, pitämättömät lomapäivät",
      min: 0,
      porDefecto: 0,
      visibleSi: { palkkaus: ["kuukausi"] },
    },
    {
      id: "kuukaudet",
      tipo: "entero",
      etiqueta: "Täydet kuukaudet 1.4. jälkeen ennen työsuhteen päättymistä",
      min: 0,
      max: 12,
      porDefecto: 6,
      visibleSi: { palkkaus: ["kuukausi"] },
    },
    { id: "palkat", tipo: "moneda", etiqueta: "Palkat ajalta, jolta lomakorvausta ei ole maksettu", min: 0, porDefecto: 10000, visibleSi: { palkkaus: ["prosentti"] } },
  ],
  calcular(e, v, { redondear }) {
    const avain = e.vuosi ? "vuosi" : "alle-vuosi";
    if (e.palkkaus === "prosentti") {
      return {
        lomakorvaus: redondear(((e.palkat ?? 0) * enMapa(v["fi.lomapalkka-prosentti"], avain)) / 100),
        kertyneet: null,
        paivatYhteensa: null,
        paivanPalkka: null,
      };
    }
    const kertyneet = Math.ceil((e.kuukaudet ?? 0) * enMapa(v["fi.lomapaivat"], avain) - 1e-9);
    const paivat = kertyneet + (e.pitamattomat ?? 0);
    if (paivat <= 0) throw new ErrorEntrada("Syötä pitämättömät lomapäivät tai kuluvan vuoden kuukaudet.", "kuukaudet");
    const paivanPalkka = (e.kuukausipalkka ?? 0) / enMapa(v["fi.lomakorvauksen-jakajat"], "kuukausi");
    return {
      lomakorvaus: redondear(paivanPalkka * paivat),
      kertyneet,
      paivatYhteensa: paivat,
      paivanPalkka: redondear(paivanPalkka),
    };
  },
  resultado: [
    { clave: "lomakorvaus", etiqueta: "Lomakorvaus", formato: "moneda", destacada: true },
    { clave: "kertyneet", etiqueta: "Kuluvana vuonna kertyneet lomapäivät", formato: "dias", decimales: 0 },
    { clave: "paivatYhteensa", etiqueta: "Korvattavat lomapäivät yhteensä", formato: "dias", decimales: 1 },
    { clave: "paivanPalkka", etiqueta: "Lomapäivän palkka", formato: "moneda" },
  ],
});
