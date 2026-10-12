import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.propina-legal",
  mercado: "do",
  concepto: "propio",
  slug: "propina-legal",
  estado: "publicado",
  requiere: {
    "do.propina-legal": "numero",
    "do.itbis": "numero",
  },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "Qué monto tienes",
      opciones: [
        { valor: "consumo", etiqueta: "El consumo, sin impuestos" },
        { valor: "total", etiqueta: "El total de la cuenta" },
      ],
      porDefecto: "consumo",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaPropina = valores["do.propina-legal"];
    const tasaItbis = valores["do.itbis"];
    const consumo = entrada.modo === "total" ? redondear((entrada.monto * 100) / (100 + tasaItbis + tasaPropina)) : entrada.monto;
    const itbis = redondear(porcentaje(consumo, tasaItbis));
    const propina = redondear(porcentaje(consumo, tasaPropina));
    return {
      consumo,
      itbis,
      propina,
      total: redondear(consumo + itbis + propina),
      observaciones: [
        "La propina legal se calcula sobre el consumo, sin el ITBIS, que es como aparece en la factura.",
        "Es obligatoria en hoteles, restaurantes, cafés y bares, y se reparte entre el personal. Lo que dejes aparte es voluntario.",
      ],
    };
  },
  resultado: [
    { clave: "consumo", etiqueta: "Consumo", formato: "moneda" },
    { clave: "itbis", etiqueta: "ITBIS", formato: "moneda" },
    { clave: "propina", etiqueta: "Propina legal", formato: "moneda" },
    { clave: "total", etiqueta: "Total de la cuenta", formato: "moneda", destacada: true },
  ],
});
