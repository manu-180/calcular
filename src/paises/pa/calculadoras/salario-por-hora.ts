import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { horaDeMensual, semanalDeMensual } from "../reglas";

export default definirCalculadora({
  id: "pa.salario-por-hora",
  mercado: "pa",
  concepto: "propio",
  slug: "salario-por-hora",
  estado: "publicado",
  requiere: {
    "pa.jornada-semanal": "mapa",
    "pa.jornada-diaria": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "Tu jornada",
      opciones: [
        { valor: "diurna", etiqueta: "Diurna (entre las 6 a. m. y las 6 p. m.)" },
        { valor: "nocturna", etiqueta: "Nocturna (más de tres horas entre las 6 p. m. y las 6 a. m.)" },
        { valor: "mixta", etiqueta: "Mixta (de día y hasta tres horas de noche)" },
      ],
      porDefecto: "diurna",
    },
    {
      id: "horasSemana",
      tipo: "numero",
      etiqueta: "Horas que trabajas por semana",
      ayuda: "Déjalo vacío si trabajas la semana completa de tu jornada.",
      min: 1,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const maximo = enMapa(valores["pa.jornada-semanal"], entrada.jornada);
    const horasSemana = entrada.horasSemana ?? maximo;
    if (horasSemana > maximo) {
      throw new ErrorEntrada(`Tu jornada permite como máximo ${maximo} horas por semana. Lo que pase de ahí son horas extra.`, "horasSemana");
    }
    const hora = horaDeMensual(entrada.salario, horasSemana);
    const horasDia = enMapa(valores["pa.jornada-diaria"], entrada.jornada);
    return {
      hora: redondear(hora),
      horasMes: redondear((horasSemana * 52) / 12),
      diario: redondear(hora * horasDia),
      semanal: redondear(semanalDeMensual(entrada.salario)),
      quincenal: redondear(entrada.salario / 2),
      observaciones: [
        "El salario diario es el de una jornada completa de tu tipo. Con este valor por hora se calculan las horas extra y los recargos de domingo y feriado.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Salario por hora", formato: "moneda", destacada: true },
    { clave: "horasMes", etiqueta: "Horas de trabajo en un mes", formato: "horas" },
    { clave: "diario", etiqueta: "Salario por día de jornada completa", formato: "moneda" },
    { clave: "semanal", etiqueta: "Salario por semana", formato: "moneda" },
    { clave: "quincenal", etiqueta: "Salario por quincena", formato: "moneda" },
  ],
});
