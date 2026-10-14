import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.btw-berekenen",
  mercado: "nl",
  concepto: "iva",
  slug: "btw-berekenen",
  estado: "publicado",
  requiere: {
    "nl.btw-hoog": "numero",
    "nl.btw-laag": "numero",
  },
  campos: [
    { id: "bedrag", tipo: "moneda", etiqueta: "Bedrag", min: 0, porDefecto: 100 },
    {
      id: "richting",
      tipo: "opcion",
      etiqueta: "Wat wil je berekenen?",
      opciones: [
        { valor: "erbij", etiqueta: "Btw erbij optellen (het bedrag is exclusief btw)" },
        { valor: "eraf", etiqueta: "Btw eruit halen (het bedrag is inclusief btw)" },
      ],
      porDefecto: "erbij",
    },
    {
      id: "tarief",
      tipo: "opcion",
      etiqueta: "Btw-tarief",
      opciones: [
        { valor: "hoog", etiqueta: "Algemeen tarief (de meeste goederen en diensten)" },
        { valor: "laag", etiqueta: "Verlaagd tarief (onder meer voedingsmiddelen, water, geneesmiddelen en boeken)" },
        { valor: "nul", etiqueta: "0% (vooral export en levering aan het buitenland)" },
      ],
      porDefecto: "hoog",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tarief = entrada.tarief === "hoog" ? valores["nl.btw-hoog"] : entrada.tarief === "laag" ? valores["nl.btw-laag"] : 0;
    const exclusief = entrada.richting === "erbij" ? entrada.bedrag : redondear(entrada.bedrag / (1 + tarief / 100));
    const btw = entrada.richting === "erbij" ? redondear(porcentaje(exclusief, tarief)) : redondear(entrada.bedrag - exclusief);
    return { tarief, exclusief, btw, inclusief: redondear(exclusief + btw) };
  },
  resultado: [
    { clave: "btw", etiqueta: "Btw", formato: "moneda", destacada: true },
    { clave: "exclusief", etiqueta: "Bedrag exclusief btw", formato: "moneda" },
    { clave: "inclusief", etiqueta: "Bedrag inclusief btw", formato: "moneda" },
    { clave: "tarief", etiqueta: "Btw-tarief", formato: "porcentaje" },
  ],
});
