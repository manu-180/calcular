import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "sv.colones-a-dolares",
  mercado: "sv",
  concepto: "propio",
  slug: "colones-a-dolares",
  estado: "publicado",
  requiere: {
    "sv.colones-por-dolar": "numero",
  },
  campos: [
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0 },
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quiere convertir",
      opciones: [
        { valor: "colones", etiqueta: "Colones a dólares" },
        { valor: "dolares", etiqueta: "Dólares a colones" },
      ],
      porDefecto: "colones",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const cambio = valores["sv.colones-por-dolar"];
    const desdeColones = entrada.direccion === "colones";
    return {
      colones: desdeColones ? entrada.monto : redondear(entrada.monto * cambio),
      dolares: desdeColones ? redondear(entrada.monto / cambio) : entrada.monto,
    };
  },
  resultado: [
    { clave: "colones", etiqueta: "Colones", formato: "numero", decimales: 2 },
    { clave: "dolares", etiqueta: "Dólares", formato: "moneda", destacada: true },
  ],
});
