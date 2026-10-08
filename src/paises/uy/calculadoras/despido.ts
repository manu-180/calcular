import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { despidoMensual } from "../lib/despido";

export default definirCalculadora({
  id: "uy.despido",
  mercado: "uy",
  concepto: "indemnizacion-despido",
  slug: "despido",
  estado: "publicado",
  requiere: {
    "uy.despido-tope-meses": "numero",
    "uy.despido-jornales-anio": "numero",
    "uy.despido-tope-jornales": "numero",
    "uy.licencia-dias": "numero",
  },
  campos: [
    {
      id: "modalidad",
      tipo: "opcion",
      etiqueta: "Cómo cobrás",
      opciones: [
        { valor: "mensual", etiqueta: "Mensual" },
        { valor: "jornalero", etiqueta: "Jornalero o destajista" },
      ],
      porDefecto: "mensual",
    },
    {
      id: "remuneracion",
      tipo: "moneda",
      etiqueta: "Sueldo mensual o jornal",
      ayuda: "Mensuales: el sueldo nominal más el promedio mensual de horas extra y comisiones del último año. Jornaleros: el jornal del último día trabajado.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso", ayuda: "Solo para mensuales.", requerido: false },
    { id: "egreso", tipo: "fecha", etiqueta: "Fecha del despido", porDefecto: "hoy" },
    {
      id: "incidencias",
      tipo: "si-no",
      etiqueta: "Sumar aguinaldo y licencia a la base",
      ayuda: "Es lo que indica el MTSS para calcular la remuneración total del mes. Solo para mensuales.",
      porDefecto: true,
    },
    {
      id: "aniosCompletos",
      tipo: "entero",
      etiqueta: "Años en los que trabajaste 240 jornales o más",
      ayuda: "Solo para jornaleros. Se cuentan año a año, desde el despido hacia atrás.",
      min: 0,
      max: 60,
      porDefecto: 0,
    },
    {
      id: "jornalesSueltos",
      tipo: "entero",
      etiqueta: "Jornales trabajados en los años que no llegaron a 240",
      ayuda: "Solo para jornaleros. Incluí la fracción del último año. No cuentes años completos con menos de 100 jornales.",
      min: 0,
      max: 20000,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const observaciones: string[] = [];
    if (entrada.modalidad === "jornalero") {
      const porAnios = entrada.aniosCompletos * valores["uy.despido-jornales-anio"];
      const porSueltos = (entrada.jornalesSueltos * 2) / 25;
      const totalTrabajados = entrada.aniosCompletos * 240 + entrada.jornalesSueltos;
      if (totalTrabajados < 100) {
        observaciones.push("Con menos de 100 jornales trabajados no nace el derecho a indemnización.");
        return { aniosComputados: null, meses: null, baseMensual: null, jornales: 0, indemnizacion: 0, observaciones };
      }
      const tope = valores["uy.despido-tope-jornales"];
      const jornales = redondear(Math.min(tope, porAnios + porSueltos));
      if (porAnios + porSueltos > tope) observaciones.push("Llegaste al tope legal de jornales.");
      observaciones.push("La indemnización legal por despido no paga aportes ni IRPF.");
      return { aniosComputados: null, meses: null, baseMensual: null, jornales, indemnizacion: redondear(jornales * entrada.remuneracion), observaciones };
    }
    if (entrada.ingreso === null) throw new ErrorEntrada("Para un mensual necesitamos la fecha de ingreso.", "ingreso");
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("La fecha del despido tiene que ser posterior a la de ingreso.", "egreso");
    const r = despidoMensual(
      { sueldo: entrada.remuneracion, ingreso: entrada.ingreso, egreso: entrada.egreso, incidencias: entrada.incidencias },
      { topeMeses: valores["uy.despido-tope-meses"], diasLicencia: valores["uy.licencia-dias"] },
      redondear,
    );
    if (r.aniosComputados > r.meses) observaciones.push("Llegaste al tope legal: la indemnización no pasa de seis sueldos.");
    observaciones.push("La indemnización legal por despido no paga aportes ni IRPF.");
    return { aniosComputados: r.aniosComputados, meses: r.meses, baseMensual: r.baseMensual, jornales: null, indemnizacion: r.indemnizacion, observaciones };
  },
  resultado: [
    { clave: "aniosComputados", etiqueta: "Años computados (cada fracción cuenta como un año)", formato: "anios" },
    { clave: "meses", etiqueta: "Sueldos de indemnización", formato: "meses" },
    { clave: "baseMensual", etiqueta: "Remuneración total del mes", formato: "moneda" },
    { clave: "jornales", etiqueta: "Jornales de indemnización", formato: "dias" },
    { clave: "indemnizacion", etiqueta: "Indemnización por despido", formato: "moneda", destacada: true },
  ],
});
