import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.lomarahalaskuri",
  mercado: "fi",
  concepto: "propio",
  slug: "lomarahalaskuri",
  estado: "publicado",
  requiere: {
    "fi.lomakorvauksen-jakajat": "mapa",
    "fi.palkansaajan-maksut": "mapa",
  },
  campos: [
    { id: "kuukausipalkka", tipo: "moneda", etiqueta: "Kuukausipalkka", min: 0, porDefecto: 3000 },
    { id: "lomapaivat", tipo: "entero", etiqueta: "Lomapäivät, joilta lomaraha maksetaan", min: 1, max: 60, porDefecto: 30 },
    {
      id: "prosentti",
      tipo: "porcentaje",
      etiqueta: "Lomarahan prosentti lomapalkasta",
      min: 0,
      max: 100,
      porDefecto: 50,
      ayuda: "Tarkista prosentti työehtosopimuksestasi tai työsopimuksestasi.",
    },
    { id: "veroprosentti", tipo: "porcentaje", etiqueta: "Verokorttisi veroprosentti", min: 0, max: 60, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.kuukausipalkka <= 0) throw new ErrorEntrada("Syötä kuukausipalkka, joka on suurempi kuin nolla.", "kuukausipalkka");
    const paivanPalkka = e.kuukausipalkka / enMapa(v["fi.lomakorvauksen-jakajat"], "kuukausi");
    const lomapalkka = redondear(paivanPalkka * e.lomapaivat);
    const lomaraha = redondear((lomapalkka * e.prosentti) / 100);
    const m = v["fi.palkansaajan-maksut"];
    const maksut = redondear((lomaraha * (enMapa(m, "tyel") + enMapa(m, "tyottomyys"))) / 100);
    const vero = e.veroprosentti === null ? null : redondear((lomaraha * e.veroprosentti) / 100);
    return {
      lomaraha,
      lomapalkka,
      paivanPalkka: redondear(paivanPalkka),
      maksut,
      vero,
      netto: vero === null ? null : redondear(lomaraha - vero - maksut),
      observaciones: ["Lomaraha on palkkaa, joten siitä pidätetään vero ja palkansaajan maksut kuten muustakin palkasta."],
    };
  },
  resultado: [
    { clave: "lomaraha", etiqueta: "Lomaraha (brutto)", formato: "moneda", destacada: true },
    { clave: "lomapalkka", etiqueta: "Lomapalkka, josta lomaraha lasketaan", formato: "moneda" },
    { clave: "paivanPalkka", etiqueta: "Lomapäivän palkka", formato: "moneda" },
    { clave: "maksut", etiqueta: "Työeläke- ja työttömyysvakuutusmaksu", formato: "moneda" },
    { clave: "vero", etiqueta: "Ennakonpidätys", formato: "moneda" },
    { clave: "netto", etiqueta: "Lomaraha käteen", formato: "moneda" },
  ],
});
