import { aplicarEscala, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.rst",
  mercado: "do",
  concepto: "regimen-simplificado",
  slug: "rst",
  estado: "publicado",
  requiere: {
    "do.isr-asalariados": "escala",
    "do.rst-reduccion-ingresos": "numero",
    "do.rst-tasa-juridicas": "numero",
    "do.rst-tope-ingresos": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Quién declara",
      opciones: [
        { valor: "fisica", etiqueta: "Persona física (servicios profesionales u oficios)" },
        { valor: "juridica", etiqueta: "Persona jurídica (empresa de servicios o producción)" },
      ],
      porDefecto: "fisica",
    },
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del año", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const tope = valores["do.rst-tope-ingresos"];
    if (entrada.ingresos > tope) throw new ErrorEntrada("Con esos ingresos no puedes estar en el RST basado en ingresos este año: superan el tope de la DGII.", "ingresos");
    const observaciones: string[] = [];
    if (entrada.tipo === "juridica") {
      const tasa = valores["do.rst-tasa-juridicas"];
      const impuesto = redondear(porcentaje(entrada.ingresos, tasa));
      observaciones.push("Ese monto cubre el ISR y el ITBIS del año juntos.");
      return { rentaNeta: null, isr: null, impuesto, tasaEfectiva: tasa, tope, observaciones };
    }
    const rentaNeta = redondear(entrada.ingresos - porcentaje(entrada.ingresos, valores["do.rst-reduccion-ingresos"]));
    const isr = redondear(aplicarEscala(valores["do.isr-asalariados"], rentaNeta));
    observaciones.push("Supone que no cobras salario en el año. Si cobras, la DGII descuenta la parte de la exención contributiva que ya usaste en tu empleo.");
    observaciones.push("No resta los gastos educativos de la Ley 179-09, que también se pueden deducir.");
    return {
      rentaNeta,
      isr,
      impuesto: isr,
      tasaEfectiva: entrada.ingresos > 0 ? redondear((isr / entrada.ingresos) * 100) : 0,
      tope,
      observaciones,
    };
  },
  resultado: [
    { clave: "rentaNeta", etiqueta: "Renta neta imponible (ingresos menos la reducción)", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR según la escala anual", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto a pagar en el año", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Porcentaje real sobre tus ingresos", formato: "porcentaje" },
    { clave: "tope", etiqueta: "Ingreso máximo para estar en el RST", formato: "moneda" },
  ],
});
