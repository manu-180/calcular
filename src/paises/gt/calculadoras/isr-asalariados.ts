import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { isrAnual } from "../prestaciones";

export default definirCalculadora({
  id: "gt.isr-asalariados",
  mercado: "gt",
  concepto: "impuesto-renta",
  slug: "isr-asalariados",
  estado: "publicado",
  requiere: {
    "gt.isr-escala": "escala",
    "gt.isr-deduccion-gastos-personales": "numero",
    "gt.isr-deduccion-extraordinaria": "numero",
    "gt.isr-tope-planilla-iva": "numero",
  },
  campos: [
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      min: 0,
      ayuda: "Su salario ordinario más horas extra, comisiones y otros pagos fijos del mes.",
    },
    {
      id: "bonificaciones",
      tipo: "moneda",
      etiqueta: "Bonificaciones mensuales",
      min: 0,
      porDefecto: 0,
      ayuda: "La bonificación incentivo y otras bonificaciones. Pagan ISR aunque no paguen IGSS.",
    },
    {
      id: "igss",
      tipo: "moneda",
      etiqueta: "Descuento mensual del IGSS",
      min: 0,
      ayuda: "Cópielo de su recibo de pago o boleta.",
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses que va a trabajar este año", min: 1, max: 12, porDefecto: 12 },
    {
      id: "planillaIva",
      tipo: "moneda",
      etiqueta: "IVA de sus facturas del año (planilla del IVA)",
      min: 0,
      porDefecto: 0,
      ayuda: "El IVA que pagó en compras personales con factura a su NIT. Déjelo en cero si no presenta la planilla.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 1 || entrada.meses > 12) throw new ErrorEntrada("Indique entre 1 y 12 meses.", "meses");
    if (entrada.igss > entrada.sueldo) throw new ErrorEntrada("El descuento del IGSS no puede ser mayor que el salario.", "igss");
    const tope = valores["gt.isr-tope-planilla-iva"];
    const planilla = Math.min(entrada.planillaIva, tope);
    const rentaNeta = (entrada.sueldo + entrada.bonificaciones) * entrada.meses;
    const deducciones =
      valores["gt.isr-deduccion-gastos-personales"] + valores["gt.isr-deduccion-extraordinaria"] + entrada.igss * entrada.meses + planilla;
    const isr = isrAnual(rentaNeta, deducciones, valores["gt.isr-escala"], redondear);
    const mensual = redondear(isr.anual / entrada.meses);
    const observaciones: string[] = [];
    if (isr.anual === 0) observaciones.push("Con estos ingresos no paga ISR: las deducciones cubren toda su renta.");
    if (valores["gt.isr-deduccion-extraordinaria"] > 0) observaciones.push("Incluye la deducción extraordinaria de este año, que no hace falta comprobar.");
    if (entrada.planillaIva > tope) observaciones.push("La planilla del IVA tiene un tope: se tomó solo hasta ese monto.");
    observaciones.push("El aguinaldo y el Bono 14 no pagan ISR (hasta un salario cada uno), por eso no se suman.");
    return {
      rentaNeta: isr.rentaNeta,
      deducciones: isr.deducciones,
      imponible: isr.imponible,
      anual: isr.anual,
      mensual,
      observaciones,
    };
  },
  resultado: [
    { clave: "rentaNeta", etiqueta: "Ingresos del año que pagan ISR", formato: "moneda" },
    { clave: "deducciones", etiqueta: "Deducciones", formato: "moneda" },
    { clave: "imponible", etiqueta: "Renta imponible", formato: "moneda" },
    { clave: "anual", etiqueta: "ISR del año", formato: "moneda" },
    { clave: "mensual", etiqueta: "Retención mensual", formato: "moneda", destacada: true },
  ],
});
