import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rs.kalkulator-pdv",
  mercado: "rs",
  concepto: "iva",
  slug: "kalkulator-pdv",
  estado: "publicado",
  requiere: { "rs.pdv-opsta": "numero", "rs.pdv-posebna": "numero", "rs.pdv-limit-prometa": "numero" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 1000 },
    {
      id: "stopa",
      tipo: "opcion",
      etiqueta: "Stopa PDV",
      opciones: [
        { valor: "opsta", etiqueta: "Opšta stopa" },
        { valor: "posebna", etiqueta: "Posebna stopa" },
      ],
      porDefecto: "opsta",
    },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Iznos koji ste uneli",
      opciones: [
        { valor: "bez", etiqueta: "Bez PDV, dodaj PDV" },
        { valor: "sa", etiqueta: "Sa PDV, izdvoji PDV" },
      ],
      porDefecto: "bez",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const stopa = e.stopa === "opsta" ? v["rs.pdv-opsta"] : v["rs.pdv-posebna"];
    const osnovica = e.smer === "bez" ? e.iznos : redondear(e.iznos / (1 + stopa / 100));
    const pdv = e.smer === "bez" ? redondear((e.iznos * stopa) / 100) : redondear(e.iznos - osnovica);
    return { pdv, osnovica, ukupno: redondear(osnovica + pdv), stopa };
  },
  resultado: [
    { clave: "pdv", etiqueta: "Iznos PDV", formato: "moneda", destacada: true },
    { clave: "osnovica", etiqueta: "Osnovica bez PDV", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Ukupno sa PDV", formato: "moneda" },
    { clave: "stopa", etiqueta: "Stopa", formato: "porcentaje", decimales: 0 },
  ],
});
