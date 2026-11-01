import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "me.kalkulator-pdv",
  mercado: "me",
  concepto: "iva",
  slug: "kalkulator-pdv",
  estado: "publicado",
  requiere: { "me.pdv-opsta": "numero", "me.pdv-snizena-15": "numero", "me.pdv-snizena-7": "numero", "me.pdv-limit": "numero" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 100 },
    {
      id: "stopa",
      tipo: "opcion",
      etiqueta: "Stopa PDV",
      opciones: [
        { valor: "s21", etiqueta: "Standardna stopa" },
        { valor: "s15", etiqueta: "Snižena: smještaj, hrana i piće u ugostiteljstvu" },
        { valor: "s7", etiqueta: "Snižena: ostali proizvodi i usluge iz zakona" },
      ],
      porDefecto: "s21",
    },
    {
      id: "smjer",
      tipo: "opcion",
      etiqueta: "Iznos koji ste unijeli",
      opciones: [
        { valor: "bez", etiqueta: "Bez PDV, dodaj porez" },
        { valor: "sa", etiqueta: "Sa PDV, izdvoji porez" },
      ],
      porDefecto: "bez",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const stopa = e.stopa === "s21" ? v["me.pdv-opsta"] : e.stopa === "s15" ? v["me.pdv-snizena-15"] : v["me.pdv-snizena-7"];
    const osnovica = e.smjer === "bez" ? e.iznos : redondear(e.iznos / (1 + stopa / 100));
    const pdv = e.smjer === "bez" ? redondear((e.iznos * stopa) / 100) : redondear(e.iznos - osnovica);
    return { pdv, osnovica, ukupno: redondear(osnovica + pdv), stopa };
  },
  resultado: [
    { clave: "pdv", etiqueta: "Iznos PDV", formato: "moneda", destacada: true },
    { clave: "osnovica", etiqueta: "Osnovica bez PDV", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Ukupno sa PDV", formato: "moneda" },
    { clave: "stopa", etiqueta: "Stopa", formato: "porcentaje", decimales: 0 },
  ],
});
