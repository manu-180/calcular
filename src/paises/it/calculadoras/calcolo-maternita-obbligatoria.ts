import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.maternita",
  mercado: "it",
  concepto: "propio",
  slug: "calcolo-maternita-obbligatoria",
  estado: "publicado",
  requiere: {
    "it.maternita-indennita": "numero",
    "it.congedo-maternita": "numero",
  },
  campos: [
    { id: "retribuzione", tipo: "moneda", etiqueta: "Retribuzione lorda del mese prima del congedo", min: 0, porDefecto: 1800 },
    {
      id: "mensilita",
      tipo: "opcion",
      etiqueta: "Mensilità in un anno",
      ayuda: "Con 13 o 14 mensilità si aggiungono i ratei di tredicesima e quattordicesima.",
      opciones: [
        { valor: "13", etiqueta: "13 mensilità" },
        { valor: "14", etiqueta: "14 mensilità" },
        { valor: "12", etiqueta: "12 mensilità" },
      ],
      porDefecto: "13",
    },
    { id: "giorni", tipo: "entero", etiqueta: "Giorni di congedo", ayuda: "Cinque mesi sono circa 150 giorni.", min: 1, max: 400, porDefecto: 150 },
    { id: "integrazione", tipo: "si-no", etiqueta: "Il tuo contratto integra l'indennità fino al 100%?", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.giorni < 1) throw new ErrorEntrada("Inserisci almeno un giorno di congedo.", "giorni");
    const giornaliera = redondear((e.retribuzione * Number(e.mensilita)) / 12 / 30);
    const indennitaGiorno = redondear(porcentaje(giornaliera, v["it.maternita-indennita"]));
    const inps = redondear(indennitaGiorno * e.giorni);
    const datore = e.integrazione ? redondear((giornaliera - indennitaGiorno) * e.giorni) : 0;
    return {
      giornaliera,
      indennitaGiorno,
      inps,
      datore,
      totale: redondear(inps + datore),
      observaciones: [
        "È una stima lorda: l'INPS calcola la retribuzione media sul periodo di paga precedente al congedo, e l'indennità paga contributi e IRPEF come lo stipendio.",
      ],
    };
  },
  resultado: [
    { clave: "totale", etiqueta: "Totale per il congedo (lordo)", formato: "moneda", destacada: true },
    { clave: "inps", etiqueta: "Indennità INPS", formato: "moneda" },
    { clave: "datore", etiqueta: "Integrazione del datore di lavoro", formato: "moneda", ocultarSiCero: true },
    { clave: "giornaliera", etiqueta: "Retribuzione media giornaliera", formato: "moneda" },
    { clave: "indennitaGiorno", etiqueta: "Indennità al giorno", formato: "moneda" },
  ],
});
