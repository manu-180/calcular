import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.trm",
  mercado: "co",
  concepto: "tipo-de-cambio",
  slug: "trm",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: {
    "co.trm": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "usd-a-cop", etiqueta: "Dólares a pesos" },
        { valor: "cop-a-usd", etiqueta: "Pesos a dólares" },
      ],
      porDefecto: "usd-a-cop",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fecha, valor } = valores["co.trm"];
    if (entrada.direccion === "usd-a-cop") return { trm: valor, fecha, pesos: redondear(entrada.monto * valor), dolares: null };
    return { trm: valor, fecha, pesos: null, dolares: redondear(entrada.monto / valor) };
  },
  resultado: [
    { clave: "trm", etiqueta: "TRM vigente", formato: "moneda", decimales: 2 },
    { clave: "fecha", etiqueta: "Vigente desde", formato: "fecha" },
    { clave: "pesos", etiqueta: "Valor en pesos", formato: "moneda", decimales: 2, destacada: true },
    { clave: "dolares", etiqueta: "Valor en dólares", formato: "numero", decimales: 2, destacada: true },
  ],
});
