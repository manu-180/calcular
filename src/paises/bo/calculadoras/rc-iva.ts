import { definirCalculadora } from "@/motor/calculo";
import { aportesLaborales, rcIva } from "../lib/planilla";

export default definirCalculadora({
  id: "bo.rc-iva",
  mercado: "bo",
  concepto: "impuesto-renta",
  slug: "rc-iva",
  estado: "publicado",
  requiere: {
    "bo.aportes-laborales": "mapa",
    "bo.ans-tasas": "mapa",
    "bo.ans-umbrales": "mapa",
    "bo.salario-minimo": "numero",
    "bo.rc-iva-alicuota": "numero",
    "bo.rc-iva-minimo-no-imponible": "numero",
    "bo.rc-iva-computo-smn": "numero",
  },
  campos: [
    { id: "totalGanado", tipo: "moneda", etiqueta: "Total ganado del mes", min: 0 },
    {
      id: "facturas",
      tipo: "moneda",
      etiqueta: "Facturas del Formulario 110",
      ayuda: "La suma de las facturas a su nombre que presenta este mes.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "saldoAnterior",
      tipo: "moneda",
      etiqueta: "Saldo a favor del mes anterior, ya actualizado (opcional)",
      ayuda: "Figura en su planilla tributaria. Se actualiza con la UFV.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const alicuota = valores["bo.rc-iva-alicuota"];
    const a = aportesLaborales(entrada.totalGanado, valores["bo.aportes-laborales"], valores["bo.ans-tasas"], valores["bo.ans-umbrales"], redondear);
    const r = rcIva(
      redondear(entrada.totalGanado - a.total),
      entrada.facturas,
      entrada.saldoAnterior ?? 0,
      {
        alicuota,
        salarioMinimo: valores["bo.salario-minimo"],
        minimoNoImponibleSmn: valores["bo.rc-iva-minimo-no-imponible"],
        computoSmn: valores["bo.rc-iva-computo-smn"],
      },
      redondear,
    );
    const facturasParaCubrir = redondear(Math.max(0, r.impuestoNeto - (entrada.saldoAnterior ?? 0)) / (alicuota / 100));
    const observaciones = ["Las facturas valen si tienen hasta 120 días de antigüedad y están a su nombre. Se entregan al empleador hasta el día 20 del mes."];
    if (r.impuestoNeto === 0) observaciones.push("Con este sueldo no paga RC-IVA: el cómputo del salario mínimo cubre el impuesto.");
    return {
      sueldoNeto: r.sueldoNeto,
      minimoNoImponible: r.minimoNoImponible,
      base: r.base,
      impuesto: r.impuesto,
      computoSalarioMinimo: r.computoSalarioMinimo,
      creditoFacturas: r.creditoFacturas,
      retencion: r.retencion,
      saldoAFavor: r.saldoAFavor,
      facturasParaCubrir,
      observaciones,
    };
  },
  resultado: [
    { clave: "sueldoNeto", etiqueta: "Sueldo después de aportes", formato: "moneda" },
    { clave: "minimoNoImponible", etiqueta: "Mínimo no imponible", formato: "moneda" },
    { clave: "base", etiqueta: "Base del impuesto", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto sobre la base", formato: "moneda" },
    { clave: "computoSalarioMinimo", etiqueta: "Cómputo sobre el salario mínimo", formato: "moneda" },
    { clave: "creditoFacturas", etiqueta: "Crédito por sus facturas", formato: "moneda", ocultarSiCero: true },
    { clave: "retencion", etiqueta: "RC-IVA que le retienen", formato: "moneda", destacada: true },
    { clave: "saldoAFavor", etiqueta: "Saldo a favor para el mes siguiente", formato: "moneda", ocultarSiCero: true },
    { clave: "facturasParaCubrir", etiqueta: "Facturas que necesita para no pagar", formato: "moneda", ocultarSiCero: true },
  ],
});
