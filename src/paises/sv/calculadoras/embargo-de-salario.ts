import { definirCalculadora, porcentaje, porRegion } from "@/motor/calculo";

// Art. 133: el salario mínimo no se embarga (salvo cuota alimenticia) y de lo que lo pasa se puede
// embargar hasta el 20 %. Art. 136: si el que demanda es un banco, aseguradora, institución de crédito o
// cooperativa por un préstamo, el art. 133 no aplica y el 20 % va sobre todo el salario ordinario.
export default definirCalculadora({
  id: "sv.embargo-de-salario",
  mercado: "sv",
  concepto: "propio",
  slug: "embargo-de-salario",
  estado: "publicado",
  requiere: {
    "sv.salario-minimo": "numero-por-region",
    "sv.embargo-porcentaje": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario ordinario mensual", min: 0 },
    { id: "region", tipo: "region", etiqueta: "Sector de la empresa", porDefecto: "comercio-servicios" },
    {
      id: "deuda",
      tipo: "opcion",
      etiqueta: "Quién reclama la deuda",
      opciones: [
        { valor: "financiera", etiqueta: "Banco, aseguradora, financiera o cooperativa (por un préstamo)" },
        { valor: "otra", etiqueta: "Otra persona o empresa" },
        { valor: "alimentos", etiqueta: "Cuota alimenticia" },
      ],
      porDefecto: "financiera",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = porRegion(valores["sv.salario-minimo"], entrada.region);
    const tasa = valores["sv.embargo-porcentaje"];
    const observaciones: string[] = [];
    if (entrada.deuda === "alimentos") {
      observaciones.push("Por cuota alimenticia se puede embargar incluso el salario mínimo. El monto lo fija la autoridad según las necesidades y la capacidad de pago.");
      return { base: null, maximo: null, queda: null, observaciones };
    }
    const base = redondear(entrada.deuda === "financiera" ? entrada.salario : Math.max(0, entrada.salario - minimo));
    const maximo = redondear(porcentaje(base, tasa));
    if (entrada.deuda === "financiera") observaciones.push("Cuando demanda un banco, aseguradora, financiera o cooperativa por un préstamo, el embargo puede llegar al porcentaje de todo el salario, aunque sea el mínimo.");
    else if (base === 0) observaciones.push("Su salario no pasa del mínimo del sector, así que no se lo pueden embargar.");
    return { base, maximo, queda: redondear(entrada.salario - maximo), observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Parte del salario que se puede embargar", formato: "moneda" },
    { clave: "maximo", etiqueta: "Máximo que le pueden embargar al mes", formato: "moneda", destacada: true },
    { clave: "queda", etiqueta: "Lo que le queda como mínimo", formato: "moneda" },
  ],
});
