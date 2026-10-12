import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.sueldo-por-hora",
  mercado: "pe",
  concepto: "propio",
  slug: "sueldo-por-hora",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Cobras asignación familiar", porDefecto: false },
    { id: "jornada", tipo: "numero", etiqueta: "Horas de tu jornada diaria", min: 1, max: 8, porDefecto: 8 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.jornada <= 0 || entrada.jornada > 8) throw new ErrorEntrada("La jornada ordinaria va de 1 a 8 horas por día.", "jornada");
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion);
    // Mismo divisor que usa el MTPE para el valor hora de las horas extras: 30 días y la jornada diaria.
    const valorDia = redondear(remuneracion / 30);
    const valorHora = redondear(remuneracion / 30 / entrada.jornada);
    const minimoHora = redondear(valores["pe.rmv"] / 30 / 8);
    return {
      remuneracion,
      valorDia,
      valorHora,
      minimoHora,
      quincena: redondear(remuneracion / 2),
      anual: redondear(remuneracion * 12),
    };
  },
  resultado: [
    { clave: "valorHora", etiqueta: "Tu sueldo por hora", formato: "moneda", destacada: true },
    { clave: "valorDia", etiqueta: "Tu sueldo por día", formato: "moneda" },
    { clave: "quincena", etiqueta: "Tu quincena", formato: "moneda" },
    { clave: "anual", etiqueta: "Tus 12 sueldos del año (sin gratificaciones)", formato: "moneda" },
    { clave: "minimoHora", etiqueta: "Hora de la remuneración mínima (jornada de 8 horas)", formato: "moneda" },
  ],
});
