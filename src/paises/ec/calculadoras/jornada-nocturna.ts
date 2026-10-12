import { definirCalculadora, porcentaje } from "@/motor/calculo";

// El sueldo mensual paga treinta días (Código del Trabajo, art. 53): la hora es el sueldo dividido
// para 30 y para la jornada diaria (art. 47).
const DIAS_DEL_MES = 30;

export default definirCalculadora({
  id: "ec.jornada-nocturna",
  mercado: "ec",
  concepto: "propio",
  slug: "jornada-nocturna",
  estado: "publicado",
  requiere: {
    "ec.jornada-diaria": "numero",
    "ec.recargo-nocturno": "numero",
    "ec.sbu": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual de una jornada de día", min: 0 },
    {
      id: "todaLaJornada",
      tipo: "si-no",
      etiqueta: "Toda tu jornada es nocturna (entre las 19:00 y las 06:00)",
      porDefecto: true,
    },
    {
      id: "horas",
      tipo: "numero",
      etiqueta: "Horas nocturnas en el mes",
      ayuda: "Solo si trabajas de noche algunas horas. Las horas extra de noche se calculan aparte.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = entrada.sueldo / DIAS_DEL_MES / valores["ec.jornada-diaria"];
    const recargoHora = porcentaje(hora, valores["ec.recargo-nocturno"]);
    const recargo = entrada.todaLaJornada ? redondear(porcentaje(entrada.sueldo, valores["ec.recargo-nocturno"])) : redondear(recargoHora * entrada.horas);
    const observaciones: string[] = [];
    if (entrada.sueldo > 0 && entrada.sueldo < valores["ec.sbu"]) observaciones.push("Tu sueldo de día está por debajo del salario básico. Con jornada completa, el mínimo legal es el básico.");
    return {
      hora: redondear(hora),
      horaNocturna: redondear(hora + recargoHora),
      recargo,
      total: redondear(entrada.sueldo + recargo),
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de la hora de día", formato: "moneda" },
    { clave: "horaNocturna", etiqueta: "Valor de la hora nocturna", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo nocturno del mes", formato: "moneda" },
    { clave: "total", etiqueta: "Sueldo del mes con el recargo", formato: "moneda", destacada: true },
  ],
});
