import { aplicarEscala, definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.impuesto-herencias",
  mercado: "ec",
  concepto: "propio",
  slug: "impuesto-herencias",
  estado: "publicado",
  requiere: {
    "ec.impuesto-herencias": "escala",
    "ec.herencias-reduccion-primer-grado": "numero",
  },
  campos: [
    {
      id: "monto",
      tipo: "moneda",
      etiqueta: "Valor neto que recibes",
      ayuda: "El valor de tu parte, menos las deudas y gastos que se pueden deducir (deudas del fallecido, gastos de la última enfermedad y del funeral).",
      min: 0,
    },
    {
      id: "caso",
      tipo: "opcion",
      etiqueta: "Qué recibes y de quién",
      opciones: [
        { valor: "primer-grado", etiqueta: "Herencia o legado de mi padre, madre, hijo o hija" },
        { valor: "menor", etiqueta: "Herencia de mi padre o madre, siendo menor de edad" },
        { valor: "otro", etiqueta: "Herencia o legado de otra persona" },
        { valor: "donacion", etiqueta: "Donación" },
      ],
      porDefecto: "primer-grado",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const segunTabla = entrada.caso === "menor" ? 0 : redondear(aplicarEscala(valores["ec.impuesto-herencias"], entrada.monto));
    const reduccion = entrada.caso === "primer-grado" ? redondear(porcentaje(segunTabla, valores["ec.herencias-reduccion-primer-grado"])) : 0;
    const impuesto = redondear(segunTabla - reduccion);
    const observaciones: string[] = [];
    if (entrada.caso === "menor") observaciones.push("Los hijos menores de edad no pagan este impuesto por la herencia de sus padres. Si tienes discapacidad, la exención depende de tu porcentaje de discapacidad.");
    if (entrada.caso === "donacion") observaciones.push("Las donaciones pagan con la tabla completa, sin la reducción para padres e hijos.");
    observaciones.push(
      entrada.caso === "donacion"
        ? "La declaración se presenta antes de inscribir la escritura de la donación."
        : "La declaración se presenta dentro de los seis meses desde que aceptas la herencia.",
    );
    return {
      segunTabla,
      reduccion,
      impuesto,
      tasaEfectiva: entrada.monto > 0 ? redondear((impuesto / entrada.monto) * 100) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "segunTabla", etiqueta: "Impuesto según la tabla", formato: "moneda" },
    { clave: "reduccion", etiqueta: "Reducción para padres e hijos", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Impuesto a pagar", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Porcentaje real sobre lo que recibes", formato: "porcentaje" },
  ],
});
