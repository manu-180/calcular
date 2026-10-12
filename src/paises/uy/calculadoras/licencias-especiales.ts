import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.licencias-especiales",
  mercado: "uy",
  concepto: "propio",
  slug: "licencias-especiales",
  estado: "publicado",
  requiere: {
    "uy.licencias-especiales": "mapa",
    "uy.licencia-familiar-discapacidad": "mapa",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Motivo de la licencia",
      opciones: [
        { valor: "estudio-36", etiqueta: "Estudio, si trabajás hasta 36 horas por semana" },
        { valor: "estudio-47", etiqueta: "Estudio, si trabajás más de 36 y menos de 48 horas" },
        { valor: "estudio-48", etiqueta: "Estudio, si trabajás 48 horas por semana" },
        { valor: "paternidad", etiqueta: "Nacimiento de un hijo (paternidad, adopción)" },
        { valor: "matrimonio", etiqueta: "Matrimonio" },
        { valor: "duelo", etiqueta: "Duelo por padre, madre, hijo, cónyuge, concubino o hermano" },
        { valor: "hijo-discapacidad", etiqueta: "Controles médicos de un hijo con discapacidad" },
        { valor: "familiar-discapacidad", etiqueta: "Cuidar a un familiar con discapacidad o enfermedad terminal" },
      ],
      porDefecto: "duelo",
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo nominal mensual (opcional)",
      ayuda: "Si lo ponés, te decimos cuánto vale la licencia.",
      min: 0,
      requerido: false,
    },
    {
      id: "horasDiarias",
      tipo: "numero",
      etiqueta: "Horas que trabajás por día",
      ayuda: "Solo para la licencia por familiar con discapacidad, que se cuenta en horas.",
      min: 1,
      max: 12,
      porDefecto: 8,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const observaciones: string[] = [];
    if (entrada.motivo === "familiar-discapacidad") {
      const horas = enMapa(valores["uy.licencia-familiar-discapacidad"], "total");
      const pagas = enMapa(valores["uy.licencia-familiar-discapacidad"], "empleador");
      observaciones.push(`Las podés usar de forma continua o en partes durante el año. El empleador paga hasta ${pagas} horas.`);
      const valorHora = entrada.sueldo === null ? null : entrada.sueldo / 30 / entrada.horasDiarias;
      return { dias: null, horas, horasPagas: pagas, valorDia: null, pago: valorHora === null ? null : redondear(valorHora * pagas), observaciones };
    }
    const dias = enMapa(valores["uy.licencias-especiales"], entrada.motivo);
    if (entrada.motivo.startsWith("estudio")) observaciones.push("Son días por año, en partes de hasta 3 días que incluyan el del examen. Necesitás más de 6 meses en la empresa y presentar la constancia.");
    if (entrada.motivo === "duelo") observaciones.push("Son días hábiles.");
    if (entrada.motivo === "paternidad") observaciones.push("Son el día del nacimiento y los dos siguientes. Después empiezan los días que paga el BPS.");
    observaciones.push("Se pagan como días comunes de trabajo y no generan salario vacacional.");
    const valorDia = entrada.sueldo === null ? null : redondear(entrada.sueldo / 30);
    return { dias, horas: null, horasPagas: null, valorDia, pago: valorDia === null ? null : redondear(valorDia * dias), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia con goce de sueldo", formato: "dias", destacada: true },
    { clave: "horas", etiqueta: "Horas de licencia por año", formato: "horas", destacada: true },
    { clave: "horasPagas", etiqueta: "Horas que paga el empleador", formato: "horas" },
    { clave: "valorDia", etiqueta: "Valor de un día (sueldo / 30)", formato: "moneda" },
    { clave: "pago", etiqueta: "Lo que vale la licencia", formato: "moneda" },
  ],
});
