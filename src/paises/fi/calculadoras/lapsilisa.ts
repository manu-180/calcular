import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";

const JARJESTYS = ["Ensimmäinen", "Toinen", "Kolmas", "Neljäs", "Viides"];

export default definirCalculadora({
  id: "fi.lapsilisa",
  mercado: "fi",
  concepto: "propio",
  slug: "lapsilisa",
  estado: "publicado",
  requiere: {
    "fi.lapsilisa": "mapa",
    "fi.lapsilisan-yksinhuoltajakorotus": "numero",
  },
  campos: [
    { id: "lapset", tipo: "entero", etiqueta: "Alle 17-vuotiaat lapset, joista saat lapsilisää", min: 1, max: 15, porDefecto: 2 },
    { id: "alle3", tipo: "entero", etiqueta: "Joista alle 3-vuotiaita", min: 0, max: 15, porDefecto: 0 },
    { id: "yksinhuoltaja", tipo: "si-no", etiqueta: "Olen yksinhuoltaja", porDefecto: false },
  ],
  tablas: [{ clave: "lapsittain", titulo: "Lapsilisä lapsittain", filasVisibles: 6 }],
  calcular(e, v, { redondear }) {
    if (e.alle3 > e.lapset) throw new ErrorEntrada("Alle 3-vuotiaita ei voi olla enemmän kuin lapsia yhteensä.", "alle3");
    const m = v["fi.lapsilisa"];
    const korotus = e.yksinhuoltaja ? v["fi.lapsilisan-yksinhuoltajakorotus"] : 0;
    const filas: (string | number)[][] = [];
    let summa = 0;
    for (let i = 1; i <= e.lapset; i++) {
      // Nuorimmat lapset ovat järjestyksessä viimeisinä.
      const pieni = i > e.lapset - e.alle3;
      const avain = `${Math.min(i, 5)}${pieni ? "-alle-3" : ""}`;
      const maara = redondear(enMapa(m, avain) + korotus);
      summa += maara;
      filas.push([`${JARJESTYS[Math.min(i, 5) - 1]}${i > 5 ? ` (${i}.)` : ""} lapsi${pieni ? ", alle 3-vuotias" : ""}`, maara]);
    }
    const lapsittain: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "lapsi", etiqueta: "Lapsi", formato: "texto" },
        { clave: "euroa", etiqueta: "Kuukaudessa", formato: "moneda" },
      ],
      filas,
    };
    return {
      kuukaudessa: redondear(summa),
      vuodessa: redondear(summa * 12),
      korotukset: redondear(korotus * e.lapset),
      lapsittain,
      observaciones: ["Lapsilisä maksetaan kuukausittain sen kuukauden loppuun, jona lapsi täyttää 17 vuotta."],
    };
  },
  resultado: [
    { clave: "kuukaudessa", etiqueta: "Lapsilisät yhteensä kuukaudessa", formato: "moneda", destacada: true },
    { clave: "vuodessa", etiqueta: "Lapsilisät vuodessa", formato: "moneda" },
    { clave: "korotukset", etiqueta: "Josta yksinhuoltajakorotukset", formato: "moneda", ocultarSiCero: true },
  ],
});
