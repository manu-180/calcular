import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.udis",
  mercado: "mx",
  concepto: "propio",
  slug: "udis",
  estado: "publicado",
  requiere: {
    "mx.udis": "serie",
  },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "udis-a-pesos", etiqueta: "UDIS a pesos" },
        { valor: "pesos-a-udis", etiqueta: "Pesos a UDIS" },
      ],
      porDefecto: "udis-a-pesos",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const udi = valores["mx.udis"].valor;
    return {
      udi,
      fecha: valores["mx.udis"].fecha,
      pesos: entrada.sentido === "udis-a-pesos" ? redondear(entrada.cantidad * udi) : null,
      udis: entrada.sentido === "pesos-a-udis" ? entrada.cantidad / udi : null,
    };
  },
  resultado: [
    { clave: "udi", etiqueta: "Valor de una UDI", formato: "numero", decimales: 6 },
    { clave: "fecha", etiqueta: "Fecha del valor", formato: "fecha" },
    { clave: "pesos", etiqueta: "Equivale a", formato: "moneda", destacada: true },
    { clave: "udis", etiqueta: "Equivale a (UDIS)", formato: "numero", decimales: 4, destacada: true },
  ],
});
