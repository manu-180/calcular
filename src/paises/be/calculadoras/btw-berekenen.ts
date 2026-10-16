import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "be.btw-berekenen",
  mercado: "be",
  concepto: "iva",
  slug: "btw-berekenen",
  estado: "publicado",
  requiere: {
    "be.btw-standaard": "numero",
    "be.btw-tussen": "numero",
    "be.btw-verlaagd": "numero",
  },
  campos: [
    { id: "bedrag", tipo: "moneda", etiqueta: "Bedrag", min: 0, porDefecto: 100 },
    {
      id: "richting",
      tipo: "opcion",
      etiqueta: "Wat wil je berekenen?",
      opciones: [
        { valor: "erbij", etiqueta: "Btw erbij tellen (het bedrag is exclusief btw)" },
        { valor: "eraf", etiqueta: "Btw eruit halen (het bedrag is inclusief btw)" },
      ],
      porDefecto: "erbij",
    },
    {
      id: "tarief",
      tipo: "opcion",
      etiqueta: "Btw-tarief",
      opciones: [
        { valor: "standaard", etiqueta: "Standaardtarief (de meeste goederen en diensten)" },
        { valor: "tussen", etiqueta: "Tussentarief" },
        { valor: "verlaagd", etiqueta: "Verlaagd tarief" },
        { valor: "nul", etiqueta: "Nultarief" },
      ],
      porDefecto: "standaard",
    },
  ],
  calcular(entrada, v, { redondear }) {
    const tarief =
      entrada.tarief === "standaard" ? v["be.btw-standaard"] : entrada.tarief === "tussen" ? v["be.btw-tussen"] : entrada.tarief === "verlaagd" ? v["be.btw-verlaagd"] : 0;
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
