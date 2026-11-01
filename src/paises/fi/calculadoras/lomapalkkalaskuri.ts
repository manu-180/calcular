import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.lomapalkkalaskuri",
  mercado: "fi",
  concepto: "vacaciones",
  slug: "lomapalkkalaskuri",
  estado: "publicado",
  requiere: {
    "fi.lomapaivat": "mapa",
    "fi.lomapalkka-prosentti": "mapa",
    "fi.lomapalkan-kertoimet": "mapa",
    "fi.lomapalkan-kertoimen-lisays": "numero",
    "fi.lomakorvauksen-jakajat": "mapa",
  },
  campos: [
    {
      id: "palkkaus",
      tipo: "opcion",
      etiqueta: "Miten sinulle maksetaan palkkaa",
      opciones: [
        { valor: "kuukausi", etiqueta: "Kuukausipalkka" },
        { valor: "tunti", etiqueta: "Tunti- tai urakkapalkka, töitä vähintään 14 päivänä kuukaudessa" },
        { valor: "prosentti", etiqueta: "Töitä alle 14 päivänä kuukaudessa" },
      ],
      porDefecto: "kuukausi",
    },
    { id: "vuosi", tipo: "si-no", etiqueta: "Työsuhde oli jatkunut vähintään vuoden 31.3. mennessä", porDefecto: true },
    {
      id: "kuukaudet",
      tipo: "entero",
      etiqueta: "Täydet lomanmääräytymiskuukaudet (1.4.-31.3.)",
      min: 0,
      max: 12,
      porDefecto: 12,
      ayuda: "Täysi kuukausi on kuukausi, jossa olit töissä vähintään 14 päivänä tai 35 tuntia.",
      visibleSi: { palkkaus: ["kuukausi", "tunti"] },
    },
    { id: "kuukausipalkka", tipo: "moneda", etiqueta: "Kuukausipalkka", min: 0, porDefecto: 3000, visibleSi: { palkkaus: ["kuukausi"] } },
    {
      id: "palkat",
      tipo: "moneda",
      etiqueta: "Palkat lomanmääräytymisvuoden ajalta",
      min: 0,
      porDefecto: 30000,
      ayuda: "Ilman ylityön ja hätätyön korotusosia.",
      visibleSi: { palkkaus: ["tunti", "prosentti"] },
    },
    { id: "tyopaivat", tipo: "entero", etiqueta: "Tehdyt työpäivät lomanmääräytymisvuonna", min: 1, porDefecto: 220, visibleSi: { palkkaus: ["tunti"] } },
    { id: "viikkopaivat", tipo: "entero", etiqueta: "Työpäiviä viikossa sopimuksen mukaan", min: 1, max: 7, porDefecto: 5, visibleSi: { palkkaus: ["tunti"] } },
  ],
  calcular(e, v, { redondear }) {
    const avain = e.vuosi ? "vuosi" : "alle-vuosi";
    if (e.palkkaus === "prosentti") {
      const prosentti = enMapa(v["fi.lomapalkka-prosentti"], avain);
      return {
        lomapaivat: null,
        lomapalkka: redondear(((e.palkat ?? 0) * prosentti) / 100),
        paivanPalkka: null,
        kerroin: null,
        observaciones: [`Lomapalkka on ${String(prosentti).replace(".", ",")} % lomanmääräytymisvuoden palkoista. Voit pitää vapaata kaksi arkipäivää kultakin työkuukaudelta.`],
      };
    }
    const kuukaudet = e.kuukaudet ?? 0;
    const lomapaivat = Math.ceil(kuukaudet * enMapa(v["fi.lomapaivat"], avain) - 1e-9);
    if (lomapaivat === 0) throw new ErrorEntrada("Lomaa kertyy vasta täysiltä lomanmääräytymiskuukausilta. Syötä vähintään yksi kuukausi.", "kuukaudet");
    if (e.palkkaus === "kuukausi") {
      const paivanPalkka = (e.kuukausipalkka ?? 0) / enMapa(v["fi.lomakorvauksen-jakajat"], "kuukausi");
      return {
        lomapaivat,
        lomapalkka: redondear(paivanPalkka * lomapaivat),
        paivanPalkka: redondear(paivanPalkka),
        kerroin: null,
        observaciones: ["Kuukausipalkkainen saa lomaltaan tavallisen palkkansa. Lomapalkka on tässä lomapäivien määrä kertaa kuukausipalkka jaettuna 25:llä."],
      };
    }
    const k = v["fi.lomapalkan-kertoimet"];
    const kerroin = lomapaivat > 30 ? enMapa(k, "30") + (lomapaivat - 30) * v["fi.lomapalkan-kertoimen-lisays"] : enMapa(k, String(lomapaivat));
    const keskipaivapalkka = ((e.palkat ?? 0) / (e.tyopaivat ?? 1)) * ((e.viikkopaivat ?? 5) / 5);
    return {
      lomapaivat,
      lomapalkka: redondear(keskipaivapalkka * kerroin),
      paivanPalkka: redondear(keskipaivapalkka),
      kerroin,
      observaciones: ["Keskipäiväpalkka on palkat jaettuna työpäivillä. Laskuri ei lisää päiviin säännöllisen työajan ylittäviä tunteja."],
    };
  },
  resultado: [
    { clave: "lomapalkka", etiqueta: "Lomapalkka", formato: "moneda", destacada: true },
    { clave: "lomapaivat", etiqueta: "Ansaitut lomapäivät", formato: "dias", decimales: 0 },
    { clave: "paivanPalkka", etiqueta: "Lomapäivän palkka (keskipäiväpalkka)", formato: "moneda" },
    { clave: "kerroin", etiqueta: "Kerroin", formato: "numero", decimales: 1 },
  ],
});
