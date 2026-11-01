import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "si.tecaj-evra",
  mercado: "si",
  concepto: "tipo-de-cambio",
  slug: "tecaj-evra",
  estado: "publicado",
  requiere: { "si.tecaj-usd": "serie", "si.tecaj-gbp": "serie", "si.tecaj-chf": "serie" },
  campos: [
    { id: "znesek", tipo: "moneda", etiqueta: "Znesek", min: 0, porDefecto: 100 },
    {
      id: "valuta",
      tipo: "opcion",
      etiqueta: "Valuta",
      opciones: [
        { valor: "usd", etiqueta: "Ameriški dolar (USD)" },
        { valor: "gbp", etiqueta: "Britanski funt (GBP)" },
        { valor: "chf", etiqueta: "Švicarski frank (CHF)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Smer",
      opciones: [
        { valor: "izEvrov", etiqueta: "Iz evrov v valuto" },
        { valor: "vEvre", etiqueta: "Iz valute v evre" },
      ],
      porDefecto: "izEvrov",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.znesek <= 0) throw new ErrorEntrada("Vnesite znesek, večji od nič.", "znesek");
    const s = e.valuta === "usd" ? v["si.tecaj-usd"] : e.valuta === "gbp" ? v["si.tecaj-gbp"] : v["si.tecaj-chf"];
    return { rezultat: redondear(e.smer === "izEvrov" ? e.znesek * s.valor : e.znesek / s.valor), tecaj: s.valor };
  },
  resultado: [
    { clave: "rezultat", etiqueta: "Preračunani znesek", formato: "numero", decimales: 2, destacada: true },
    { clave: "tecaj", etiqueta: "Tečaj za 1 EUR", formato: "numero", decimales: 4 },
  ],
});
