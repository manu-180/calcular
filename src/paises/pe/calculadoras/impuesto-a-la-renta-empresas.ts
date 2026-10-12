import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.renta-tercera",
  mercado: "pe",
  concepto: "propio",
  slug: "impuesto-a-la-renta-empresas",
  estado: "publicado",
  requiere: {
    "pe.tasa-renta-tercera": "numero",
    "pe.pago-cuenta-tercera": "numero",
  },
  campos: [
    { id: "ingresosMes", tipo: "moneda", etiqueta: "Ingresos netos del mes", ayuda: "Ventas sin IGV, menos devoluciones y descuentos.", min: 0 },
    {
      id: "coeficiente",
      tipo: "porcentaje",
      etiqueta: "Coeficiente de tu empresa (en %)",
      ayuda: "Impuesto del año anterior dividido entre sus ingresos netos. Déjalo vacío si no tuviste impuesto el año pasado.",
      min: 0,
      requerido: false,
    },
    { id: "rentaNeta", tipo: "moneda", etiqueta: "Utilidad del año (renta neta)", ayuda: "Opcional: para estimar el impuesto anual.", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["pe.pago-cuenta-tercera"];
    // LIR, art. 85: el pago a cuenta es el mayor entre el coeficiente y el porcentaje mínimo.
    const tasaPagoCuenta = Math.max(entrada.coeficiente ?? 0, minimo);
    const pagoCuenta = redondear(porcentaje(entrada.ingresosMes, tasaPagoCuenta));
    const impuestoAnual = entrada.rentaNeta === null ? null : redondear(porcentaje(entrada.rentaNeta, valores["pe.tasa-renta-tercera"]));
    const observaciones: string[] = [];
    if (entrada.coeficiente !== null && entrada.coeficiente < minimo) {
      observaciones.push(`Tu coeficiente es menor que ${minimo} %: se usa ${minimo} %.`);
    }
    observaciones.push("En la declaración anual restas los pagos a cuenta del impuesto del año. Si pagaste de más, tienes saldo a favor.");
    return { tasaPagoCuenta, pagoCuenta, impuestoAnual, observaciones };
  },
  resultado: [
    { clave: "pagoCuenta", etiqueta: "Pago a cuenta del mes", formato: "moneda", destacada: true },
    { clave: "tasaPagoCuenta", etiqueta: "Tasa que se aplica", formato: "porcentaje", decimales: 2 },
    { clave: "impuestoAnual", etiqueta: "Impuesto a la renta anual", formato: "moneda" },
  ],
});
