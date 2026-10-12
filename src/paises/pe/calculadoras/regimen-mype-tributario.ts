import { aplicarEscalaMarginal, definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.rmt",
  mercado: "pe",
  concepto: "propio",
  slug: "regimen-mype-tributario",
  estado: "publicado",
  requiere: {
    "pe.uit": "numero",
    "pe.escala-rmt": "escala",
    "pe.pago-cuenta-rmt": "numero",
    "pe.limite-pago-cuenta-rmt": "numero",
    "pe.pago-cuenta-tercera": "numero",
    "pe.limite-rmt": "numero",
  },
  campos: [
    { id: "ingresosMes", tipo: "moneda", etiqueta: "Ingresos netos del mes", ayuda: "Ventas sin IGV, menos devoluciones y descuentos.", min: 0 },
    { id: "acumulado", tipo: "moneda", etiqueta: "Ingresos netos acumulados en el año (con este mes)", min: 0, requerido: false },
    {
      id: "rentaNeta",
      tipo: "moneda",
      etiqueta: "Utilidad del año (renta neta)",
      ayuda: "Opcional: ingresos menos gastos deducibles del año, para estimar el impuesto anual.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const uit = valores["pe.uit"];
    const limitePagoCuenta = valores["pe.limite-pago-cuenta-rmt"] * uit;
    const acumulado = entrada.acumulado ?? entrada.ingresosMes;
    const pasoLimite = acumulado > limitePagoCuenta;
    const tasaPagoCuenta = pasoLimite ? valores["pe.pago-cuenta-tercera"] : valores["pe.pago-cuenta-rmt"];
    const pagoCuenta = redondear(porcentaje(entrada.ingresosMes, tasaPagoCuenta));
    const escala = valores["pe.escala-rmt"].map((f) => ({ ...f, desde: f.desde * uit, hasta: f.hasta === null ? null : f.hasta * uit }));
    const impuestoAnual = entrada.rentaNeta === null ? null : redondear(aplicarEscalaMarginal(escala, entrada.rentaNeta));
    const observaciones: string[] = [];
    if (pasoLimite) {
      observaciones.push(
        `Pasaste las ${valores["pe.limite-pago-cuenta-rmt"]} UIT de ingresos en el año: el pago a cuenta es como en el régimen general (el mayor entre el coeficiente y el ${valores["pe.pago-cuenta-tercera"]} %). Aquí usamos el ${valores["pe.pago-cuenta-tercera"]} %.`,
      );
    }
    if (acumulado > valores["pe.limite-rmt"] * uit) {
      observaciones.push(
        `Tus ingresos superan las ${valores["pe.limite-rmt"]} UIT del RMT: desde el mes en que las pasaste determinas el impuesto con el régimen general.`,
      );
    }
    observaciones.push("Los pagos a cuenta del año se restan del impuesto anual en tu declaración jurada.");
    return { tasaPagoCuenta, pagoCuenta, impuestoAnual, limitePagoCuenta: redondear(limitePagoCuenta), observaciones };
  },
  resultado: [
    { clave: "pagoCuenta", etiqueta: "Pago a cuenta del mes", formato: "moneda", destacada: true },
    { clave: "tasaPagoCuenta", etiqueta: "Tasa del pago a cuenta", formato: "porcentaje", decimales: 1 },
    { clave: "impuestoAnual", etiqueta: "Impuesto a la renta anual estimado", formato: "moneda" },
    { clave: "limitePagoCuenta", etiqueta: "Ingresos hasta los que se paga la tasa reducida", formato: "moneda" },
  ],
});
