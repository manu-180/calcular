import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.intereses-cesantias",
  mercado: "co",
  concepto: "propio",
  slug: "intereses-cesantias",
  estado: "publicado",
  requiere: {
    "co.intereses-cesantias": "numero",
  },
  campos: [
    {
      id: "cesantias",
      tipo: "moneda",
      etiqueta: "Cesantías del año",
      ayuda: "Lo que te liquidaron de cesantías por el año (o por el tiempo que trabajaste).",
      min: 0,
    },
    {
      id: "dias",
      tipo: "entero",
      etiqueta: "Días trabajados en el año",
      ayuda: "El año completo son 360 días (meses de 30 días).",
      min: 1,
      max: 360,
      porDefecto: 360,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1 || entrada.dias > 360) throw new ErrorEntrada("Un año tiene entre 1 y 360 días.", "dias");
    const tasa = valores["co.intereses-cesantias"];
    const tasaProporcional = (tasa * entrada.dias) / 360;
    const intereses = redondear(porcentaje(entrada.cesantias, tasaProporcional));
    return { tasaProporcional, intereses };
  },
  resultado: [
    { clave: "tasaProporcional", etiqueta: "Tasa que te corresponde por los días trabajados", formato: "porcentaje", decimales: 2 },
    { clave: "intereses", etiqueta: "Intereses sobre las cesantías", formato: "moneda", decimales: 0, destacada: true },
  ],
});
