import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

const NAZVY = { eur: "euro (EUR)", usd: "americký dolar (USD)", gbp: "britská libra (GBP)", chf: "švýcarský frank (CHF)", pln: "polský zlotý (PLN)" } as const;

export default definirCalculadora({
  id: "cz.kurzova-kalkulacka",
  mercado: "cz",
  concepto: "tipo-de-cambio",
  slug: "kurzova-kalkulacka",
  estado: "publicado",
  requiere: {
    "cz.eur": "serie",
    "cz.usd": "serie",
    "cz.gbp": "serie",
    "cz.chf": "serie",
    "cz.pln": "serie",
  },
  campos: [
    {
      id: "mena",
      tipo: "opcion",
      etiqueta: "Měna",
      opciones: [
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "usd", etiqueta: "Americký dolar (USD)" },
        { valor: "gbp", etiqueta: "Britská libra (GBP)" },
        { valor: "chf", etiqueta: "Švýcarský frank (CHF)" },
        { valor: "pln", etiqueta: "Polský zlotý (PLN)" },
      ],
      porDefecto: "eur",
    },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Převést",
      opciones: [
        { valor: "na-czk", etiqueta: "Z cizí měny na koruny" },
        { valor: "z-czk", etiqueta: "Z korun na cizí měnu" },
      ],
      porDefecto: "na-czk",
    },
    { id: "castka", tipo: "numero", etiqueta: "Částka", min: 0, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.castka <= 0) throw new ErrorEntrada("Zadejte částku vyšší než nula.", "castka");
    const { valor, fecha } = v[`cz.${e.mena}`];
    const naCzk = e.smer === "na-czk";
    return {
      vysledek: redondear(naCzk ? e.castka * valor : e.castka / valor),
      mena: naCzk ? "česká koruna (CZK)" : NAZVY[e.mena],
      kurz: valor,
      opacny: 1 / valor,
      fecha,
      observaciones: ["Jde o kurz devizového trhu vyhlášený ČNB. Banky a směnárny nakupují a prodávají za vlastní kurzy s přirážkou."],
    };
  },
  resultado: [
    { clave: "vysledek", etiqueta: "Po převodu", formato: "numero", decimales: 2, destacada: true },
    { clave: "mena", etiqueta: "Měna výsledku", formato: "texto" },
    { clave: "kurz", etiqueta: "Kurz ČNB (Kč za 1 jednotku)", formato: "numero", decimales: 3 },
    { clave: "opacny", etiqueta: "Kolik cizí měny za 1 Kč", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Datum kurzu", formato: "fecha" },
  ],
});
