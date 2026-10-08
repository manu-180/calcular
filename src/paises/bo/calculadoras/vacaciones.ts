import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { tiempoEntre } from "../lib/fechas";
import { diasDeVacacion, diasProporcionales } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.vacaciones",
  mercado: "bo",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "bo.vacaciones-dias": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "corte", tipo: "fecha", etiqueta: "Calcular a la fecha", porDefecto: "hoy" },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Promedio del total ganado de los últimos 3 meses (opcional)",
      ayuda: "Si lo escribe, le decimos cuánto vale cada día de vacación.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.corte < entrada.ingreso) throw new ErrorEntrada("La fecha de cálculo tiene que ser posterior a la de ingreso.", "corte");
    const t = tiempoEntre(entrada.ingreso, entrada.corte);
    const mapa = valores["bo.vacaciones-dias"];
    const diasUltimoAnio = t.anios >= 1 ? diasDeVacacion(mapa, t.anios) : 0;
    const diasAnioEnCurso = diasDeVacacion(mapa, t.anios + 1);
    const fraccionExacta = t.anios >= 1 ? diasProporcionales(diasAnioEnCurso, t) : 0;
    const fraccion = redondear(fraccionExacta);
    const diario = entrada.sueldo === null ? null : entrada.sueldo / 30;
    const observaciones: string[] = ["Son días hábiles: no cuentan los domingos ni los feriados."];
    if (t.anios < 1) observaciones.push("Las vacaciones se ganan al cumplir el primer año de trabajo.");
    else observaciones.push("La fracción del año en curso se cobra solo si deja el trabajo antes de cumplir el próximo año.");
    return {
      anios: t.anios,
      diasUltimoAnio,
      diasAnioEnCurso,
      fraccion,
      montoAnual: diario === null ? null : redondear(diario * diasUltimoAnio),
      montoFraccion: diario === null ? null : redondear(diario * fraccionExacta),
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Años cumplidos", formato: "anios" },
    { clave: "diasUltimoAnio", etiqueta: "Días hábiles por el último año cumplido", formato: "dias", destacada: true },
    { clave: "diasAnioEnCurso", etiqueta: "Días que ganará al cumplir el próximo año", formato: "dias" },
    { clave: "fraccion", etiqueta: "Días por fracción del año en curso", formato: "dias", decimales: 2, ocultarSiCero: true },
    { clave: "montoAnual", etiqueta: "Valor de la vacación del último año", formato: "moneda", ocultarSiCero: true },
    { clave: "montoFraccion", etiqueta: "Valor de la fracción", formato: "moneda", ocultarSiCero: true },
  ],
});
