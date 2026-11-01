import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cv.euro-escudo",
  mercado: "cv",
  concepto: "tipo-de-cambio",
  slug: "euro-escudo",
  estado: "borrador",
  requiere: {
    "cv.euro-paridade": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor a converter", min: 0, porDefecto: 100 },
    {
      id: "sentido",
      tipo: "opcion",
      etiqueta: "Conversão",
      porDefecto: "euro-escudo",
      opciones: [
        { valor: "euro-escudo", etiqueta: "De euros para escudos" },
        { valor: "escudo-euro", etiqueta: "De escudos para euros" },
      ],
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const paridade = valores["cv.euro-paridade"];
    const convertido = entrada.sentido === "euro-escudo" ? entrada.valor * paridade : entrada.valor / paridade;
    return { convertido: redondear(convertido), paridade };
  },
  resultado: [
    { clave: "convertido", etiqueta: "Valor convertido", formato: "numero", decimales: 2, destacada: true },
    { clave: "paridade", etiqueta: "Escudos por euro", formato: "numero", decimales: 3 },
  ],
});
