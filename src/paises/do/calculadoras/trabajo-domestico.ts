import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad, mesesEnElAnio, textoAntiguedad } from "../lib/fechas";

export default definirCalculadora({
  id: "do.trabajo-domestico",
  mercado: "do",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    "do.salario-minimo-hogar": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual en efectivo", ayuda: "Lo que te pagan en dinero, sin contar la comida ni el alojamiento.", min: 0 },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar en esa casa" },
    { id: "corte", tipo: "fecha", etiqueta: "Fecha para el cálculo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.corte < entrada.inicio) throw new ErrorEntrada("La fecha del cálculo tiene que ser posterior a la fecha en que empezaste.", "corte");
    const minimo = valores["do.salario-minimo-hogar"];
    const a = antiguedad(entrada.inicio, entrada.corte);
    const meses = mesesEnElAnio(entrada.corte, entrada.inicio, entrada.corte);
    const observaciones: string[] = [];
    const faltante = redondear(Math.max(0, minimo - entrada.salario));
    if (faltante > 0) observaciones.push("Tu salario está por debajo del mínimo para el trabajo del hogar. La diferencia te la deben.");
    observaciones.push(
      a.anios >= 1
        ? "Ya cumpliste un año: te tocan dos semanas de vacaciones pagadas por cada año de servicio."
        : "Las dos semanas de vacaciones pagadas te tocan al cumplir un año de servicio.",
    );
    observaciones.push("Tienes derecho a un descanso semanal de 36 horas seguidas y a 9 horas de reposo entre una jornada y otra.");
    return {
      minimo,
      faltante,
      antiguedad: textoAntiguedad(a),
      meses: redondear(meses),
      regalia: redondear((entrada.salario * meses) / 12),
      especie: redondear(entrada.salario / 2),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimo", etiqueta: "Salario mínimo del trabajo del hogar", formato: "moneda" },
    { clave: "faltante", etiqueta: "Lo que falta para llegar al mínimo", formato: "moneda", ocultarSiCero: true },
    { clave: "antiguedad", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "meses", etiqueta: "Meses trabajados este año", formato: "meses", decimales: 2 },
    { clave: "regalia", etiqueta: "Salario de Navidad de este año", formato: "moneda", destacada: true },
    { clave: "especie", etiqueta: "Valor que la ley da a la comida y el alojamiento", formato: "moneda", ayuda: "La ley los estima en la mitad del salario en efectivo. No se descuentan del salario." },
  ],
});
