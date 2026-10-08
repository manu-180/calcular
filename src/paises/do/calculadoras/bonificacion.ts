import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.bonificacion",
  mercado: "do",
  concepto: "reparto-utilidades",
  slug: "bonificacion",
  estado: "publicado",
  requiere: {
    "do.bonificacion-dias-tope": "mapa",
    "do.divisor-salario-diario": "numero",
    "do.participacion-beneficios": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual ordinario",
      ayuda: "Si tu salario cambió durante el año, pon el promedio. Sin horas extra.",
      min: 0,
    },
    {
      id: "antiguedad",
      tipo: "opcion",
      etiqueta: "Tiempo en la empresa",
      opciones: [
        { valor: "menos-de-tres-anios", etiqueta: "Menos de 3 años" },
        { valor: "tres-anios-o-mas", etiqueta: "3 años o más" },
      ],
      porDefecto: "menos-de-tres-anios",
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados en el año fiscal de la empresa",
      ayuda: "Si trabajaste todo el año, deja 12.",
      min: 0,
      max: 12,
      porDefecto: 12,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses > 12) throw new ErrorEntrada("Un año fiscal tiene 12 meses como máximo.", "meses");
    const promedio = (entrada.salario * entrada.meses) / 12;
    const diario = promedio / valores["do.divisor-salario-diario"];
    const dias = enMapa(valores["do.bonificacion-dias-tope"], entrada.antiguedad);
    return {
      diario: redondear(diario),
      dias,
      maximo: redondear(diario * dias),
      observaciones: [
        "Es lo máximo que puedes cobrar. Si las utilidades de la empresa no alcanzan para pagar el máximo a todos, se reparte lo que hay en la misma proporción.",
        "Si la empresa no tuvo utilidades, no hay bonificación. Las empresas de zonas francas y algunas agrícolas e industriales nuevas no la pagan.",
      ],
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario promedio", formato: "moneda" },
    { clave: "dias", etiqueta: "Días de salario del tope", formato: "dias" },
    { clave: "maximo", etiqueta: "Bonificación máxima", formato: "moneda", destacada: true },
  ],
});
