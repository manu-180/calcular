import { definirCalculadora } from "@/motor/calculo";
import { calcularSueldo, REQUIERE_SUELDO } from "../lib/sueldo";

export default definirCalculadora({
  id: "uy.irpf",
  mercado: "uy",
  concepto: "impuesto-renta",
  slug: "irpf",
  estado: "publicado",
  requiere: { ...REQUIERE_SUELDO },
  campos: [
    {
      id: "nominal",
      tipo: "moneda",
      etiqueta: "Sueldo nominal del mes",
      ayuda: "Sin aguinaldo ni salario vacacional, que tienen su propia retención.",
      min: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores de 18 a tu cargo", min: 0, max: 15, porDefecto: 0 },
    { id: "hijosDiscapacidad", tipo: "entero", etiqueta: "Hijos con discapacidad a tu cargo", min: 0, max: 15, porDefecto: 0 },
    {
      id: "reparto",
      tipo: "opcion",
      etiqueta: "Deducción de los hijos",
      opciones: [
        { valor: "entera", etiqueta: "La uso entera" },
        { valor: "mitad", etiqueta: "La comparto en partes iguales con el otro progenitor" },
      ],
      porDefecto: "entera",
    },
    {
      id: "conyuge",
      tipo: "si-no",
      etiqueta: "Tenés cónyuge o concubino a cargo en el Fonasa",
      ayuda: "Cambia lo que aportás al Fonasa, y ese aporte se deduce del IRPF.",
      porDefecto: false,
    },
    {
      id: "otrasDeducciones",
      tipo: "moneda",
      etiqueta: "Otras deducciones del mes",
      ayuda: "Por ejemplo, el Fondo de Solidaridad si sos egresado universitario. Si no tenés, dejá 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = calcularSueldo(
      valores,
      {
        nominal: entrada.nominal,
        hijos: entrada.hijos,
        hijosDiscapacidad: entrada.hijosDiscapacidad,
        conyuge: entrada.conyuge,
        deduccionCompartida: entrada.reparto === "mitad",
        otrasDeducciones: entrada.otrasDeducciones,
      },
      redondear,
    );
    const observaciones: string[] = [];
    if (r.conIncremento) observaciones.push("Tu nominal pasa 10 BPC, así que la renta del mes se calcula con un 6 % extra.");
    observaciones.push("Lo que te retienen cada mes es un adelanto. El impuesto final se ajusta con la liquidación anual.");
    return {
      rentaComputable: r.rentaComputable,
      impuestoEscala: r.impuestoEscala,
      tasaMarginal: r.tasaMarginal,
      aportes: redondear(r.montepio + r.fonasa + r.frl),
      deduccionHijos: r.deduccionHijos,
      deducciones: r.deducciones,
      tasaDeducciones: r.tasaDeducciones,
      descuentoDeducciones: r.descuentoDeducciones,
      irpf: r.irpf,
      tasaEfectiva: entrada.nominal > 0 ? redondear((r.irpf / entrada.nominal) * 100) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "rentaComputable", etiqueta: "Renta del mes para el IRPF", formato: "moneda" },
    { clave: "impuestoEscala", etiqueta: "Impuesto según la escala", formato: "moneda" },
    { clave: "tasaMarginal", etiqueta: "Tu franja más alta", formato: "porcentaje" },
    { clave: "aportes", etiqueta: "Aportes a la seguridad social (deducibles)", formato: "moneda" },
    { clave: "deduccionHijos", etiqueta: "Deducción por hijos", formato: "moneda", ocultarSiCero: true },
    { clave: "deducciones", etiqueta: "Total de deducciones", formato: "moneda" },
    { clave: "tasaDeducciones", etiqueta: "Porcentaje que se descuenta de las deducciones", formato: "porcentaje" },
    { clave: "descuentoDeducciones", etiqueta: "Descuento por deducciones", formato: "moneda" },
    { clave: "irpf", etiqueta: "IRPF del mes", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre tu nominal", formato: "porcentaje" },
  ],
});
