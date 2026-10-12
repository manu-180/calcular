import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { antiguedad } from "../lib/fechas";

// Contratos firmados antes de esta fecha y vigentes al 1/12/1990 no tienen el tope de 11 años
// (Código del Trabajo, artículo 7 transitorio). Igual que en el finiquito.
const SIN_TOPE_ANTES_DE = "1981-08-14";

export default definirCalculadora({
  id: "cl.indemnizacion-por-anos-de-servicio",
  mercado: "cl",
  concepto: "indemnizacion-despido",
  slug: "indemnizacion-por-anos-de-servicio",
  estado: "publicado",
  requiere: {
    "cl.indemnizacion-dias-por-anio": "numero",
    "cl.indemnizacion-tope-dias": "numero",
    "cl.tope-indemnizacion": "numero",
    "cl.uf": "serie",
  },
  campos: [
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezaste a trabajar" },
    { id: "termino", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "remuneracion",
      tipo: "moneda",
      etiqueta: "Última remuneración mensual",
      ayuda: "Sueldo más lo fijo de cada mes (colación, movilización, cotizaciones). Sin horas extra ni gratificación anual.",
      min: 0,
    },
    { id: "sinAviso", tipo: "si-no", etiqueta: "Te despidieron sin 30 días de aviso", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.termino < entrada.inicio) throw new ErrorEntrada("El último día tiene que ser posterior a la fecha en que empezaste.", "termino");
    const a = antiguedad(entrada.inicio, entrada.termino);
    const tope = redondear(valores["cl.tope-indemnizacion"] * valores["cl.uf"].valor);
    const base = Math.min(entrada.remuneracion, tope);
    const masDeSeisMeses = a.meses > 6 || (a.meses === 6 && a.dias > 0);
    const aniosServicio = a.anios + (masDeSeisMeses ? 1 : 0);
    const sinTope = entrada.inicio < SIN_TOPE_ANTES_DE;
    const diasSinTope = aniosServicio * valores["cl.indemnizacion-dias-por-anio"];
    const dias = a.anios < 1 ? 0 : sinTope ? diasSinTope : Math.min(diasSinTope, valores["cl.indemnizacion-tope-dias"]);
    const indemnizacionAnios = redondear((base * dias) / 30);
    const indemnizacionAviso = entrada.sinAviso ? base : 0;

    const observaciones: string[] = [];
    if (a.anios < 1) observaciones.push("Con menos de un año de contrato no corresponde indemnización por años de servicio.");
    if (!sinTope && diasSinTope > valores["cl.indemnizacion-tope-dias"] && a.anios >= 1) observaciones.push("Llegas al tope de 11 años: los años extra no suman indemnización.");
    if (sinTope && a.anios >= 1) observaciones.push("Como entraste antes del 14 de agosto de 1981, tu indemnización no tiene el tope de 11 años.");
    if (entrada.remuneracion > tope) observaciones.push("Tu remuneración pasa el tope de 90 UF: se calcula con el tope.");

    return {
      antiguedad: `${a.anios} ${a.anios === 1 ? "año" : "años"}, ${a.meses} ${a.meses === 1 ? "mes" : "meses"} y ${a.dias} ${a.dias === 1 ? "día" : "días"}`,
      aniosServicio: a.anios < 1 ? 0 : Math.round(dias / valores["cl.indemnizacion-dias-por-anio"]),
      base,
      tope,
      indemnizacionAnios,
      indemnizacionAviso,
      total: indemnizacionAnios + indemnizacionAviso,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total de indemnizaciones", formato: "moneda", destacada: true },
    { clave: "indemnizacionAnios", etiqueta: "Indemnización por años de servicio", formato: "moneda" },
    { clave: "indemnizacionAviso", etiqueta: "Indemnización sustitutiva del aviso previo", formato: "moneda", ocultarSiCero: true },
    { clave: "antiguedad", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "aniosServicio", etiqueta: "Años que se pagan", formato: "anios" },
    { clave: "base", etiqueta: "Remuneración que se usa", formato: "moneda" },
    { clave: "tope", etiqueta: "Tope de 90 UF en pesos", formato: "moneda" },
  ],
});
