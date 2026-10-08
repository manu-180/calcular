import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.dolar-bcu",
  mercado: "uy",
  concepto: "tipo-de-cambio",
  slug: "dolar-bcu",
  estado: "publicado",
  requiere: {
    "uy.dolar": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué querés convertir",
      opciones: [
        { valor: "a-pesos", etiqueta: "De dólares a pesos" },
        { valor: "a-dolares", etiqueta: "De pesos a dólares" },
      ],
      porDefecto: "a-pesos",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const dolar = valores["uy.dolar"];
    const aPesos = entrada.sentido === "a-pesos";
    return {
      cotizacion: dolar.valor,
      fecha: dolar.fecha,
      pesos: aPesos ? redondear(entrada.monto * dolar.valor) : null,
      dolares: aPesos ? null : redondear(entrada.monto / dolar.valor),
      observaciones: ["Es la cotización oficial del BCU. Bancos y casas de cambio compran y venden con su propio margen."],
    };
  },
  resultado: [
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "dolares", etiqueta: "Equivale a (dólares)", formato: "numero", decimales: 2, destacada: true },
    { clave: "cotizacion", etiqueta: "Dólar BCU", formato: "moneda", decimales: 3 },
    { clave: "fecha", etiqueta: "Fecha de la cotización", formato: "fecha" },
  ],
});
