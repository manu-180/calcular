import { definirCalculadora, enMapa, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "sv.salario-de-aprendiz",
  mercado: "sv",
  concepto: "propio",
  slug: "salario-de-aprendiz",
  estado: "publicado",
  requiere: {
    "sv.aprendiz-porcentaje": "mapa",
    "sv.salario-minimo": "numero-por-region",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Sector de la empresa", porDefecto: "comercio-servicios" },
    { id: "anio", tipo: "opcion-dato", dato: "sv.aprendiz-porcentaje", etiqueta: "Año del aprendizaje", porDefecto: "primer-anio" },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = porRegion(valores["sv.salario-minimo"], entrada.region);
    const tasa = enMapa(valores["sv.aprendiz-porcentaje"], entrada.anio);
    const mensual = redondear(porcentaje(minimo, tasa));
    return {
      minimo,
      tasa,
      mensual,
      quincenal: redondear(mensual / 2),
      observaciones: ["El contrato de aprendizaje tiene que ser por escrito, aprobado por el Ministerio de Trabajo e inscrito en su registro."],
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salario mínimo del sector", formato: "moneda" },
    { clave: "tasa", etiqueta: "Porcentaje que corresponde al aprendiz", formato: "porcentaje" },
    { clave: "mensual", etiqueta: "Salario mínimo del aprendiz por mes", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "Por quincena", formato: "moneda" },
  ],
});
