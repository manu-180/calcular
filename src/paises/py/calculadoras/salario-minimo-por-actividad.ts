import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.salario-minimo-por-actividad",
  mercado: "py",
  concepto: "propio",
  slug: "salario-minimo-por-actividad",
  estado: "publicado",
  requiere: {
    "py.salario-minimo-actividad": "mapa",
    "py.recargo-nocturno": "numero",
    "py.divisor-salario-diario": "numero",
    "py.divisor-jornal": "numero",
  },
  campos: [
    { id: "actividad", tipo: "opcion-dato", dato: "py.salario-minimo-actividad", etiqueta: "Actividad u oficio", porDefecto: "no-especificadas" },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna" },
        { valor: "nocturna", etiqueta: "Nocturna" },
      ],
      porDefecto: "diurna",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const diurno = enMapa(valores["py.salario-minimo-actividad"], entrada.actividad);
    // Res. MTESS 670/2026, arts. 1 y 6: la jornada nocturna suma el 30 % también en las actividades del anexo.
    const mensual = entrada.jornada === "nocturna" ? redondear(diurno + porcentaje(diurno, valores["py.recargo-nocturno"])) : diurno;
    const observaciones = ["Es el mínimo legal: tu contrato o un convenio colectivo pueden fijar más."];
    if (entrada.actividad.startsWith("seguridad-")) observaciones.push("En seguridad privada el mínimo depende de las horas diarias de la jornada pactada.");
    if (entrada.actividad === "aprendiz") observaciones.push("El contrato de aprendizaje dura hasta un año (tres, con permiso del Ministerio de Trabajo).");
    return {
      mensual,
      diario: redondear(mensual / valores["py.divisor-salario-diario"]),
      jornal: redondear(mensual / valores["py.divisor-jornal"]),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Salario diario del mensualero", formato: "moneda" },
    { clave: "jornal", etiqueta: "Jornal mínimo (si cobrás por día)", formato: "moneda" },
  ],
});
