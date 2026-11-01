import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.kurzova-kalkulacka",
  mercado: "sk",
  concepto: "tipo-de-cambio",
  slug: "kurzova-kalkulacka",
  estado: "publicado",
  requiere: { "sk.usd": "serie", "sk.czk": "serie", "sk.gbp": "serie", "sk.huf": "serie", "sk.pln": "serie", "sk.chf": "serie" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 100 },
    {
      id: "mena",
      tipo: "opcion",
      etiqueta: "Mena",
      porDefecto: "usd",
      opciones: [
        { valor: "usd", etiqueta: "Americký dolár (USD)" },
        { valor: "czk", etiqueta: "Česká koruna (CZK)" },
        { valor: "gbp", etiqueta: "Britská libra (GBP)" },
        { valor: "huf", etiqueta: "Maďarský forint (HUF)" },
        { valor: "pln", etiqueta: "Poľský zlotý (PLN)" },
        { valor: "chf", etiqueta: "Švajčiarsky frank (CHF)" },
      ],
    },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Smer",
      porDefecto: "zEur",
      opciones: [
        { valor: "zEur", etiqueta: "Z eur do zvolenej meny" },
        { valor: "naEur", etiqueta: "Zo zvolenej meny na eurá" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Zadajte sumu vyššiu ako nula.", "suma");
    const kurzy = { usd: v["sk.usd"], czk: v["sk.czk"], gbp: v["sk.gbp"], huf: v["sk.huf"], pln: v["sk.pln"], chf: v["sk.chf"] } as const;
    const k = kurzy[e.mena];
    return {
      vysledok: redondear(e.smer === "zEur" ? e.suma * k.valor : e.suma / k.valor),
      kurz: k.valor,
      datum: k.fecha,
      mena: e.smer === "zEur" ? e.mena.toUpperCase() : "EUR",
    };
  },
  resultado: [
    { clave: "vysledok", etiqueta: "Výsledná suma", formato: "numero", decimales: 2, destacada: true },
    { clave: "mena", etiqueta: "Mena výsledku", formato: "texto" },
    { clave: "kurz", etiqueta: "Kurz za 1 euro", formato: "numero", decimales: 4 },
    { clave: "datum", etiqueta: "Dátum kurzu", formato: "fecha" },
  ],
});
