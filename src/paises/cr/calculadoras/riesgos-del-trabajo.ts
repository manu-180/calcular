import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.riesgos-del-trabajo",
  mercado: "cr",
  concepto: "propio",
  slug: "riesgos-del-trabajo",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.salario-minimo-jornada": "mapa",
    "cr.riesgos-subsidio-inicial": "numero",
    "cr.riesgos-dias-iniciales": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los tres meses antes del accidente",
      ayuda: "Lo reportado en planilla al INS.",
      min: 0,
    },
    { id: "dias", tipo: "entero", etiqueta: "Días de incapacidad", min: 1, max: 730, porDefecto: 10 },
    { id: "jornadaCompleta", tipo: "si-no", etiqueta: "Trabaja jornada ordinaria completa", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = entrada.salario / valores["cr.dias-mes-planilla"];
    const segunSalario = porcentaje(diario, valores["cr.riesgos-subsidio-inicial"]);
    // Art. 236: con jornada completa el subsidio diario no baja del mínimo de las ocupaciones genéricas (art. 2 del decreto).
    const minimo = enMapa(valores["cr.salario-minimo-jornada"], "no-calificado");
    const subsidioDiario = redondear(entrada.jornadaCompleta ? Math.max(segunSalario, minimo) : segunSalario);
    const diasCalculados = Math.min(entrada.dias, valores["cr.riesgos-dias-iniciales"]);
    const observaciones = ["El INS paga desde el día del accidente si su salario es mensual, quincenal o semanal en comercio."];
    if (entrada.jornadaCompleta && segunSalario < minimo) observaciones.push("Su subsidio sube al salario mínimo diario: la ley no permite pagar menos con jornada completa.");
    if (entrada.dias > diasCalculados) {
      observaciones.push(
        `Desde el día ${valores["cr.riesgos-dias-iniciales"] + 1} el INS paga el 100 % hasta un tope que fija el reglamento y el 67 % del exceso. Ese tramo no lo calculamos.`,
      );
    }
    return {
      salarioDiario: redondear(diario),
      subsidioDiario,
      diasCalculados,
      diasSinCalcular: entrada.dias - diasCalculados,
      subsidio: redondear(subsidioDiario * diasCalculados),
      observaciones,
    };
  },
  resultado: [
    { clave: "salarioDiario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "subsidioDiario", etiqueta: "Subsidio por día", formato: "moneda" },
    { clave: "diasCalculados", etiqueta: "Días calculados", formato: "dias" },
    { clave: "diasSinCalcular", etiqueta: "Días después del 45 (sin calcular)", formato: "dias", ocultarSiCero: true },
    { clave: "subsidio", etiqueta: "Subsidio del INS", formato: "moneda", destacada: true },
  ],
});
