import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.contrato-de-aprendizaje",
  mercado: "co",
  concepto: "propio",
  slug: "contrato-de-aprendizaje",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.aprendiz-sostenimiento": "mapa",
  },
  campos: [
    { id: "etapa", tipo: "opcion-dato", etiqueta: "Etapa o tipo de aprendiz", dato: "co.aprendiz-sostenimiento", porDefecto: "lectiva" },
    { id: "meses", tipo: "entero", etiqueta: "Meses en esa etapa", min: 1, max: 36, porDefecto: 6 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["co.aprendiz-sostenimiento"], entrada.etapa);
    const mensual = redondear(porcentaje(valores["co.smmlv"], tasa));
    return {
      tasa,
      mensual,
      total: mensual * entrada.meses,
    };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje del salario mínimo", formato: "porcentaje" },
    { clave: "mensual", etiqueta: "Apoyo de sostenimiento mínimo al mes", formato: "moneda", decimales: 0, destacada: true },
    { clave: "total", etiqueta: "Total en los meses de la etapa", formato: "moneda", decimales: 0 },
  ],
});
