import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { antiguedad, finDeServicio, sumarMeses } from "../lib/fechas";
import { claveVacaciones } from "../lib/laboral";

export default definirCalculadora({
  id: "py.vacaciones-proporcionales",
  mercado: "py",
  concepto: "propio",
  slug: "vacaciones-proporcionales",
  estado: "publicado",
  requiere: {
    "py.vacaciones-dias": "mapa",
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual actual", min: 0 },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "egreso", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "egreso");
    const a = antiguedad(entrada.ingreso, entrada.egreso);
    const aniversario = sumarMeses(entrada.ingreso, a.anios * 12);
    const siguiente = sumarMeses(entrada.ingreso, (a.anios + 1) * 12);
    const fraccion = diasEntre(aniversario, finDeServicio(entrada.egreso)) / diasEntre(aniversario, siguiente);
    // Los días del año en curso dependen de la antigüedad que se tendría al completarlo (art. 218).
    const diasDelAnio = enMapa(valores["py.vacaciones-dias"], claveVacaciones(a.anios + 1));
    const dias = diasDelAnio * fraccion;
    return {
      diasDelAnio,
      dias,
      monto: redondear((entrada.salario / valores["py.divisor-salario-diario"]) * dias),
      observaciones: [
        "Son las vacaciones del año que no llegaste a completar. Las de años ya cumplidos se pagan enteras (y dobles si te despiden después de los seis meses para tomarlas).",
      ],
    };
  },
  resultado: [
    { clave: "diasDelAnio", etiqueta: "Días de vacaciones del año en curso", formato: "dias" },
    { clave: "dias", etiqueta: "Días proporcionales", formato: "dias", decimales: 2 },
    { clave: "monto", etiqueta: "Vacaciones proporcionales", formato: "moneda", destacada: true },
  ],
});
