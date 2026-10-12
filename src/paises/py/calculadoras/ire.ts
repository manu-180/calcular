import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.ire",
  mercado: "py",
  concepto: "propio",
  slug: "ire",
  estado: "publicado",
  requiere: {
    "py.ire-tasa": "numero",
    "py.ire-simple-presunta": "numero",
    "py.ire-simple-tope": "numero",
  },
  campos: [
    {
      id: "regimen",
      tipo: "opcion",
      etiqueta: "Régimen",
      opciones: [
        { valor: "simple", etiqueta: "IRE SIMPLE (empresas medianas)" },
        { valor: "general", etiqueta: "IRE general" },
      ],
      porDefecto: "simple",
    },
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos del año (facturación bruta)", min: 0 },
    {
      id: "egresos",
      tipo: "moneda",
      etiqueta: "Costos y gastos deducibles del año",
      ayuda: "Solo los relacionados con tu actividad y respaldados con comprobantes.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const real = Math.max(0, entrada.ingresos - entrada.egresos);
    const simple = entrada.regimen === "simple";
    // Ley 6380, art. 26: en el SIMPLE la renta neta es la menor entre la real y la presunta.
    const presunta = simple ? redondear(porcentaje(entrada.ingresos, valores["py.ire-simple-presunta"])) : null;
    const rentaNeta = presunta === null ? real : Math.min(real, presunta);
    const observaciones: string[] = [];
    if (simple && presunta !== null) observaciones.push(rentaNeta === presunta ? "Te conviene la renta presunta: es menor que la diferencia entre ingresos y gastos." : "Te conviene la renta real: tus gastos documentados la dejan por debajo de la presunta.");
    if (simple && entrada.ingresos > valores["py.ire-simple-tope"]) observaciones.push("El SIMPLE es para quienes facturaron hasta el tope el año anterior. Si lo pasaste, este año te toca el régimen general.");
    if (!simple) observaciones.push("En el régimen general la renta neta sale de tu contabilidad, con reglas propias para cada gasto. Esto es una estimación.");
    observaciones.push("La declaración jurada del IRE es anual y vence según la terminación de tu RUC.");
    return {
      rentaReal: real,
      rentaPresunta: presunta,
      rentaNeta,
      impuesto: redondear(porcentaje(rentaNeta, valores["py.ire-tasa"])),
      observaciones,
    };
  },
  resultado: [
    { clave: "rentaReal", etiqueta: "Renta real (ingresos menos gastos)", formato: "moneda" },
    { clave: "rentaPresunta", etiqueta: "Renta presunta del SIMPLE", formato: "moneda" },
    { clave: "rentaNeta", etiqueta: "Renta neta que paga", formato: "moneda" },
    { clave: "impuesto", etiqueta: "IRE a pagar", formato: "moneda", destacada: true },
  ],
});
