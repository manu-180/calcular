import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.trabajo-domestico",
  mercado: "cr",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    "cr.salario-minimo-mes": "mapa",
    "cr.dias-mes-planilla": "numero",
    "cr.jornada-diaria": "mapa",
    "cr.ccss-sem-trabajador": "numero",
    "cr.ccss-ivm-trabajador": "numero",
    "cr.banco-popular-trabajador": "numero",
    "cr.vacaciones-domestico": "numero",
  },
  campos: [
    {
      id: "horasSemana",
      tipo: "numero",
      etiqueta: "Horas que trabaja por semana",
      ayuda: "Jornada completa: 48 horas (8 por día, seis días).",
      min: 1,
      max: 48,
      porDefecto: 48,
    },
    {
      id: "salarioPactado",
      tipo: "moneda",
      etiqueta: "Salario mensual que le pagan (opcional)",
      ayuda: "Para revisar si está por encima del mínimo. Sin contar alojamiento ni comida.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const horasDia = enMapa(valores["cr.jornada-diaria"], "diurna");
    const semanaCompleta = horasDia * 6;
    if (entrada.horasSemana > semanaCompleta) throw new ErrorEntrada(`La jornada ordinaria es de ${semanaCompleta} horas por semana como máximo.`, "horasSemana");
    const minimoCompleto = enMapa(valores["cr.salario-minimo-mes"], "trabajo-domestico");
    const diario = minimoCompleto / valores["cr.dias-mes-planilla"];
    const hora = diario / horasDia;
    const minimo = redondear((minimoCompleto * entrada.horasSemana) / semanaCompleta);
    const salario = entrada.salarioPactado ?? minimo;
    const sem = redondear(porcentaje(salario, valores["cr.ccss-sem-trabajador"]));
    const ivm = redondear(porcentaje(salario, valores["cr.ccss-ivm-trabajador"]));
    const bp = redondear(porcentaje(salario, valores["cr.banco-popular-trabajador"]));
    const rebajos = redondear(sem + ivm + bp);
    const observaciones = [
      "El alojamiento y la comida son salario en especie: no cuentan para llegar al mínimo.",
      `Le corresponden ${valores["cr.vacaciones-domestico"]} días de vacaciones pagadas por año, o la parte proporcional si el contrato termina antes.`,
    ];
    if (entrada.salarioPactado !== null && entrada.salarioPactado < minimo) {
      observaciones.unshift(`El salario que le pagan está por debajo del mínimo para ${entrada.horasSemana} horas por semana.`);
    }
    return {
      minimo,
      minimoDiario: redondear(diario),
      minimoHora: redondear(hora),
      rebajos,
      neto: redondear(salario - rebajos),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salario mínimo mensual para su jornada", formato: "moneda", destacada: true },
    { clave: "minimoDiario", etiqueta: "Salario mínimo por día", formato: "moneda" },
    { clave: "minimoHora", etiqueta: "Salario mínimo por hora", formato: "moneda" },
    { clave: "rebajos", etiqueta: "Rebajos de la Caja y el Banco Popular", formato: "moneda" },
    { clave: "neto", etiqueta: "Salario neto", formato: "moneda" },
  ],
});
