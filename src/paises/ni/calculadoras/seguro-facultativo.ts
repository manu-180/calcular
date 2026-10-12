import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.seguro-facultativo",
  mercado: "ni",
  concepto: "propio",
  slug: "seguro-facultativo",
  estado: "publicado",
  requiere: {
    "ni.inss-facultativo": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Ingreso mensual por el que querés cotizar", min: 0 },
    { id: "modalidad", tipo: "opcion-dato", dato: "ni.inss-facultativo", etiqueta: "Modalidad", porDefecto: "integral" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["ni.inss-facultativo"], entrada.modalidad);
    const mensual = redondear(porcentaje(entrada.ingreso, tasa));
    return {
      tasa,
      mensual,
      anual: redondear(mensual * 12),
      observaciones: [
        "Es una estimación: el INSS cobra sobre la categoría de ingreso de su tabla más cercana a lo que declarás.",
        "En el primer año de inscripción no hay subsidios por enfermedad ni maternidad.",
        "El seguro facultativo no cubre riesgos profesionales.",
      ],
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Tasa", formato: "porcentaje", decimales: 2 },
    { clave: "mensual", etiqueta: "Cuota mensual", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Total en un año", formato: "moneda" },
  ],
});
