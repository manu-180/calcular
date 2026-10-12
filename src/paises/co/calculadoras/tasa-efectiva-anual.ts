import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.tasa-efectiva-anual",
  mercado: "co",
  concepto: "propio",
  slug: "tasa-efectiva-anual",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa", min: 0, max: 1000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de tasa que tienes",
      opciones: [
        { valor: "ea", etiqueta: "Efectiva anual (E.A.)" },
        { valor: "mv", etiqueta: "Mensual vencida (M.V.)" },
        { valor: "nmv", etiqueta: "Nominal anual mes vencido (N.M.V.)" },
      ],
      porDefecto: "ea",
    },
  ],
  calcular(entrada) {
    const t = entrada.tasa / 100;
    const mensual = entrada.tipo === "ea" ? (1 + t) ** (1 / 12) - 1 : entrada.tipo === "mv" ? t : t / 12;
    const ea = (1 + mensual) ** 12 - 1;
    return {
      ea: ea * 100,
      mensual: mensual * 100,
      nominal: mensual * 12 * 100,
      diaria: ((1 + ea) ** (1 / 365) - 1) * 100,
    };
  },
  resultado: [
    { clave: "ea", etiqueta: "Tasa efectiva anual (E.A.)", formato: "porcentaje", decimales: 4, destacada: true },
    { clave: "mensual", etiqueta: "Tasa mensual vencida (M.V.)", formato: "porcentaje", decimales: 4 },
    { clave: "nominal", etiqueta: "Tasa nominal anual mes vencido (N.M.V.)", formato: "porcentaje", decimales: 4 },
    { clave: "diaria", etiqueta: "Tasa efectiva diaria", formato: "porcentaje", decimales: 6 },
  ],
});
