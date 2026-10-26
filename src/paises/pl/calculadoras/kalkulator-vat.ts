import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pl.kalkulator-vat",
  mercado: "pl",
  concepto: "iva",
  slug: "kalkulator-vat",
  estado: "publicado",
  requiere: {
    "pl.stawki-vat": "mapa",
  },
  campos: [
    { id: "kwota", tipo: "moneda", etiqueta: "Kwota", min: 0, porDefecto: 100 },
    {
      id: "kierunek",
      tipo: "opcion",
      etiqueta: "Co chcesz policzyć?",
      opciones: [
        { valor: "netto-brutto", etiqueta: "Doliczyć VAT (kwota jest netto)" },
        { valor: "brutto-netto", etiqueta: "Odliczyć VAT (kwota jest brutto)" },
      ],
      porDefecto: "netto-brutto",
    },
    { id: "stawka", tipo: "opcion-dato", dato: "pl.stawki-vat", etiqueta: "Stawka VAT", porDefecto: "podstawowa" },
  ],
  calcular(e, v, { redondear }) {
    if (e.kwota <= 0) throw new ErrorEntrada("Wpisz kwotę większą od zera.", "kwota");
    const stawka = enMapa(v["pl.stawki-vat"], e.stawka);
    const netto = e.kierunek === "netto-brutto" ? e.kwota : redondear(e.kwota / (1 + stawka / 100));
    const vat = e.kierunek === "netto-brutto" ? redondear((netto * stawka) / 100) : redondear(e.kwota - netto);
    return { vat, netto, brutto: redondear(netto + vat), stawka };
  },
  resultado: [
    { clave: "vat", etiqueta: "Kwota VAT", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Kwota netto", formato: "moneda" },
    { clave: "brutto", etiqueta: "Kwota brutto", formato: "moneda" },
    { clave: "stawka", etiqueta: "Stawka VAT", formato: "porcentaje" },
  ],
});
