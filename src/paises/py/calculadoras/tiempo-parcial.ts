import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.tiempo-parcial",
  mercado: "py",
  concepto: "propio",
  slug: "tiempo-parcial",
  estado: "publicado",
  requiere: {
    "py.minimos": "mapa",
    "py.tiempo-parcial-horas": "mapa",
    "py.divisor-jornal": "numero",
    "py.horas-jornada-diurna": "numero",
    "py.horas-jornada-nocturna": "numero",
    "py.ips-trabajador": "numero",
  },
  campos: [
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Horario",
      opciones: [
        { valor: "diurna", etiqueta: "De día (entre las 6 y las 20)" },
        { valor: "nocturna", etiqueta: "De noche (entre las 20 y las 6)" },
      ],
      porDefecto: "diurna",
    },
    { id: "horasMes", tipo: "numero", etiqueta: "Horas trabajadas en el mes", min: 0, max: 200 },
    { id: "horasSemana", tipo: "numero", etiqueta: "Horas por semana del contrato", ayuda: "Opcional. Sirve para saber si es tiempo parcial.", min: 0, max: 60, requerido: false },
    {
      id: "convenido",
      tipo: "moneda",
      etiqueta: "Salario mensual de tiempo completo pactado",
      ayuda: "Opcional. Si es mayor al mínimo, tu hora se calcula con ese salario.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const noche = entrada.jornada === "nocturna";
    const horaMinima = enMapa(valores["py.minimos"], noche ? "hora-parcial-nocturna" : "hora-parcial");
    // Ley 6339, art. 6: la hora sale del salario dividido 26 y por la jornada, nunca por debajo del mínimo.
    const horasJornada = noche ? valores["py.horas-jornada-nocturna"] : valores["py.horas-jornada-diurna"];
    const horaConvenida = entrada.convenido === null ? 0 : entrada.convenido / valores["py.divisor-jornal"] / horasJornada;
    const hora = Math.max(horaMinima, horaConvenida);
    const bruto = redondear(hora * entrada.horasMes);
    const ips = redondear(porcentaje(bruto, valores["py.ips-trabajador"]));
    const limites = valores["py.tiempo-parcial-horas"];
    const observaciones: string[] = [];
    if (entrada.horasSemana !== null) {
      const minimo = enMapa(limites, "minimo");
      const maximo = enMapa(limites, "maximo");
      if (entrada.horasSemana > maximo) observaciones.push(`Con más de ${maximo} horas por semana el contrato se considera de tiempo completo.`);
      else if (entrada.horasSemana < minimo) observaciones.push(`La ley de tiempo parcial es para contratos de ${minimo} a ${maximo} horas por semana.`);
    }
    observaciones.push("Tenés los mismos derechos que a tiempo completo: aguinaldo, vacaciones, IPS y bonificación familiar.");
    return {
      hora: redondear(hora),
      bruto,
      ips,
      neto: bruto - ips,
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora", formato: "moneda" },
    { clave: "bruto", etiqueta: "Salario bruto del mes", formato: "moneda" },
    { clave: "ips", etiqueta: "Aporte al IPS", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que cobrás en mano", formato: "moneda", destacada: true },
  ],
});
