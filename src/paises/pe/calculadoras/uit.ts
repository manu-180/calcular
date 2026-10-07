import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.conversor-uit",
  mercado: "pe",
  concepto: "conversor-unidad",
  slug: "uit",
  estado: "publicado",
  requiere: {
    "pe.uit": "numero",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "uit-a-soles", etiqueta: "UIT a soles" },
        { valor: "soles-a-uit", etiqueta: "Soles a UIT" },
      ],
      porDefecto: "uit-a-soles",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const uit = valores["pe.uit"];
    const soles = entrada.direccion === "uit-a-soles" ? redondear(entrada.cantidad * uit) : redondear(entrada.cantidad);
    const uits = entrada.direccion === "uit-a-soles" ? entrada.cantidad : entrada.cantidad / uit;
    return { uit, soles, uits };
  },
  resultado: [
    { clave: "soles", etiqueta: "En soles", formato: "moneda", destacada: true },
    { clave: "uits", etiqueta: "En UIT", formato: "numero", decimales: 4 },
    { clave: "uit", etiqueta: "Valor de 1 UIT", formato: "moneda" },
  ],
});
