import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";

export default definirCalculadora({
  id: "fi.kilometrikorvaus",
  mercado: "fi",
  concepto: "propio",
  slug: "kilometrikorvaus",
  estado: "publicado",
  requiere: {
    "fi.kilometrikorvaus": "numero",
    "fi.paivarahat": "mapa",
  },
  campos: [
    { id: "km", tipo: "numero", etiqueta: "Työajot omalla autolla (km)", min: 0, porDefecto: 100 },
    { id: "kokopaivat", tipo: "entero", etiqueta: "Matkapäivät, joilla matka kesti yli 10 tuntia", min: 0, max: 366, porDefecto: 0 },
    { id: "osapaivat", tipo: "entero", etiqueta: "Matkapäivät, joilla matka kesti yli 6 tuntia", min: 0, max: 366, porDefecto: 0 },
    { id: "ateriat", tipo: "entero", etiqueta: "Ateriakorvaukset (päivät ilman päivärahaa)", min: 0, max: 366, porDefecto: 0 },
  ],
  tablas: [{ clave: "erittely", titulo: "Verovapaat korvaukset", filasVisibles: 4 }],
  calcular(e, v, { redondear }) {
    if (e.km + e.kokopaivat + e.osapaivat + e.ateriat <= 0) throw new ErrorEntrada("Syötä kilometrit tai matkapäivät.", "km");
    const p = v["fi.paivarahat"];
    const km = redondear(e.km * v["fi.kilometrikorvaus"]);
    const koko = redondear(e.kokopaivat * enMapa(p, "kokopaiva"));
    const osa = redondear(e.osapaivat * enMapa(p, "osapaiva"));
    const ateria = redondear(e.ateriat * enMapa(p, "ateria"));
    const erittely: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "korvaus", etiqueta: "Korvaus", formato: "texto" },
        { clave: "euroa", etiqueta: "Euroa", formato: "moneda" },
      ],
      filas: [
        ["Kilometrikorvaus", km],
        ["Kokopäivärahat", koko],
        ["Osapäivärahat", osa],
        ["Ateriakorvaukset", ateria],
      ],
    };
    return {
      yhteensa: redondear(km + koko + osa + ateria),
      kmKorvaus: km,
      paivarahat: redondear(koko + osa + ateria),
      erittely,
      observaciones: ["Summat ovat Verohallinnon vahvistamia verovapaita enimmäismääriä. Päätös ei velvoita työnantajaa maksamaan korvauksia."],
    };
  },
  resultado: [
    { clave: "yhteensa", etiqueta: "Verovapaat matkakorvaukset yhteensä", formato: "moneda", destacada: true },
    { clave: "kmKorvaus", etiqueta: "Kilometrikorvaus", formato: "moneda" },
    { clave: "paivarahat", etiqueta: "Päivärahat ja ateriakorvaukset", formato: "moneda" },
  ],
});
