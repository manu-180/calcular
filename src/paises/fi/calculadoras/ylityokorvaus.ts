import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";

export default definirCalculadora({
  id: "fi.ylityokorvaus",
  mercado: "fi",
  concepto: "horas-extra",
  slug: "ylityokorvaus",
  estado: "publicado",
  requiere: { "fi.ylityokorotukset": "mapa" },
  campos: [
    { id: "tuntipalkka", tipo: "moneda", etiqueta: "Tuntipalkka", min: 0, porDefecto: 20 },
    { id: "vrkTunnit", tipo: "numero", etiqueta: "Vuorokautista ylityötä päivässä (tunteja yli 8 tunnin)", min: 0, max: 16, porDefecto: 3 },
    { id: "vrkPaivat", tipo: "entero", etiqueta: "Monenako päivänä", min: 0, max: 31, porDefecto: 1 },
    { id: "viikkoTunnit", tipo: "numero", etiqueta: "Viikoittaista ylityötä (tunteja yli 40 tunnin viikossa)", min: 0, max: 60, porDefecto: 0 },
    { id: "sunnuntaiTunnit", tipo: "numero", etiqueta: "Sunnuntaityötunnit", min: 0, max: 24, porDefecto: 0 },
  ],
  tablas: [{ clave: "erittely", titulo: "Ylityökorvaus eriteltynä", filasVisibles: 4 }],
  calcular(e, v, { redondear }) {
    if (e.tuntipalkka <= 0) throw new ErrorEntrada("Syötä tuntipalkka, joka on suurempi kuin nolla.", "tuntipalkka");
    const k = v["fi.ylityokorotukset"];
    const kaksi = Math.min(e.vrkTunnit, 2) * e.vrkPaivat;
    const yli = Math.max(e.vrkTunnit - 2, 0) * e.vrkPaivat;
    const hinta = (tunnit: number, korotus: number) => redondear(tunnit * e.tuntipalkka * (1 + korotus / 100));
    const a = hinta(kaksi, enMapa(k, "vuorokautinen-2"));
    const b = hinta(yli, enMapa(k, "vuorokautinen-yli-2"));
    const c = hinta(e.viikkoTunnit, enMapa(k, "viikoittainen"));
    const sunnuntaiKorotus = redondear((e.sunnuntaiTunnit * e.tuntipalkka * enMapa(k, "sunnuntai")) / 100);
    const tunnit = kaksi + yli + e.viikkoTunnit;
    const yhteensa = redondear(a + b + c + sunnuntaiKorotus);
    const erittely: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "laji", etiqueta: "Työ", formato: "texto" },
        { clave: "tunnit", etiqueta: "Tunnit", formato: "horas" },
        { clave: "euroa", etiqueta: "Korvaus", formato: "moneda" },
      ],
      filas: [
        [`Vuorokautinen ylityö, 2 ensimmäistä tuntia (+${enMapa(k, "vuorokautinen-2")} %)`, kaksi, a],
        [`Vuorokautinen ylityö, seuraavat tunnit (+${enMapa(k, "vuorokautinen-yli-2")} %)`, yli, b],
        [`Viikoittainen ylityö (+${enMapa(k, "viikoittainen")} %)`, e.viikkoTunnit, c],
        [`Sunnuntaityön korotus (+${enMapa(k, "sunnuntai")} %)`, e.sunnuntaiTunnit, sunnuntaiKorotus],
      ],
    };
    return {
      yhteensa,
      korotukset: redondear(yhteensa - tunnit * e.tuntipalkka),
      perusosa: redondear(tunnit * e.tuntipalkka),
      tunnit,
      erittely,
      observaciones: ["Sunnuntaityöstä laskuri näyttää vain korotusosan. Sunnuntain tavallinen palkka maksetaan normaalisti."],
    };
  },
  resultado: [
    { clave: "yhteensa", etiqueta: "Ylityökorvaus yhteensä", formato: "moneda", destacada: true },
    { clave: "perusosa", etiqueta: "Ylityötuntien peruspalkka", formato: "moneda" },
    { clave: "korotukset", etiqueta: "Korotusosat yhteensä", formato: "moneda" },
    { clave: "tunnit", etiqueta: "Ylityötunnit", formato: "horas" },
  ],
});
