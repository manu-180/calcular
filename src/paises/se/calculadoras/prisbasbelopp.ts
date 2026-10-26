import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "se.prisbasbelopp",
  mercado: "se",
  concepto: "conversor-unidad",
  slug: "prisbasbelopp",
  estado: "publicado",
  requiere: {
    "se.prisbasbelopp": "numero",
    "se.forhojt-prisbasbelopp": "numero",
    "se.inkomstbasbelopp": "numero",
  },
  campos: [
    { id: "antal", tipo: "numero", etiqueta: "Antal basbelopp", min: 0, porDefecto: 1 },
    {
      id: "typ",
      tipo: "opcion",
      etiqueta: "Basbelopp",
      opciones: [
        { valor: "pbb", etiqueta: "Prisbasbelopp" },
        { valor: "forhojt", etiqueta: "Förhöjt prisbasbelopp" },
        { valor: "ibb", etiqueta: "Inkomstbasbelopp" },
      ],
      porDefecto: "pbb",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.antal <= 0) throw new ErrorEntrada("Skriv hur många basbelopp du vill räkna om.", "antal");
    const bas = e.typ === "pbb" ? v["se.prisbasbelopp"] : e.typ === "forhojt" ? v["se.forhojt-prisbasbelopp"] : v["se.inkomstbasbelopp"];
    return { belopp: redondear(e.antal * bas), bas, perManad: redondear((e.antal * bas) / 12) };
  },
  resultado: [
    { clave: "belopp", etiqueta: "Belopp i kronor", formato: "moneda", destacada: true },
    { clave: "bas", etiqueta: "Ett basbelopp", formato: "moneda", decimales: 0 },
    { clave: "perManad", etiqueta: "Delat på tolv månader", formato: "moneda" },
  ],
});
