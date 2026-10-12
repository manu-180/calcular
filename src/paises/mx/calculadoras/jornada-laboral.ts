import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.jornada-laboral",
  mercado: "mx",
  concepto: "propio",
  slug: "jornada-laboral",
  estado: "publicado",
  requiere: {
    "mx.jornada-semanal": "numero",
    "mx.horas-extra-semana": "numero",
    "mx.horas-triples-semana": "numero",
    "mx.maximo-horas-dia": "numero",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Días que trabajas a la semana", min: 1, max: 6, porDefecto: 5 },
    { id: "horasActuales", tipo: "numero", etiqueta: "Horas que trabajas hoy a la semana", min: 0, max: 80, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1 || entrada.dias > 6) throw new ErrorEntrada("La ley da al menos un día de descanso por cada seis de trabajo.", "dias");
    const maxima = valores["mx.jornada-semanal"];
    const exceso = entrada.horasActuales === null ? null : Math.max(0, redondear(entrada.horasActuales - maxima));
    const observaciones: string[] = [];
    if (exceso !== null && exceso > 0) observaciones.push("Las horas que pasan de la jornada máxima se pagan como horas extra.");
    return {
      maxima,
      porDia: redondear(maxima / entrada.dias),
      extraDobles: valores["mx.horas-extra-semana"],
      extraTriples: valores["mx.horas-triples-semana"],
      exceso,
      observaciones,
    };
  },
  resultado: [
    { clave: "maxima", etiqueta: "Jornada máxima a la semana", formato: "horas", destacada: true },
    { clave: "porDia", etiqueta: "Horas por día si las repartes parejo", formato: "horas" },
    { clave: "extraDobles", etiqueta: "Horas extra dobles permitidas por semana", formato: "horas" },
    { clave: "extraTriples", etiqueta: "Horas extra triples permitidas además", formato: "horas" },
    { clave: "exceso", etiqueta: "Horas que pasas de la jornada máxima", formato: "horas" },
  ],
});
