import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { domingoDePascua, fechaDe } from "../lib/fechas";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.feriados",
  mercado: "ni",
  concepto: "propio",
  slug: "feriados",
  estado: "publicado",
  requiere: {
    "ni.recargo-horas-extra": "numero",
  },
  campos: [
    { id: "anio", tipo: "entero", etiqueta: "Año", min: 2000, max: 2100, porDefecto: 2026 },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0, requerido: false, ayuda: "Solo si querés saber cuánto te pagan por trabajar un feriado." },
    { id: "trabajados", tipo: "entero", etiqueta: "Feriados que trabajaste", min: 0, max: 9, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const a = entrada.anio;
    // Artículo 66: los dos días de Semana Santa se mueven con la Pascua; el resto tiene fecha fija.
    const pascua = domingoDePascua(a);
    const diario = entrada.salario === null ? null : redondear(entrada.salario / DIAS_MES);
    const porFeriado = diario === null ? null : redondear(diario + porcentaje(diario, valores["ni.recargo-horas-extra"]));
    const observaciones = [
      "Son los feriados nacionales obligatorios del artículo 66 del Código del Trabajo: se descansan con salario.",
      "El gobierno puede declarar otros días de asueto. En Managua también son de asueto el 1 y el 10 de agosto; en el resto del país, el día principal de la fiesta del lugar.",
    ];
    if (porFeriado !== null) observaciones.push("El pago por trabajar el feriado es aparte de tu salario del mes, que ya incluye el día feriado.");
    return {
      anioNuevo: fechaDe(a, 1, 1),
      juevesSanto: sumarDias(pascua, -3),
      viernesSanto: sumarDias(pascua, -2),
      diaDelTrabajo: fechaDe(a, 5, 1),
      revolucion: fechaDe(a, 7, 19),
      sanJacinto: fechaDe(a, 9, 14),
      independencia: fechaDe(a, 9, 15),
      purisima: fechaDe(a, 12, 8),
      navidad: fechaDe(a, 12, 25),
      diario,
      porFeriado,
      total: porFeriado === null || entrada.trabajados === 0 ? null : redondear(porFeriado * entrada.trabajados),
      observaciones,
    };
  },
  resultado: [
    { clave: "anioNuevo", etiqueta: "Año Nuevo", formato: "fecha" },
    { clave: "juevesSanto", etiqueta: "Jueves Santo", formato: "fecha" },
    { clave: "viernesSanto", etiqueta: "Viernes Santo", formato: "fecha" },
    { clave: "diaDelTrabajo", etiqueta: "Día del Trabajo", formato: "fecha" },
    { clave: "revolucion", etiqueta: "19 de Julio", formato: "fecha" },
    { clave: "sanJacinto", etiqueta: "Batalla de San Jacinto", formato: "fecha" },
    { clave: "independencia", etiqueta: "Día de la Independencia", formato: "fecha" },
    { clave: "purisima", etiqueta: "La Purísima (Inmaculada Concepción)", formato: "fecha" },
    { clave: "navidad", etiqueta: "Navidad", formato: "fecha" },
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "porFeriado", etiqueta: "Pago por cada feriado trabajado", formato: "moneda" },
    { clave: "total", etiqueta: "Total por feriados trabajados", formato: "moneda", destacada: true },
  ],
});
