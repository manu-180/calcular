import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.vacaciones",
  mercado: "cr",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "cr.vacaciones-dias-por-mes": "numero",
    "cr.dias-mes-planilla": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual",
      ayuda: "Bruto, con horas extra y comisiones. La ley usa el promedio de las últimas 50 semanas.",
      min: 0,
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses trabajados desde sus últimas vacaciones", min: 0, max: 60, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Días de vacaciones que ya disfrutó en ese tiempo", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const ganados = entrada.meses * valores["cr.vacaciones-dias-por-mes"];
    if (entrada.tomados > ganados) throw new ErrorEntrada("Los días disfrutados no pueden ser más que los días ganados.", "tomados");
    const pendientes = ganados - entrada.tomados;
    const diario = entrada.salario / valores["cr.dias-mes-planilla"];
    return {
      ganados,
      pendientes,
      salarioDiario: redondear(diario),
      monto: redondear(diario * pendientes),
      observaciones: [
        "Es una estimación: un día por mes trabajado y su salario promedio entre 30. Según su jornada, las dos semanas de ley pueden contarse como 12 o 14 días.",
      ],
    };
  },
  resultado: [
    { clave: "ganados", etiqueta: "Días de vacaciones ganados", formato: "dias" },
    { clave: "pendientes", etiqueta: "Días pendientes", formato: "dias" },
    { clave: "salarioDiario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "monto", etiqueta: "Valor de las vacaciones pendientes", formato: "moneda", destacada: true },
  ],
});
