import { definirCalculadora, enMapa, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.embargo-de-salario",
  mercado: "gt",
  concepto: "propio",
  slug: "embargo-de-salario",
  estado: "publicado",
  requiere: {
    "gt.embargo-alimentos": "numero",
    "gt.embargo-inembargable": "numero",
    "gt.salario-minimo-mensual": "mapa-por-region",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Por qué es el embargo",
      opciones: [
        { valor: "alimentos", etiqueta: "Pensión alimenticia" },
        { valor: "otras", etiqueta: "Otra deuda (préstamo, tarjeta, cuenta)" },
      ],
      porDefecto: "alimentos",
    },
    { id: "region", tipo: "region", etiqueta: "Dónde está su centro de trabajo", porDefecto: "ce1" },
    {
      id: "actividad",
      tipo: "opcion",
      etiqueta: "Actividad",
      opciones: [
        { valor: "no-agricola", etiqueta: "No agrícola" },
        { valor: "agricola", etiqueta: "Agrícola" },
        { valor: "exportadora-maquila", etiqueta: "Exportadora y de maquila" },
      ],
      porDefecto: "no-agricola",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = enMapa(porRegion(valores["gt.salario-minimo-mensual"], entrada.region), entrada.actividad);
    let maximo: number;
    const observaciones: string[] = [];
    if (entrada.tipo === "alimentos") {
      maximo = redondear(porcentaje(entrada.salario, valores["gt.embargo-alimentos"]));
      observaciones.push("El embargo por alimentos tiene prioridad sobre los demás. El juez fija el monto: este es el máximo.");
    } else if (entrada.salario <= minimo) {
      maximo = 0;
      observaciones.push("El salario mínimo no se puede embargar por deudas que no sean de alimentos.");
    } else {
      maximo = redondear(entrada.salario - porcentaje(entrada.salario, valores["gt.embargo-inembargable"]));
      observaciones.push("Si ya le embargan la mitad por alimentos, por otras deudas solo se puede embargar hasta un 10 % más.");
    }
    return { minimo, maximo, libre: redondear(entrada.salario - maximo), observaciones };
  },
  resultado: [
    { clave: "maximo", etiqueta: "Máximo que le pueden embargar al mes", formato: "moneda", destacada: true },
    { clave: "libre", etiqueta: "Le queda como mínimo", formato: "moneda" },
    { clave: "minimo", etiqueta: "Salario mínimo de su actividad", formato: "moneda" },
  ],
});
