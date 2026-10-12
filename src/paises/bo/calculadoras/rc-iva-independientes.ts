import { definirCalculadora, porcentaje } from "@/motor/calculo";

const MESES_DEL_TRIMESTRE = 3;

export default definirCalculadora({
  id: "bo.rc-iva-independientes",
  mercado: "bo",
  concepto: "propio",
  slug: "rc-iva-independientes",
  estado: "publicado",
  requiere: {
    "bo.rc-iva-alicuota": "numero",
    "bo.iva": "numero",
    "bo.it": "numero",
    "bo.salario-minimo": "numero",
    "bo.rc-iva-independiente-computo-smn": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos del trimestre", ayuda: "Lo que cobró en los 3 meses del trimestre por su profesión, oficio o alquileres.", min: 0 },
    { id: "emiteFactura", tipo: "si-no", etiqueta: "Emite factura por esos ingresos", porDefecto: false },
    { id: "aportes", tipo: "moneda", etiqueta: "Aportes a la seguridad social pagados a tiempo en el trimestre", min: 0, porDefecto: 0 },
    { id: "facturas", tipo: "moneda", etiqueta: "Facturas de compras a su nombre del trimestre (opcional)", min: 0, requerido: false },
    { id: "saldoAnterior", tipo: "moneda", etiqueta: "Saldo a favor del trimestre anterior (opcional)", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const alicuota = valores["bo.rc-iva-alicuota"];
    // Si factura, el ingreso que se declara es la venta menos el IVA que contiene (D.S. 21531, art. 9 a).
    const computable = entrada.emiteFactura ? redondear(entrada.ingresos - porcentaje(entrada.ingresos, valores["bo.iva"])) : entrada.ingresos;
    const base = redondear(Math.max(0, computable - entrada.aportes));
    const impuesto = redondear(porcentaje(base, alicuota));
    const computoSmn = redondear(porcentaje(valores["bo.salario-minimo"] * valores["bo.rc-iva-independiente-computo-smn"] * MESES_DEL_TRIMESTRE, alicuota));
    // Mismo criterio que en dependientes: el cómputo de salarios mínimos solo cancela impuesto y no
    // genera saldo a favor.
    const impuestoNeto = redondear(Math.max(0, impuesto - computoSmn));
    const creditoFacturas = redondear(porcentaje(entrada.facturas ?? 0, alicuota));
    const disponible = redondear(creditoFacturas + (entrada.saldoAnterior ?? 0));
    const aPagar = redondear(Math.max(0, impuestoNeto - disponible));
    return {
      base,
      impuesto,
      computoSmn,
      creditoFacturas,
      aPagar,
      saldoAFavor: redondear(Math.max(0, disponible - impuestoNeto)),
      it: redondear(porcentaje(entrada.ingresos, valores["bo.it"])),
      observaciones: [
        "El RC-IVA del independiente se declara por trimestre. Los trimestres terminan el 31 de marzo, el 30 de junio, el 30 de septiembre y el 31 de diciembre.",
        "El IT se declara cada mes por separado. Lo mostramos sumado para el trimestre.",
      ],
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Ingreso sujeto al impuesto", formato: "moneda" },
    { clave: "impuesto", etiqueta: "RC-IVA determinado", formato: "moneda" },
    { clave: "computoSmn", etiqueta: "Cómputo por salarios mínimos", formato: "moneda" },
    { clave: "creditoFacturas", etiqueta: "Crédito por sus facturas", formato: "moneda", ocultarSiCero: true },
    { clave: "aPagar", etiqueta: "RC-IVA a pagar en el trimestre", formato: "moneda", destacada: true },
    { clave: "saldoAFavor", etiqueta: "Saldo a favor para el próximo trimestre", formato: "moneda", ocultarSiCero: true },
    { clave: "it", etiqueta: "IT de los tres meses", formato: "moneda" },
  ],
});
