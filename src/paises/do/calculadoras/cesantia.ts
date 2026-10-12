import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, textoAntiguedad } from "../lib/fechas";
import { CODIGO_VIGENTE_DESDE, diasCesantia } from "../lib/terminacion";

export default definirCalculadora({
  id: "do.cesantia",
  mercado: "do",
  concepto: "indemnizacion-despido",
  slug: "cesantia",
  estado: "publicado",
  requiere: {
    "do.cesantia-dias": "mapa",
    "do.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "termino", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual del último año",
      ayuda: "Suma lo que ganaste en los últimos 12 meses sin horas extra ni regalía y divídelo entre los meses trabajados.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.inicio) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha en que empezaste.", "termino");
    const a = antiguedad(entrada.inicio, entrada.termino);
    const dias = diasCesantia(a, valores["do.cesantia-dias"]);
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const observaciones: string[] = [];
    if (dias === 0) observaciones.push("Con menos de 3 meses de trabajo no corresponde auxilio de cesantía.");
    if (entrada.inicio < CODIGO_VIGENTE_DESDE) observaciones.push("Los años trabajados antes del 29 de mayo de 1992 se pagan con 15 días por año. Revisa ese tramo con el Ministerio de Trabajo.");
    observaciones.push("La cesantía se paga cuando el empleador te desahucia o te despide sin causa justa, o cuando dimites con causa. Si renuncias, no te toca.");
    return { antiguedad: textoAntiguedad(a), diario, dias, cesantia: redondear(diario * dias), observaciones };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "dias", etiqueta: "Días de cesantía", formato: "dias" },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda", destacada: true },
  ],
});
