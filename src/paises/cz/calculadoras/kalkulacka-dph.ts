import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cz.kalkulacka-dph",
  mercado: "cz",
  concepto: "iva",
  slug: "kalkulacka-dph",
  estado: "publicado",
  requiere: { "cz.dph": "mapa" },
  campos: [
    { id: "castka", tipo: "moneda", etiqueta: "Částka", min: 0, porDefecto: 10000 },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Zadaná částka je",
      opciones: [
        { valor: "bez", etiqueta: "Bez DPH (DPH přičíst)" },
        { valor: "s", etiqueta: "S DPH (DPH vypočítat z ceny)" },
      ],
      porDefecto: "bez",
    },
    { id: "sazba", tipo: "opcion-dato", dato: "cz.dph", etiqueta: "Sazba DPH", porDefecto: "zakladni" },
  ],
  calcular(e, v, { redondear }) {
    if (e.castka <= 0) throw new ErrorEntrada("Zadejte částku vyšší než nula.", "castka");
    const sazba = enMapa(v["cz.dph"], e.sazba);
    let zaklad: number;
    let dph: number;
    if (e.smer === "bez") {
      zaklad = redondear(e.castka);
      dph = redondear((zaklad * sazba) / 100);
    } else {
      zaklad = redondear(e.castka / (1 + sazba / 100));
      dph = redondear(e.castka - zaklad);
    }
    return {
      zaklad,
      dph,
      celkem: redondear(zaklad + dph),
      sazba,
      observaciones: e.smer === "s" ? [`Podle § 37 zákona o DPH je daň rozdíl mezi cenou s DPH a touto cenou vydělenou koeficientem ${String(1 + sazba / 100).replace(".", ",")}.`] : [],
    };
  },
  resultado: [
    { clave: "celkem", etiqueta: "Cena s DPH", formato: "moneda", destacada: true },
    { clave: "zaklad", etiqueta: "Základ daně (bez DPH)", formato: "moneda" },
    { clave: "dph", etiqueta: "DPH", formato: "moneda" },
    { clave: "sazba", etiqueta: "Sazba", formato: "porcentaje", decimales: 0 },
  ],
});
