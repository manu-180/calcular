import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { aniosCumplidos } from "../lib/fechas";
import { claveVacaciones } from "../lib/laboral";

export default definirCalculadora({
  id: "py.vacaciones",
  mercado: "py",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "py.vacaciones-dias": "mapa",
    "py.salario-minimo": "numero",
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    {
      id: "fecha",
      tipo: "fecha",
      etiqueta: "Fecha en que salís de vacaciones",
      ayuda: "Las vacaciones empiezan un lunes, o el día hábil siguiente si es feriado.",
      porDefecto: "hoy",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fecha < entrada.ingreso) throw new ErrorEntrada("La fecha de las vacaciones tiene que ser posterior a tu ingreso.", "fecha");
    // El último aniversario cumplido antes de salir define cuántos días tocan.
    const anios = aniosCumplidos(entrada.ingreso, entrada.fecha);
    const dias = anios === 0 ? 0 : enMapa(valores["py.vacaciones-dias"], claveVacaciones(anios));
    // Art. 220: se paga con el salario de la época del goce, o el mínimo legal si es mayor.
    const base = Math.max(entrada.salario, valores["py.salario-minimo"]);
    const monto = redondear((base / valores["py.divisor-salario-diario"]) * dias);
    const observaciones: string[] = [];
    if (anios === 0) observaciones.push("Todavía no cumpliste un año en la empresa. Las vacaciones se ganan al completar cada año de trabajo.");
    else observaciones.push("Se pagan por adelantado, antes de que empiecen las vacaciones.");
    if (entrada.salario < valores["py.salario-minimo"] && anios > 0) observaciones.push("Tu salario está debajo del mínimo, así que las vacaciones se pagan con el salario mínimo.");
    return {
      anios,
      dias,
      monto,
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Años cumplidos en la empresa", formato: "anios" },
    { clave: "dias", etiqueta: "Días de vacaciones", formato: "dias", destacada: true },
    { clave: "monto", etiqueta: "Pago de tus vacaciones", formato: "moneda", destacada: true },
  ],
});
