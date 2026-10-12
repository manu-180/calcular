import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.impuesto-a-la-herencia",
  mercado: "bo",
  concepto: "propio",
  slug: "impuesto-a-la-herencia",
  estado: "publicado",
  requiere: {
    "bo.tgb-alicuotas": "mapa",
  },
  campos: [
    { id: "parentesco", tipo: "opcion-dato", etiqueta: "Quién recibe los bienes", dato: "bo.tgb-alicuotas", porDefecto: "directos" },
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Valor de lo que recibe",
      ayuda: "El avalúo de los inmuebles, vehículos, acciones o derechos que le tocan a usted.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const alicuota = enMapa(valores["bo.tgb-alicuotas"], entrada.parentesco);
    return {
      alicuota,
      impuesto: redondear(porcentaje(entrada.valor, alicuota)),
      observaciones: [
        "Cada heredero paga sobre lo que recibe. La herencia se declara dentro de los 90 días de abierta la sucesión; una donación, dentro de los 5 días hábiles.",
        "Solo alcanza a bienes sujetos a registro: inmuebles, vehículos, acciones, cuotas de capital y derechos.",
      ],
    };
  },
  resultado: [
    { clave: "alicuota", etiqueta: "Alícuota que le corresponde", formato: "porcentaje", decimales: 0 },
    { clave: "impuesto", etiqueta: "Impuesto a pagar", formato: "moneda", destacada: true },
  ],
});
