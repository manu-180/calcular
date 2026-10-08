import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { servicio, textoServicio } from "../lib/fechas";

const DIAS_DEL_MES = 30;

// El art. 8 de la ley paga "por cada año de servicio" y, a diferencia del art. 58 del Código de
// Trabajo, no menciona fracciones de año: se cuentan solo años completos.
export default definirCalculadora({
  id: "sv.renuncia-voluntaria",
  mercado: "sv",
  concepto: "propio",
  slug: "renuncia-voluntaria",
  estado: "publicado",
  requiere: {
    "sv.salario-minimo-diario": "numero-por-region",
    "sv.renuncia-dias-por-anio": "numero",
    "sv.renuncia-tope": "numero",
    "sv.renuncia-anios-minimos": "numero",
    "sv.renuncia-preaviso": "numero",
    "sv.renuncia-preaviso-jefaturas": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico, sin horas extra.", min: 0 },
    { id: "inicio", tipo: "fecha", etiqueta: "Fecha en que empezó a trabajar" },
    { id: "fin", tipo: "fecha", etiqueta: "Fecha en que se hace efectiva la renuncia", porDefecto: "hoy" },
    { id: "region", tipo: "region", etiqueta: "Sector de la empresa", porDefecto: "comercio-servicios" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fin < entrada.inicio) throw new ErrorEntrada("La fecha de la renuncia tiene que ser posterior a la fecha de inicio.", "fin");
    const s = servicio(entrada.inicio, entrada.fin);
    const minimos = valores["sv.renuncia-anios-minimos"];
    const diario = entrada.salario / DIAS_DEL_MES;
    const tope = valores["sv.renuncia-tope"] * porRegion(valores["sv.salario-minimo-diario"], entrada.region);
    const diarioUsado = Math.min(diario, tope);
    const tieneDerecho = s.anios >= minimos;
    const dias = tieneDerecho ? valores["sv.renuncia-dias-por-anio"] * s.anios : 0;
    const observaciones: string[] = [];
    if (!tieneDerecho) observaciones.push(`La prestación se gana con al menos ${minimos} años de servicio continuo con el mismo patrono.`);
    if (tieneDerecho && diario > tope) observaciones.push("Su salario diario pasa el tope de la ley, así que se calcula con el tope.");
    if (tieneDerecho && s.diasRestantes > 0) observaciones.push("La ley paga por cada año completo de servicio. Los días después del último aniversario no suman.");
    observaciones.push(
      `Para cobrarla tiene que avisar por escrito con ${valores["sv.renuncia-preaviso"]} días de anticipación (${valores["sv.renuncia-preaviso-jefaturas"]} si es jefatura o personal especializado).`,
    );
    observaciones.push("Además le deben el aguinaldo y las vacaciones, completos o proporcionales.");
    return {
      tiempo: textoServicio(s),
      diarioUsado: redondear(diarioUsado),
      dias,
      prestacion: redondear(diarioUsado * dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "diarioUsado", etiqueta: "Salario diario para el cálculo", formato: "moneda" },
    { clave: "dias", etiqueta: "Días de salario", formato: "dias" },
    { clave: "prestacion", etiqueta: "Prestación por renuncia voluntaria", formato: "moneda", destacada: true },
  ],
});
