import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { despidoMensual } from "../lib/despido";
import { aniosCumplidos, diasInclusive, fecha, mayor } from "../lib/fechas";
import { diasDeLicenciaAnual } from "../lib/licencia";
import { calcularSueldo, REQUIERE_SUELDO } from "../lib/sueldo";

// Cuota de aguinaldo en curso al egreso: diciembre a mayo (se paga en junio) o junio a noviembre
// (se paga en diciembre), según el Decreto-Ley 14.525.
function semestreDeAguinaldo(egreso: FechaISO): { desde: FechaISO; hasta: FechaISO } {
  const anio = Number(egreso.slice(0, 4));
  const mes = Number(egreso.slice(5, 7));
  if (mes >= 6 && mes <= 11) return { desde: fecha(anio, 6, 1), hasta: fecha(anio, 11, 30) };
  if (mes === 12) return { desde: fecha(anio, 12, 1), hasta: fecha(anio + 1, 5, 31) };
  return { desde: fecha(anio - 1, 12, 1), hasta: fecha(anio, 5, 31) };
}

export default definirCalculadora({
  id: "uy.liquidacion-por-egreso",
  mercado: "uy",
  concepto: "liquidacion-final",
  slug: "liquidacion-por-egreso",
  estado: "publicado",
  requiere: {
    ...REQUIERE_SUELDO,
    "uy.licencia-dias": "numero",
    "uy.salario-vacacional": "numero",
    "uy.despido-tope-meses": "numero",
  },
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Por qué termina el trabajo",
      opciones: [
        { valor: "renuncia", etiqueta: "Renuncia" },
        { valor: "despido", etiqueta: "Despido" },
      ],
      porDefecto: "renuncia",
    },
    { id: "nominal", tipo: "moneda", etiqueta: "Sueldo nominal mensual", ayuda: "Si cobrás horas extra o comisiones, sumá el promedio mensual del último año.", min: 0 },
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "egreso", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "licenciaPendiente",
      tipo: "entero",
      etiqueta: "Días de licencia de años anteriores sin gozar",
      ayuda: "Si no te quedó licencia pendiente, dejá 0.",
      min: 0,
      max: 120,
      porDefecto: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores de 18 a tu cargo", min: 0, max: 15, porDefecto: 0 },
    {
      id: "conyuge",
      tipo: "si-no",
      etiqueta: "Tenés cónyuge o concubino a cargo en el Fonasa",
      ayuda: "Cambia tus descuentos, y el salario vacacional se paga sobre el sueldo líquido.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.egreso < entrada.ingreso) throw new ErrorEntrada("El último día de trabajo tiene que ser posterior al ingreso.", "egreso");

    const semestre = semestreDeAguinaldo(entrada.egreso);
    const diasSemestre = diasInclusive(semestre.desde, semestre.hasta);
    const diasEnSemestre = diasInclusive(mayor(semestre.desde, entrada.ingreso), entrada.egreso);
    const aguinaldo = redondear(((entrada.nominal / 2) * diasEnSemestre) / diasSemestre);

    const anio = Number(entrada.egreso.slice(0, 4));
    const inicioAnio = fecha(anio, 1, 1);
    const diasAnio = diasInclusive(inicioAnio, fecha(anio, 12, 31));
    const diasTrabajadosAnio = diasInclusive(mayor(inicioAnio, entrada.ingreso), entrada.egreso);
    const antiguedad = aniosCumplidos(entrada.ingreso, entrada.egreso);
    const anuales = diasDeLicenciaAnual(valores["uy.licencia-dias"], antiguedad);
    const diasGenerados = redondear((anuales * diasTrabajadosAnio) / diasAnio);
    const diasLicencia = redondear(diasGenerados + entrada.licenciaPendiente);

    const sueldo = calcularSueldo(valores, { nominal: entrada.nominal, hijos: entrada.hijos, hijosDiscapacidad: 0, conyuge: entrada.conyuge }, redondear);
    const licencia = redondear((entrada.nominal / 30) * diasLicencia);
    const salarioVacacional = redondear(porcentaje((sueldo.liquido / 30) * diasLicencia, valores["uy.salario-vacacional"]));

    const despido =
      entrada.motivo === "despido"
        ? despidoMensual(
            { sueldo: entrada.nominal, ingreso: entrada.ingreso, egreso: entrada.egreso, incidencias: true },
            { topeMeses: valores["uy.despido-tope-meses"], diasLicencia: valores["uy.licencia-dias"] },
            redondear,
          ).indemnizacion
        : 0;

    const observaciones: string[] = [
      "Aguinaldo, licencia y salario vacacional se pagan también si renunciás. Solo la notoria mala conducta hace perder el aguinaldo y la indemnización.",
    ];
    if (entrada.motivo === "despido") observaciones.push("La indemnización suma a la base el aguinaldo y la licencia, como indica el MTSS.");
    return {
      aguinaldo,
      diasGenerados,
      diasLicencia,
      licencia,
      salarioVacacional,
      despido,
      total: redondear(aguinaldo + licencia + salarioVacacional + despido),
      observaciones,
    };
  },
  resultado: [
    { clave: "aguinaldo", etiqueta: "Aguinaldo proporcional", formato: "moneda" },
    { clave: "diasGenerados", etiqueta: "Días de licencia generados este año", formato: "dias" },
    { clave: "diasLicencia", etiqueta: "Días de licencia a pagar", formato: "dias" },
    { clave: "licencia", etiqueta: "Licencia no gozada", formato: "moneda" },
    { clave: "salarioVacacional", etiqueta: "Salario vacacional", formato: "moneda" },
    { clave: "despido", etiqueta: "Indemnización por despido", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de la liquidación", formato: "moneda", destacada: true },
  ],
});
