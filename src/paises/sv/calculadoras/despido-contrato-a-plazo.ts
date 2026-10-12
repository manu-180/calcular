import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { servicio, textoServicio } from "../lib/fechas";

const DIAS_DEL_MES = 30;
const DIAS_DEL_ANIO = 365;

// Art. 59: con contrato a plazo se paga el salario básico del tiempo que faltaba, pero nunca más de lo
// que daría el art. 58 si el contrato fuera por tiempo indefinido (con su tope y su mínimo).
export default definirCalculadora({
  id: "sv.despido-contrato-a-plazo",
  mercado: "sv",
  concepto: "propio",
  slug: "despido-contrato-a-plazo",
  estado: "publicado",
  requiere: {
    "sv.salario-minimo-diario": "numero-por-region",
    "sv.indemnizacion-dias-por-anio": "numero",
    "sv.indemnizacion-dias-minimo": "numero",
    "sv.indemnizacion-tope": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico, sin horas extra.", min: 0 },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezó el contrato" },
    { id: "fin", tipo: "fecha", etiqueta: "Último día trabajado", porDefecto: "hoy" },
    { id: "vencimiento", tipo: "fecha", etiqueta: "Fecha en que vencía el contrato" },
    { id: "region", tipo: "region", etiqueta: "Sector de la empresa", porDefecto: "comercio-servicios" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fin < entrada.inicio) throw new ErrorEntrada("El último día trabajado tiene que ser posterior al inicio del contrato.", "fin");
    if (entrada.vencimiento <= entrada.fin) throw new ErrorEntrada("El contrato tiene que vencer después del último día trabajado.", "vencimiento");
    const diario = entrada.salario / DIAS_DEL_MES;
    const diasFaltantes = diasEntre(entrada.fin, entrada.vencimiento);
    const porPlazo = redondear(diario * diasFaltantes);
    const s = servicio(entrada.inicio, entrada.fin);
    const porAnio = valores["sv.indemnizacion-dias-por-anio"];
    const dias = Math.max(porAnio * s.anios + (porAnio * s.diasRestantes) / DIAS_DEL_ANIO, valores["sv.indemnizacion-dias-minimo"]);
    const tope = valores["sv.indemnizacion-tope"] * porRegion(valores["sv.salario-minimo-diario"], entrada.region);
    const maximo = redondear(Math.min(diario, tope) * dias);
    const observaciones: string[] = [];
    if (porPlazo > maximo) observaciones.push("Lo que faltaba del contrato pasa el máximo de la ley, así que le corresponde lo que cobraría con un contrato indefinido.");
    observaciones.push("Además le deben las vacaciones y el aguinaldo proporcionales.");
    return {
      tiempo: textoServicio(s),
      diasFaltantes,
      porPlazo,
      maximo,
      indemnizacion: Math.min(porPlazo, maximo),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diasFaltantes", etiqueta: "Días que faltaban del contrato", formato: "dias" },
    { clave: "porPlazo", etiqueta: "Salario del tiempo que faltaba", formato: "moneda" },
    { clave: "maximo", etiqueta: "Máximo según el art. 58", formato: "moneda" },
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda", destacada: true },
  ],
});
