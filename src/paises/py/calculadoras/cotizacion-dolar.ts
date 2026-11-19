import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.cotizacion-dolar",
  mercado: "py",
  concepto: "tipo-de-cambio",
  slug: "cotizacion-dolar",
  estado: "publicado",
  requiere: {
    "py.dolar": "serie",
  },
  // La cotización del BCP tiene dos decimales y los dólares también; los guaraníes se muestran sin decimales.
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué querés convertir",
      opciones: [
        { valor: "a-guaranies", etiqueta: "De dólares a guaraníes" },
        { valor: "a-dolares", etiqueta: "De guaraníes a dólares" },
      ],
      porDefecto: "a-guaranies",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100 },
  ],
  calcular(entrada, valores, { redondear }) {
    const dolar = valores["py.dolar"];
    const aGuaranies = entrada.sentido === "a-guaranies";
    return {
      cotizacion: dolar.valor,
      fecha: dolar.fecha,
      guaranies: aGuaranies ? redondear(entrada.monto * dolar.valor) : null,
      dolares: aGuaranies ? null : redondear(entrada.monto / dolar.valor),
      observaciones: ["Es la cotización referencial del BCP: el promedio de las operaciones entre bancos de ese día. Bancos y casas de cambio compran y venden con su propio margen."],
    };
  },
  resultado: [
    { clave: "guaranies", etiqueta: "Equivale a", formato: "moneda", decimales: 0, destacada: true },
    { clave: "dolares", etiqueta: "Equivale a (dólares)", formato: "numero", decimales: 2, destacada: true },
    { clave: "cotizacion", etiqueta: "Dólar referencial del BCP", formato: "moneda", decimales: 2 },
    { clave: "fecha", etiqueta: "Fecha de la cotización", formato: "fecha" },
  ],
});
