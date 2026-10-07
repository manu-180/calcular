import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.tipo-de-cambio",
  mercado: "mx",
  concepto: "tipo-de-cambio",
  slug: "tipo-de-cambio",
  estado: "publicado",
  requiere: {
    "mx.dolar-fix": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "dolares-a-pesos", etiqueta: "Dólares a pesos" },
        { valor: "pesos-a-dolares", etiqueta: "Pesos a dólares" },
      ],
      porDefecto: "dolares-a-pesos",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tipo = valores["mx.dolar-fix"].valor;
    return {
      tipo,
      fecha: valores["mx.dolar-fix"].fecha,
      pesos: entrada.sentido === "dolares-a-pesos" ? redondear(entrada.cantidad * tipo) : null,
      dolares: entrada.sentido === "pesos-a-dolares" ? redondear(entrada.cantidad / tipo) : null,
      observaciones: ["Es el tipo de cambio oficial que se usa para pagar deudas en dólares dentro de México. En bancos y casas de cambio el precio es otro."],
    };
  },
  resultado: [
    { clave: "tipo", etiqueta: "Pesos por dólar", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Publicado en el DOF el", formato: "fecha" },
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Equivale a (dólares)", formato: "numero", decimales: 2, destacada: true },
  ],
});
