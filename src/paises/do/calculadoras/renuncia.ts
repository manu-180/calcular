import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, mesesEnElAnio, textoAntiguedad } from "../lib/fechas";
import { clavePreaviso } from "../lib/terminacion";
import { diasVacacionesProporcionales } from "../lib/vacaciones";

export default definirCalculadora({
  id: "do.renuncia",
  mercado: "do",
  concepto: "propio",
  slug: "renuncia",
  estado: "publicado",
  requiere: {
    "do.preaviso-dias": "mapa",
    "do.vacaciones-proporcionales": "mapa",
    "do.divisor-salario-diario": "numero",
    "do.salario-minimo": "mapa",
    "do.tope-regalia": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "termino", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Sin horas extra.", min: 0 },
    { id: "vacacionesPendientes", tipo: "numero", etiqueta: "Días de vacaciones de años anteriores que no tomaste", min: 0, porDefecto: 0 },
    { id: "diPreaviso", tipo: "si-no", etiqueta: "Avisaste con los días de preaviso que manda la ley", porDefecto: true },
    { id: "tamano", tipo: "opcion-dato", etiqueta: "Tamaño de la empresa", dato: "do.salario-minimo", porDefecto: "grande" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.inicio) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha en que empezaste.", "termino");
    const a = antiguedad(entrada.inicio, entrada.termino);
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const diasVacaciones = diasVacacionesProporcionales(a, valores["do.vacaciones-proporcionales"]) + entrada.vacacionesPendientes;
    const vacaciones = redondear(diario * diasVacaciones);
    const meses = mesesEnElAnio(entrada.termino, entrada.inicio, entrada.termino);
    const tope = redondear(enMapa(valores["do.salario-minimo"], entrada.tamano) * valores["do.tope-regalia"]);
    const regalia = Math.min(redondear((entrada.salario * meses) / 12), tope);
    const clave = clavePreaviso(a);
    const diasPreaviso = clave ? enMapa(valores["do.preaviso-dias"], clave) : 0;
    const preavisoOmitido = entrada.diPreaviso ? 0 : redondear(diario * diasPreaviso);
    const observaciones: string[] = ["Al renunciar no cobras preaviso ni cesantía."];
    if (preavisoOmitido > 0) observaciones.push("Como no diste el preaviso, el empleador puede reclamarte esos días de salario (art. 79). Por eso aparece aparte.");
    if (diasPreaviso > 0 && entrada.diPreaviso) observaciones.push(`Con tu antigüedad, el preaviso es de ${diasPreaviso} días.`);
    return {
      antiguedad: textoAntiguedad(a),
      diario,
      diasVacaciones,
      vacaciones,
      regalia,
      total: redondear(vacaciones + regalia),
      preavisoOmitido,
      observaciones,
    };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "diasVacaciones", etiqueta: "Días de vacaciones a pagar", formato: "dias", decimales: 2 },
    { clave: "vacaciones", etiqueta: "Vacaciones no disfrutadas", formato: "moneda" },
    { clave: "regalia", etiqueta: "Salario de Navidad proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
    { clave: "preavisoOmitido", etiqueta: "Preaviso que podrías deber", formato: "moneda", ocultarSiCero: true },
  ],
});
