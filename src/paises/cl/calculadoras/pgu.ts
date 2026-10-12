import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.pgu",
  mercado: "cl",
  concepto: "propio",
  slug: "pgu",
  estado: "publicado",
  requiere: {
    "cl.pgu-maxima": "mapa",
    "cl.pgu-pension-inferior": "numero",
    "cl.pgu-pension-superior": "numero",
  },
  campos: [
    { id: "edad", tipo: "opcion-dato", etiqueta: "Tu edad", dato: "cl.pgu-maxima" },
    {
      id: "pensionBase",
      tipo: "moneda",
      etiqueta: "Tu pensión base",
      ayuda: "Tu pensión autofinanciada más otras pensiones que recibas (sobrevivencia, IPS). Si no tienes pensión, deja 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const maxima = enMapa(valores["cl.pgu-maxima"], entrada.edad);
    const inferior = valores["cl.pgu-pension-inferior"];
    const superior = valores["cl.pgu-pension-superior"];
    // Ley 21.419, artículo 12: sobre la pensión inferior la PGU baja en línea recta hasta llegar a
    // cero en la pensión superior.
    const factor = entrada.pensionBase <= inferior ? 1 : entrada.pensionBase >= superior ? 0 : (superior - entrada.pensionBase) / (superior - inferior);
    const pgu = redondear(maxima * factor);
    const observaciones: string[] = [];
    if (factor === 0) observaciones.push("Con esa pensión base no corresponde PGU.");
    else if (factor < 1) observaciones.push("Tu pensión base pasa la pensión inferior, así que recibes una PGU parcial.");
    observaciones.push("Además necesitas 65 años, no estar en el 10 % de mayores ingresos y cumplir los años de residencia en Chile.");
    return { pgu, maxima, factor: factor * 100, total: entrada.pensionBase + pgu, observaciones };
  },
  resultado: [
    { clave: "pgu", etiqueta: "PGU al mes", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Pensión base más PGU", formato: "moneda" },
    { clave: "maxima", etiqueta: "Monto máximo para tu edad", formato: "moneda" },
    { clave: "factor", etiqueta: "Porcentaje del máximo que te toca", formato: "porcentaje", decimales: 1 },
  ],
});
