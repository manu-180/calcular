import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { mesesEnElAnio } from "../lib/fechas";

export default definirCalculadora({
  id: "do.regalia-pascual",
  mercado: "do",
  concepto: "bono-semestral",
  slug: "regalia-pascual",
  estado: "publicado",
  requiere: {
    "do.salario-minimo": "mapa",
    "do.tope-regalia": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Tu salario ordinario, sin horas extra ni bonificación. La ley no las cuenta para la regalía.",
      min: 0,
    },
    {
      id: "ingreso",
      tipo: "fecha",
      etiqueta: "Fecha en que empezaste, si fue este año",
      ayuda: "Déjala vacía si trabajas en la empresa desde antes del 1 de enero.",
      requerido: false,
    },
    {
      id: "salida",
      tipo: "fecha",
      etiqueta: "Último día de trabajo, si ya saliste este año",
      ayuda: "Déjala vacía si sigues trabajando.",
      requerido: false,
    },
    { id: "tamano", tipo: "opcion-dato", etiqueta: "Tamaño de la empresa", dato: "do.salario-minimo", porDefecto: "grande" },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    const anio = fecha.slice(0, 4);
    if (entrada.ingreso && entrada.ingreso.slice(0, 4) > anio) throw new ErrorEntrada(`La fecha de ingreso tiene que ser de ${anio} o de antes.`, "ingreso");
    if (entrada.salida && entrada.salida.slice(0, 4) < anio) throw new ErrorEntrada(`La fecha de salida tiene que ser de ${anio}. Para otro año, calcula con una fecha de ese año.`, "salida");
    if (entrada.ingreso && entrada.salida && entrada.salida < entrada.ingreso) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha en que empezaste.", "salida");
    const meses = mesesEnElAnio(fecha, entrada.ingreso, entrada.salida);
    const devengado = redondear(entrada.salario * meses);
    const segunSalario = redondear(devengado / 12);
    const tope = redondear(enMapa(valores["do.salario-minimo"], entrada.tamano) * valores["do.tope-regalia"]);
    const regalia = Math.min(segunSalario, tope);
    const observaciones = [
      `Es la doceava parte de lo que ganas en ${anio}. Se paga a más tardar el 20 de diciembre y no paga ISR.`,
      "Para el tope usamos el salario mínimo del tamaño de tu empresa. El Código de Trabajo no aclara cuál salario mínimo se toma.",
    ];
    if (segunSalario > tope) observaciones.unshift("Tu regalía llega al tope legal. Tu empresa puede pagarte más si quiere o si lo dice tu contrato.");
    return { meses: redondear(meses), devengado, segunSalario, tope, regalia, observaciones };
  },
  resultado: [
    { clave: "meses", etiqueta: "Meses trabajados en el año", formato: "meses", decimales: 2 },
    { clave: "devengado", etiqueta: "Salario ganado en el año", formato: "moneda" },
    { clave: "segunSalario", etiqueta: "Regalía según tu salario", formato: "moneda" },
    { clave: "tope", etiqueta: "Tope legal de la regalía", formato: "moneda" },
    { clave: "regalia", etiqueta: "Regalía pascual", formato: "moneda", destacada: true },
  ],
});
