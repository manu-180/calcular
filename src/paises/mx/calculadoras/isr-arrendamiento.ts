import { aplicarEscala, definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.isr-arrendamiento",
  mercado: "mx",
  concepto: "propio",
  slug: "isr-arrendamiento",
  estado: "publicado",
  requiere: {
    "mx.tarifa-isr-mensual": "escala",
    "mx.deduccion-ciega-arrendamiento": "numero",
    "mx.retencion-isr-arrendamiento": "numero",
  },
  campos: [
    { id: "renta", tipo: "moneda", etiqueta: "Renta cobrada en el mes (sin IVA)", min: 0 },
    {
      id: "deduccion",
      tipo: "opcion",
      etiqueta: "Cómo deduces",
      opciones: [
        { valor: "ciega", etiqueta: "Deducción opcional (porcentaje fijo)" },
        { valor: "reales", etiqueta: "Gastos reales con factura" },
      ],
      porDefecto: "ciega",
    },
    { id: "gastos", tipo: "moneda", etiqueta: "Gastos deducibles del mes", min: 0, requerido: false, ayuda: "Solo si deduces gastos reales: mantenimiento, intereses, seguros, agua, depreciación." },
    { id: "predial", tipo: "moneda", etiqueta: "Predial pagado del mes", min: 0, requerido: false },
    {
      id: "inquilino",
      tipo: "opcion",
      etiqueta: "Quién te paga la renta",
      opciones: [
        { valor: "fisica", etiqueta: "Una persona física" },
        { valor: "moral", etiqueta: "Una empresa (persona moral)" },
      ],
      porDefecto: "fisica",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const predial = entrada.predial ?? 0;
    const deducciones = redondear(
      entrada.deduccion === "ciega" ? porcentaje(entrada.renta, valores["mx.deduccion-ciega-arrendamiento"]) + predial : (entrada.gastos ?? 0) + predial,
    );
    const base = Math.max(0, redondear(entrada.renta - deducciones));
    const isr = redondear(aplicarEscala(valores["mx.tarifa-isr-mensual"], base));
    const retencion = entrada.inquilino === "moral" ? redondear(porcentaje(entrada.renta, valores["mx.retencion-isr-arrendamiento"])) : 0;
    const observaciones: string[] = [];
    if (retencion > isr) observaciones.push("Te retuvieron más de lo que te toca pagar este mes. La diferencia la recuperas en tu declaración anual.");
    return {
      deducciones,
      base,
      isr,
      retencion,
      aPagar: Math.max(0, redondear(isr - retencion)),
      observaciones,
    };
  },
  resultado: [
    { clave: "deducciones", etiqueta: "Deducciones", formato: "moneda" },
    { clave: "base", etiqueta: "Base del pago provisional", formato: "moneda" },
    { clave: "isr", etiqueta: "ISR del mes según la tarifa", formato: "moneda" },
    { clave: "retencion", etiqueta: "ISR que te retuvo el inquilino", formato: "moneda", ocultarSiCero: true },
    { clave: "aPagar", etiqueta: "ISR a pagar en tu declaración mensual", formato: "moneda", destacada: true },
  ],
});
