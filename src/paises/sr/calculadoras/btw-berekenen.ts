import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sr.btw-berekenen",
  mercado: "sr",
  concepto: "iva",
  slug: "btw-berekenen",
  estado: "publicado",
  requiere: {
    "sr.btw-algemeen": "numero",
    "sr.btw-verlaagd": "numero",
    "sr.btw-verhoogd": "numero",
  },
  campos: [
    { id: "bedrag", tipo: "moneda", etiqueta: "Bedrag", min: 0, porDefecto: 1000 },
    {
      id: "richting",
      tipo: "opcion",
      etiqueta: "Wat wil je berekenen?",
      opciones: [
        { valor: "erbij", etiqueta: "Btw erbij optellen (het bedrag is zonder btw)" },
        { valor: "eraf", etiqueta: "Btw eruit halen (het bedrag is inclusief btw)" },
      ],
      porDefecto: "erbij",
    },
    {
      id: "tarief",
      tipo: "opcion",
      etiqueta: "Btw-tarief",
      opciones: [
        { valor: "algemeen", etiqueta: "Algemeen tarief (de meeste goederen en diensten)" },
        { valor: "verlaagd", etiqueta: "Verlaagd tarief (onder meer water, elektriciteit, kookgas en brandstof)" },
        { valor: "verhoogd", etiqueta: "Verhoogd tarief (onder meer zware auto's, vuurwapens en vuurwerk)" },
        { valor: "nul", etiqueta: "0% (onder meer export)" },
      ],
      porDefecto: "algemeen",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tarief =
      entrada.tarief === "algemeen"
        ? valores["sr.btw-algemeen"]
        : entrada.tarief === "verlaagd"
          ? valores["sr.btw-verlaagd"]
          : entrada.tarief === "verhoogd"
            ? valores["sr.btw-verhoogd"]
            : 0;
    const zonder = entrada.richting === "erbij" ? entrada.bedrag : redondear(entrada.bedrag / (1 + tarief / 100));
    const btw = entrada.richting === "erbij" ? redondear(porcentaje(zonder, tarief)) : redondear(entrada.bedrag - zonder);
    return { btw, zonder, met: redondear(zonder + btw), tarief };
  },
  resultado: [
    { clave: "btw", etiqueta: "Btw", formato: "moneda", destacada: true },
    { clave: "zonder", etiqueta: "Bedrag zonder btw", formato: "moneda" },
    { clave: "met", etiqueta: "Bedrag inclusief btw", formato: "moneda" },
    { clave: "tarief", etiqueta: "Btw-tarief", formato: "porcentaje" },
  ],
});
