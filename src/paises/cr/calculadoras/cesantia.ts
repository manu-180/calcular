import { definirCalculadora } from "@/motor/calculo";
import { cesantia, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "cr.cesantia",
  mercado: "cr",
  concepto: "indemnizacion-despido",
  slug: "cesantia",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.cesantia-dias-menos-de-un-anio": "mapa",
    "cr.cesantia-dias-por-anio": "mapa",
    "cr.cesantia-tope-anios": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      ayuda: "Bruto, con horas extra y comisiones incluidas.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const c = cesantia(t, valores["cr.cesantia-dias-menos-de-un-anio"], valores["cr.cesantia-dias-por-anio"], valores["cr.cesantia-tope-anios"]);
    const diario = entrada.salario / valores["cr.dias-mes-planilla"];
    const observaciones: string[] = [];
    if (c.dias === 0) observaciones.push("Con menos de tres meses de trabajo no corresponde cesantía.");
    if (c.aniosComputables > c.aniosPagados) observaciones.push(`La ley paga como máximo los últimos ${c.aniosPagados} años, aunque usted trabajó más.`);
    if (t.anios >= 1 && (t.meses > 0 || t.dias > 0) && c.aniosComputables === t.anios) {
      observaciones.push("La fracción de hasta seis meses sobre el último año completo no suma días, según el texto del artículo 29.");
    }
    return {
      tiempo: textoTiempo(t),
      aniosComputables: c.aniosComputables || null,
      diasPorAnio: c.diasPorAnio || null,
      dias: c.dias,
      salarioDiario: redondear(diario),
      cesantia: redondear(diario * c.dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "aniosComputables", etiqueta: "Años que cuenta la ley", formato: "anios" },
    { clave: "diasPorAnio", etiqueta: "Días por año según la tabla", formato: "dias" },
    { clave: "dias", etiqueta: "Días de cesantía", formato: "dias" },
    { clave: "salarioDiario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "cesantia", etiqueta: "Auxilio de cesantía", formato: "moneda", destacada: true },
  ],
});
