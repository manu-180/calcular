import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, textoAntiguedad } from "../lib/fechas";
import { clavePreaviso, CODIGO_VIGENTE_DESDE, diasCesantia } from "../lib/terminacion";

export default definirCalculadora({
  id: "do.despido-injustificado",
  mercado: "do",
  concepto: "propio",
  slug: "despido-injustificado",
  estado: "publicado",
  requiere: {
    "do.preaviso-dias": "mapa",
    "do.cesantia-dias": "mapa",
    "do.divisor-salario-diario": "numero",
    "do.salarios-caidos-meses": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "termino", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio mensual del último año", ayuda: "Sin horas extra ni regalía.", min: 0 },
    {
      id: "mesesJuicio",
      tipo: "numero",
      etiqueta: "Meses entre la demanda y la sentencia",
      ayuda: "Si todavía no hay sentencia, pon una estimación. Si no vas a demandar, deja 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.inicio) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la fecha en que empezaste.", "termino");
    const a = antiguedad(entrada.inicio, entrada.termino);
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const clave = clavePreaviso(a);
    const diasPreaviso = clave ? enMapa(valores["do.preaviso-dias"], clave) : 0;
    const diasCes = diasCesantia(a, valores["do.cesantia-dias"]);
    const maximo = valores["do.salarios-caidos-meses"];
    const mesesCaidos = Math.min(entrada.mesesJuicio, maximo);
    const preaviso = redondear(diario * diasPreaviso);
    const cesantia = redondear(diario * diasCes);
    const salariosCaidos = redondear(entrada.salario * mesesCaidos);
    const observaciones: string[] = [];
    if (entrada.mesesJuicio > maximo) observaciones.push(`Los salarios caídos no pueden pasar de ${maximo} meses de salario, aunque el juicio dure más.`);
    if (diasPreaviso === 0) observaciones.push("Con menos de 3 meses de trabajo no corresponden preaviso ni cesantía.");
    if (entrada.inicio < CODIGO_VIGENTE_DESDE) observaciones.push("Los años trabajados antes del 29 de mayo de 1992 se pagan con 15 días de cesantía por año.");
    observaciones.push("A esto se suman las vacaciones no tomadas y la regalía proporcional, que te tocan aunque el despido sea justificado.");
    observaciones.push("Si el empleador prueba una causa justa ante el tribunal, no se pagan preaviso, cesantía ni salarios caídos.");
    return {
      antiguedad: textoAntiguedad(a),
      diario,
      diasPreaviso,
      preaviso,
      diasCesantia: diasCes,
      cesantia,
      mesesCaidos,
      salariosCaidos,
      total: redondear(preaviso + cesantia + salariosCaidos),
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "diasPreaviso", etiqueta: "Días de preaviso", formato: "dias", ocultarSiCero: true },
    { clave: "preaviso", etiqueta: "Preaviso", formato: "moneda", ocultarSiCero: true },
    { clave: "diasCesantia", etiqueta: "Días de cesantía", formato: "dias", ocultarSiCero: true },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda", ocultarSiCero: true },
    { clave: "mesesCaidos", etiqueta: "Meses de salarios caídos", formato: "meses", ocultarSiCero: true, decimales: 2 },
    { clave: "salariosCaidos", etiqueta: "Salarios caídos (art. 95)", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por despido injustificado", formato: "moneda", destacada: true },
  ],
});
