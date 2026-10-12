import { definirCalculadora, porcentaje, porRegion } from "@/motor/calculo";
import { OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.isr-horas-extra",
  mercado: "mx",
  concepto: "propio",
  slug: "isr-horas-extra",
  estado: "publicado",
  requiere: {
    "mx.exencion-horas-extra-porcentaje": "numero",
    "mx.exencion-horas-extra-uma": "numero",
    "mx.uma-diaria": "numero",
    "mx.salario-minimo": "numero-por-region",
  },
  campos: [
    { id: "pago", tipo: "moneda", etiqueta: "Pago de la semana por horas extra dobles y descansos trabajados", min: 0, ayuda: "Solo lo que está dentro del límite legal. Las horas triples van en el campo siguiente." },
    { id: "triples", tipo: "moneda", etiqueta: "Pago de horas extra triples de la semana", min: 0, requerido: false },
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "region", tipo: "region", etiqueta: "Dónde trabajas", porDefecto: "general" },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const ganaMinimo = diario <= porRegion(valores["mx.salario-minimo"], entrada.region);
    const tope = redondear(valores["mx.exencion-horas-extra-uma"] * valores["mx.uma-diaria"]);
    const exento = ganaMinimo ? entrada.pago : Math.min(redondear(porcentaje(entrada.pago, valores["mx.exencion-horas-extra-porcentaje"])), tope);
    const triples = entrada.triples ?? 0;
    const observaciones: string[] = [];
    if (ganaMinimo) observaciones.push("Con el salario mínimo, las horas extra dentro del límite legal no pagan ISR.");
    if (triples > 0) observaciones.push("Las horas triples pasan el límite legal: pagan ISR completas.");
    return {
      tope: ganaMinimo ? null : tope,
      exento,
      gravado: redondear(entrada.pago - exento + triples),
      observaciones,
    };
  },
  resultado: [
    { clave: "tope", etiqueta: "Tope exento por semana", formato: "moneda" },
    { clave: "exento", etiqueta: "Parte que no paga ISR", formato: "moneda", destacada: true },
    { clave: "gravado", etiqueta: "Parte que paga ISR", formato: "moneda" },
  ],
});
