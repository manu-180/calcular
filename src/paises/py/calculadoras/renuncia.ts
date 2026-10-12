import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { antiguedad, diasInclusive, fecha, mayor } from "../lib/fechas";
import { diasPreaviso } from "../lib/laboral";

export default definirCalculadora({
  id: "py.renuncia",
  mercado: "py",
  concepto: "propio",
  slug: "renuncia",
  estado: "publicado",
  requiere: {
    "py.preaviso-dias": "mapa",
    "py.divisor-salario-diario": "numero",
    "py.preaviso-omitido-trabajador": "numero",
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
    { id: "egreso", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "preavisoDado",
      tipo: "si-no",
      etiqueta: "Avisaste con anticipación y trabajaste el preaviso",
      porDefecto: true,
    },
    {
      id: "cobradoEnElAnio",
      tipo: "moneda",
      etiqueta: "Total cobrado este año, desde enero",
      ayuda: "Si lo dejás vacío, lo estimamos con tu salario promedio.",
      min: 0,
      requerido: false,
    },
    {
      id: "vacacionesPendientes",
      tipo: "entero",
      etiqueta: "Días de vacaciones ya ganadas que no tomaste",
      min: 0,
      max: 120,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior a la fecha de ingreso.", "egreso");
    const divisor = valores["py.divisor-salario-diario"];
    const diario = entrada.salario / divisor;
    const dias = diasPreaviso(valores["py.preaviso-dias"], antiguedad(entrada.ingreso, entrada.egreso));
    // Art. 90: quien renuncia sin preaviso debe una parte del salario de ese período.
    const descuentoPreaviso = entrada.preavisoDado ? 0 : redondear(porcentaje(diario * dias, valores["py.preaviso-omitido-trabajador"]));
    // Art. 221: las vacaciones ya causadas se pagan siempre, también al renunciar.
    const vacaciones = redondear(diario * entrada.vacacionesPendientes);
    const anio = Number(entrada.egreso.slice(0, 4));
    const estimado = entrada.cobradoEnElAnio === null;
    const cobrado = estimado ? (entrada.salario * diasInclusive(mayor(fecha(anio, 1, 1), entrada.ingreso), entrada.egreso)) / divisor : entrada.cobradoEnElAnio;
    const aguinaldo = redondear(cobrado / 12);
    const observaciones = ["Al renunciar no hay indemnización. Cobrás el aguinaldo proporcional y las vacaciones que ya ganaste."];
    if (estimado) observaciones.push("Estimamos lo cobrado en el año con tu salario promedio y los días trabajados desde enero.");
    if (descuentoPreaviso > 0) observaciones.push(`Tu preaviso era de ${dias} días. Si no lo diste, el empleador puede descontarte la mitad de ese salario.`);
    observaciones.push("Si renunciás por una causa justificada (por ejemplo, falta de pago del salario), te corresponde lo mismo que en un despido sin causa.");
    return {
      aguinaldo,
      vacaciones,
      descuentoPreaviso: descuentoPreaviso === 0 ? 0 : -descuentoPreaviso,
      total: redondear(aguinaldo + vacaciones - descuentoPreaviso),
      observaciones,
    };
  },
  resultado: [
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones ganadas no tomadas", formato: "moneda", ocultarSiCero: true },
    { clave: "descuentoPreaviso", etiqueta: "Descuento por no dar preaviso", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
