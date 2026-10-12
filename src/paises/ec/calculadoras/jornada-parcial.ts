import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.jornada-parcial",
  mercado: "ec",
  concepto: "propio",
  slug: "jornada-parcial",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.jornada-semanal": "numero",
    "ec.aporte-personal-iess": "numero",
  },
  campos: [
    { id: "horas", tipo: "numero", etiqueta: "Horas que trabajas por semana", min: 1, porDefecto: 20 },
    {
      id: "sueldoCompleto",
      tipo: "moneda",
      etiqueta: "Sueldo de una jornada completa en tu puesto",
      ayuda: "Si no lo sabes, deja el campo vacío y usamos el salario básico unificado.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const semanal = valores["ec.jornada-semanal"];
    if (entrada.horas > semanal) throw new ErrorEntrada(`La jornada completa es de ${semanal} horas por semana. Para más horas usa la calculadora de horas extras.`, "horas");
    const sbu = valores["ec.sbu"];
    const completo = entrada.sueldoCompleto === null || entrada.sueldoCompleto === 0 ? sbu : Math.max(entrada.sueldoCompleto, sbu);
    const proporcion = entrada.horas / semanal;
    const sueldo = redondear(completo * proporcion);
    const minimo = redondear(sbu * proporcion);
    const aporte = redondear(porcentaje(sueldo, valores["ec.aporte-personal-iess"]));
    const observaciones: string[] = [];
    if (entrada.sueldoCompleto !== null && entrada.sueldoCompleto > 0 && entrada.sueldoCompleto < sbu) {
      observaciones.push("El sueldo de jornada completa no puede ser menor al salario básico: calculamos con el básico.");
    }
    observaciones.push("Los décimos, las vacaciones y el fondo de reserva también se pagan en proporción a tu jornada.");
    return {
      proporcion: redondear(proporcion * 100),
      sueldo,
      minimo,
      aporte,
      neto: redondear(sueldo - aporte),
      decimoTercero: redondear(sueldo / 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "proporcion", etiqueta: "Tu jornada frente a la completa", formato: "porcentaje" },
    { clave: "minimo", etiqueta: "Mínimo legal para tu jornada", formato: "moneda" },
    { clave: "sueldo", etiqueta: "Sueldo mensual de tu jornada", formato: "moneda", destacada: true },
    { clave: "aporte", etiqueta: "Aporte personal al IESS", formato: "moneda" },
    { clave: "neto", etiqueta: "Lo que recibes en el mes", formato: "moneda" },
    { clave: "decimoTercero", etiqueta: "Décimo tercero mensual (si lo cobras cada mes)", formato: "moneda" },
  ],
});
