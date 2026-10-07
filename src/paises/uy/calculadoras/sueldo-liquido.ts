import { definirCalculadora } from "@/motor/calculo";
import { calcularSueldo, REQUIERE_SUELDO } from "../lib/sueldo";

export default definirCalculadora({
  id: "uy.sueldo-liquido",
  mercado: "uy",
  concepto: "sueldo-neto",
  slug: "sueldo-liquido",
  estado: "publicado",
  requiere: { ...REQUIERE_SUELDO },
  campos: [
    {
      id: "nominal",
      tipo: "moneda",
      etiqueta: "Sueldo nominal del mes",
      ayuda: "Todo lo que cobrás antes de descuentos: sueldo base, horas extra, comisiones y primas. Sin aguinaldo ni salario vacacional.",
      min: 0,
    },
    {
      id: "hijos",
      tipo: "entero",
      etiqueta: "Hijos menores de 18 a tu cargo",
      min: 0,
      max: 15,
      porDefecto: 0,
    },
    {
      id: "hijosDiscapacidad",
      tipo: "entero",
      etiqueta: "Hijos con discapacidad a tu cargo",
      ayuda: "De cualquier edad. Para el IRPF se deducen el doble que un hijo menor.",
      min: 0,
      max: 15,
      porDefecto: 0,
    },
    {
      id: "conyuge",
      tipo: "si-no",
      etiqueta: "Tenés cónyuge o concubino a cargo en el Fonasa",
      ayuda: "Marcalo si tu pareja se atiende por tu Fonasa porque no tiene cobertura propia.",
      porDefecto: false,
    },
    {
      id: "reparto",
      tipo: "opcion",
      etiqueta: "Deducción de los hijos en el IRPF",
      opciones: [
        { valor: "entera", etiqueta: "La uso entera" },
        { valor: "mitad", etiqueta: "La comparto en partes iguales con el otro progenitor" },
      ],
      porDefecto: "entera",
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
      },
      redondear,
    );
    const descuentos = redondear(r.montepio + r.fonasa + r.frl + r.irpf);
    const observaciones: string[] = [];
    if (r.superaTope) observaciones.push("Tu nominal pasa el tope de aportación jubilatoria: el montepío se calcula solo hasta ese tope.");
    if (r.conIncremento) observaciones.push("Como tu nominal pasa 10 BPC, para el IRPF se le suma un 6 %. Así lo manda el decreto que regula la retención.");
    if (r.irpf === 0 && r.impuestoEscala > 0) observaciones.push("Tus deducciones cubren todo el impuesto del mes: no te retienen IRPF.");
    return {
      nominal: entrada.nominal,
      montepio: r.montepio,
      fonasa: r.fonasa,
      tasaFonasa: r.tasaFonasa,
      frl: r.frl,
      irpf: r.irpf,
      descuentos,
      liquido: r.liquido,
      observaciones,
    };
  },
  resultado: [
    { clave: "nominal", etiqueta: "Sueldo nominal", formato: "moneda" },
    { clave: "montepio", etiqueta: "Aporte jubilatorio (montepío)", formato: "moneda" },
    { clave: "fonasa", etiqueta: "Fonasa", formato: "moneda" },
    { clave: "tasaFonasa", etiqueta: "Tasa de Fonasa que te corresponde", formato: "porcentaje" },
    { clave: "frl", etiqueta: "Fondo de Reconversión Laboral", formato: "moneda" },
    { clave: "irpf", etiqueta: "IRPF", formato: "moneda" },
    { clave: "descuentos", etiqueta: "Total de descuentos", formato: "moneda" },
    { clave: "liquido", etiqueta: "Sueldo líquido", formato: "moneda", destacada: true },
  ],
});
