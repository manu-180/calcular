import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.cotizacion-peso-argentino",
  mercado: "py",
  concepto: "propio",
  slug: "cotizacion-peso-argentino",
  estado: "publicado",
  requiere: {
    "py.peso-argentino": "serie",
  },
  // La cotización del BCP tiene dos decimales y el monto en moneda extranjera también; los guaraníes se muestran sin decimales.
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  campos: [
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Qué querés convertir",
      opciones: [
        { valor: "a-guaranies", etiqueta: "De pesos argentinos a guaraníes" },
        { valor: "a-moneda", etiqueta: "De guaraníes a pesos argentinos" },
      ],
      porDefecto: "a-guaranies",
    },
    { id: "monto", tipo: "numero", etiqueta: "Monto", min: 0, porDefecto: 100000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const cotizacion = valores["py.peso-argentino"];
    const aGuaranies = entrada.sentido === "a-guaranies";
    return {
      cotizacion: cotizacion.valor,
      fecha: cotizacion.fecha,
      guaranies: aGuaranies ? redondear(entrada.monto * cotizacion.valor) : null,
      moneda: aGuaranies ? null : redondear(entrada.monto / cotizacion.valor),
      observaciones: ["Es la cotización referencial del BCP en guaraníes. Bancos y casas de cambio compran y venden con su propio margen."],
    };
  },
  resultado: [
    { clave: "guaranies", etiqueta: "Equivale a", formato: "moneda", decimales: 0, destacada: true },
    { clave: "moneda", etiqueta: "Equivale a (pesos argentinos)", formato: "numero", decimales: 2, destacada: true },
    { clave: "cotizacion", etiqueta: "Cotización referencial del BCP", formato: "moneda", decimales: 2 },
    { clave: "fecha", etiqueta: "Fecha de la cotización", formato: "fecha" },
  ],
});
