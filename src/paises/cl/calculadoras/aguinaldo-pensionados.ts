import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.aguinaldo-pensionados",
  mercado: "cl",
  concepto: "propio",
  slug: "aguinaldo-pensionados",
  estado: "publicado",
  requiere: {
    "cl.aguinaldo-fiestas-patrias-pensionados": "mapa",
    "cl.aguinaldo-navidad-pensionados": "mapa",
  },
  campos: [
    {
      id: "aguinaldo",
      tipo: "opcion",
      etiqueta: "Aguinaldo",
      opciones: [
        { valor: "navidad", etiqueta: "Navidad 2026" },
        { valor: "fiestas-patrias", etiqueta: "Fiestas Patrias 2026" },
      ],
      porDefecto: "navidad",
    },
    { id: "cargas", tipo: "entero", etiqueta: "Cargas familiares acreditadas", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, valores) {
    const montos = entrada.aguinaldo === "navidad" ? valores["cl.aguinaldo-navidad-pensionados"] : valores["cl.aguinaldo-fiestas-patrias-pensionados"];
    const base = enMapa(montos, "base");
    const porCarga = enMapa(montos, "por-carga");
    return {
      base,
      porCarga,
      incremento: porCarga * entrada.cargas,
      total: base + porCarga * entrada.cargas,
      fechaCorte: entrada.aguinaldo === "navidad" ? "30 de noviembre de 2026" : "31 de agosto de 2026",
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Aguinaldo total", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Monto base", formato: "moneda" },
    { clave: "porCarga", etiqueta: "Aumento por cada carga", formato: "moneda" },
    { clave: "incremento", etiqueta: "Aumento por tus cargas", formato: "moneda", ocultarSiCero: true },
    { clave: "fechaCorte", etiqueta: "Tienes que ser pensionado al", formato: "texto" },
  ],
});
