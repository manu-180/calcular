import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, textoAntiguedad } from "../lib/fechas";
import { diasVacacionesProporcionales } from "../lib/vacaciones";

export default definirCalculadora({
  id: "do.vacaciones",
  mercado: "do",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "do.vacaciones-dias": "mapa",
    "do.vacaciones-proporcionales": "mapa",
    "do.divisor-salario-diario": "numero",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "corte", tipo: "fecha", etiqueta: "Fecha para el cálculo", porDefecto: "hoy" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Sin horas extra.", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.corte < entrada.inicio) throw new ErrorEntrada("La fecha del cálculo tiene que ser posterior a la fecha en que empezaste.", "corte");
    const a = antiguedad(entrada.inicio, entrada.corte);
    const tabla = valores["do.vacaciones-dias"];
    const completas = a.anios >= 1;
    const dias = completas
      ? enMapa(tabla, a.anios >= 5 ? "cinco-anios-o-mas" : "uno-a-cinco-anios")
      : diasVacacionesProporcionales(a, valores["do.vacaciones-proporcionales"]);
    const diario = redondear(entrada.salario / valores["do.divisor-salario-diario"]);
    const observaciones: string[] = [];
    if (completas) observaciones.push("Son días laborables, no corridos. El pago te lo hacen el día antes de que empiecen.");
    else if (dias === 0) observaciones.push("Antes de pasar los 5 meses de trabajo todavía no te corresponden vacaciones.");
    else observaciones.push("Como aún no cumples un año, te corresponden vacaciones en proporción al tiempo trabajado.");
    return { antiguedad: textoAntiguedad(a), dias, diario, pago: redondear(diario * dias), observaciones };
  },
  resultado: [
    { clave: "antiguedad", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "dias", etiqueta: "Días de vacaciones", formato: "dias" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "pago", etiqueta: "Pago de vacaciones", formato: "moneda", destacada: true },
  ],
});
