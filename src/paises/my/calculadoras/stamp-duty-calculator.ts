import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "my.stamp-duty-calculator",
  mercado: "my",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "my.stamp-duty-transfer": "escala",
    "my.stamp-duty-foreign": "numero",
    "my.stamp-duty-foreign-residential": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Property price or market value, whichever is higher", min: 0, porDefecto: 500000 },
    {
      id: "comprador",
      tipo: "opcion",
      etiqueta: "Who is buying",
      opciones: [
        { valor: "local", etiqueta: "Malaysian citizen, permanent resident or local company" },
        { valor: "foreign-residential", etiqueta: "Foreigner or foreign company, residential property" },
        { valor: "foreign-other", etiqueta: "Foreigner or foreign company, other property" },
      ],
      porDefecto: "local",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the property value.", "valor");
    // La duty es «por cada RM100 o fracción»: el valor se lleva al múltiplo de 100 siguiente.
    const base = Math.ceil(entrada.valor / 100) * 100;
    const duty =
      entrada.comprador === "local"
        ? aplicarEscalaMarginal(v["my.stamp-duty-transfer"], base)
        : (base * (entrada.comprador === "foreign-residential" ? v["my.stamp-duty-foreign-residential"] : v["my.stamp-duty-foreign"])) / 100;
    return {
      duty: redondear(duty),
      efectiva: (duty / entrada.valor) * 100,
      total: redondear(entrada.valor + duty),
    };
  },
  resultado: [
    { clave: "duty", etiqueta: "Stamp duty on the transfer (MOT)", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Effective rate", formato: "porcentaje", decimales: 2 },
    { clave: "total", etiqueta: "Price plus stamp duty", formato: "moneda" },
  ],
});
