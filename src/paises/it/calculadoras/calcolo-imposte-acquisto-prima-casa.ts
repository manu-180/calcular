import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.imposte-acquisto-casa",
  mercado: "it",
  concepto: "propio",
  slug: "calcolo-imposte-acquisto-prima-casa",
  estado: "publicado",
  requiere: {
    "it.imposte-prima-casa": "mapa",
    "it.imposte-altre-case": "mapa",
  },
  campos: [
    { id: "prezzo", tipo: "moneda", etiqueta: "Prezzo di acquisto", min: 0, porDefecto: 200000 },
    {
      id: "venditore",
      tipo: "opcion",
      etiqueta: "Chi vende",
      opciones: [
        { valor: "privato", etiqueta: "Un privato (o un'impresa senza IVA)" },
        { valor: "impresa", etiqueta: "Un'impresa con IVA" },
      ],
      porDefecto: "privato",
    },
    { id: "primaCasa", tipo: "si-no", etiqueta: "Hai i requisiti per le agevolazioni prima casa?", porDefecto: true },
    {
      id: "rendita",
      tipo: "moneda",
      etiqueta: "Rendita catastale",
      ayuda: "Facoltativo, solo se compri da un privato: la trovi nella visura catastale. Con il prezzo-valore le imposte si calcolano sul valore catastale.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.prezzo <= 0) throw new ErrorEntrada("Inserisci un prezzo maggiore di zero.", "prezzo");
    const t = e.primaCasa ? v["it.imposte-prima-casa"] : v["it.imposte-altre-case"];
    if (e.venditore === "impresa") {
      const iva = redondear(porcentaje(e.prezzo, t.iva));
      return {
        base: e.prezzo,
        iva,
        registro: t["fissa-iva"],
        ipotecaria: t["fissa-iva"],
        catastale: t["fissa-iva"],
        totale: redondear(iva + 3 * t["fissa-iva"]),
        observaciones: ["Per le abitazioni di lusso (categorie A/1, A/8 e A/9) l'IVA è più alta e le agevolazioni prima casa non spettano."],
      };
    }
    const valoreCatastale = e.rendita ? redondear(e.rendita * (1 + t["rivalutazione-rendita"] / 100) * t.coefficiente) : null;
    const base = valoreCatastale ?? e.prezzo;
    const registro = redondear(Math.max(t["minimo-registro"], porcentaje(base, t.registro)));
    const observaciones: string[] = [];
    if (valoreCatastale !== null && valoreCatastale > e.prezzo) observaciones.push("Il valore catastale supera il prezzo: in questo caso il prezzo-valore non conviene.");
    if (valoreCatastale === null) observaciones.push("Se inserisci la rendita catastale puoi vedere le imposte con il prezzo-valore, di solito molto più basse.");
    return {
      base,
      iva: 0,
      registro,
      ipotecaria: t.ipotecaria,
      catastale: t.catastale,
      totale: redondear(registro + t.ipotecaria + t.catastale),
      observaciones,
    };
  },
  resultado: [
    { clave: "totale", etiqueta: "Imposte da pagare", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Base imponibile", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda", ocultarSiCero: true },
    { clave: "registro", etiqueta: "Imposta di registro", formato: "moneda" },
    { clave: "ipotecaria", etiqueta: "Imposta ipotecaria", formato: "moneda" },
    { clave: "catastale", etiqueta: "Imposta catastale", formato: "moneda" },
  ],
});
