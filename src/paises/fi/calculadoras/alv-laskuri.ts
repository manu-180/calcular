import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "fi.alv-laskuri",
  mercado: "fi",
  concepto: "iva",
  slug: "alv-laskuri",
  estado: "publicado",
  requiere: { "fi.alv": "mapa" },
  campos: [
    {
      id: "suunta",
      tipo: "opcion",
      etiqueta: "Mitä haluat laskea",
      opciones: [
        { valor: "lisaa", etiqueta: "Lisää alv verottomaan hintaan" },
        { valor: "poista", etiqueta: "Poista alv verollisesta hinnasta" },
      ],
      porDefecto: "lisaa",
    },
    { id: "summa", tipo: "moneda", etiqueta: "Hinta", min: 0, porDefecto: 100 },
    { id: "verokanta", tipo: "opcion-dato", dato: "fi.alv", etiqueta: "Verokanta", porDefecto: "yleinen" },
  ],
  calcular(e, v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Syötä hinta, joka on suurempi kuin nolla.", "summa");
    const kanta = enMapa(v["fi.alv"], e.verokanta);
    const veroton = e.suunta === "lisaa" ? e.summa : e.summa / (1 + kanta / 100);
    const vero = redondear((veroton * kanta) / 100);
    const verotonPyoristetty = e.suunta === "lisaa" ? redondear(e.summa) : redondear(e.summa - vero);
    return {
      veroton: verotonPyoristetty,
      vero,
      verollinen: e.suunta === "lisaa" ? redondear(e.summa + vero) : redondear(e.summa),
      kanta,
    };
  },
  resultado: [
    { clave: "verollinen", etiqueta: "Verollinen hinta", formato: "moneda", destacada: true },
    { clave: "veroton", etiqueta: "Veroton hinta", formato: "moneda" },
    { clave: "vero", etiqueta: "Arvonlisävero", formato: "moneda" },
    { clave: "kanta", etiqueta: "Verokanta", formato: "porcentaje", decimales: 1 },
  ],
});
