import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.ventajas-economicas",
  mercado: "gt",
  concepto: "propio",
  slug: "ventajas-economicas",
  estado: "publicado",
  requiere: {
    "gt.ventajas-economicas": "numero",
  },
  campos: [
    {
      id: "dinero",
      tipo: "moneda",
      etiqueta: "Salario que recibe en dinero",
      min: 0,
      ayuda: "Sin contar la comida, vivienda u otros beneficios que le da el patrono.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const parte = valores["gt.ventajas-economicas"];
    const total = redondear(entrada.dinero / (1 - parte / 100));
    return {
      parte,
      ventajas: redondear(total - entrada.dinero),
      total,
      observaciones: [
        "Aplica cuando recibe beneficios como vivienda, comida o vehículo y no se pactó cuánto valen.",
        "Ese salario total se usa para calcular la indemnización.",
      ],
    };
  },
  resultado: [
    { clave: "parte", etiqueta: "Parte del salario que son ventajas", formato: "porcentaje" },
    { clave: "ventajas", etiqueta: "Valor de las ventajas económicas", formato: "moneda" },
    { clave: "total", etiqueta: "Salario total", formato: "moneda", destacada: true },
  ],
});
