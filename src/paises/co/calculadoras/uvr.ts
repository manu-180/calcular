import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.uvr",
  mercado: "co",
  concepto: "propio",
  slug: "uvr",
  estado: "publicado",
  redondeo: { decimales: 4, modo: "mitad-arriba" },
  requiere: {
    "co.uvr": "serie",
  },
  campos: [
    {
      id: "direccion",
      tipo: "opcion",
      etiqueta: "Qué quieres convertir",
      opciones: [
        { valor: "uvr-a-pesos", etiqueta: "UVR a pesos" },
        { valor: "pesos-a-uvr", etiqueta: "Pesos a UVR" },
      ],
      porDefecto: "uvr-a-pesos",
    },
    { id: "cantidad", tipo: "numero", etiqueta: "Cantidad", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const { fecha, valor } = valores["co.uvr"];
    if (entrada.direccion === "uvr-a-pesos") return { uvr: valor, fecha, pesos: redondear(entrada.cantidad * valor), uvrs: null };
    return { uvr: valor, fecha, pesos: null, uvrs: redondear(entrada.cantidad / valor) };
  },
  resultado: [
    { clave: "uvr", etiqueta: "Valor de la UVR del día", formato: "numero", decimales: 4 },
    { clave: "fecha", etiqueta: "Fecha del valor", formato: "fecha" },
    { clave: "pesos", etiqueta: "Valor en pesos", formato: "moneda", decimales: 2, destacada: true },
    { clave: "uvrs", etiqueta: "Valor en UVR", formato: "numero", decimales: 4, destacada: true },
  ],
});
