import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasInclusive, fecha, mayor } from "../lib/fechas";
import { aniosIndemnizables } from "../lib/laboral";

export default definirCalculadora({
  id: "py.fallecimiento-del-trabajador",
  mercado: "py",
  concepto: "propio",
  slug: "fallecimiento-del-trabajador",
  estado: "publicado",
  requiere: {
    "py.indemnizacion-dias-por-anio": "numero",
    "py.indemnizacion-fallecimiento": "numero",
    "py.divisor-salario-diario": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual promedio de los últimos 6 meses",
      ayuda: "Con horas extra y comisiones.",
      min: 0,
    },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fallecimiento", tipo: "fecha", etiqueta: "Fecha del fallecimiento" },
    {
      id: "cobradoEnElAnio",
      tipo: "moneda",
      etiqueta: "Total cobrado este año, desde enero",
      ayuda: "Si lo dejás vacío, lo estimamos con el salario promedio.",
      min: 0,
      requerido: false,
    },
    {
      id: "vacacionesPendientes",
      tipo: "entero",
      etiqueta: "Días de vacaciones ya ganadas que no tomó",
      min: 0,
      max: 120,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fallecimiento < entrada.ingreso) throw new ErrorEntrada("La fecha del fallecimiento tiene que ser posterior a la fecha de ingreso.", "fallecimiento");
    const divisor = valores["py.divisor-salario-diario"];
    const diario = entrada.salario / divisor;
    const anios = aniosIndemnizables(entrada.ingreso, entrada.fallecimiento);
    const completa = diario * valores["py.indemnizacion-dias-por-anio"] * anios;
    // Art. 91, segundo párrafo: los herederos cobran una parte de la indemnización por despido.
    const indemnizacion = redondear(porcentaje(completa, valores["py.indemnizacion-fallecimiento"]));
    const vacaciones = redondear(diario * entrada.vacacionesPendientes);
    const anio = Number(entrada.fallecimiento.slice(0, 4));
    const estimado = entrada.cobradoEnElAnio === null;
    const cobrado = estimado ? (entrada.salario * diasInclusive(mayor(fecha(anio, 1, 1), entrada.ingreso), entrada.fallecimiento)) / divisor : entrada.cobradoEnElAnio;
    const aguinaldo = redondear(cobrado / 12);
    const observaciones = [
      "Los herederos solo tienen que acreditar el vínculo. La pareja que convivió públicamente al menos dos años cuenta como viuda o viudo.",
      "Aparte, el IPS puede pagar una pensión a la familia o un subsidio por fallecimiento, según los aportes.",
    ];
    if (estimado) observaciones.push("Estimamos lo cobrado en el año con el salario promedio y los días trabajados desde enero.");
    return {
      anios,
      indemnizacion,
      aguinaldo,
      vacaciones,
      total: redondear(indemnizacion + aguinaldo + vacaciones),
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Años que se indemnizan", formato: "anios" },
    { clave: "indemnizacion", etiqueta: "Indemnización para los herederos", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones ganadas no tomadas", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar por los herederos", formato: "moneda", destacada: true },
  ],
});
