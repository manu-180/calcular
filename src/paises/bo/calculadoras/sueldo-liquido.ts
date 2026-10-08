import { definirCalculadora } from "@/motor/calculo";
import { aportesLaborales, rcIva } from "../lib/planilla";

export default definirCalculadora({
  id: "bo.sueldo-liquido",
  mercado: "bo",
  concepto: "sueldo-neto",
  slug: "sueldo-liquido",
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
    {
      id: "totalGanado",
      tipo: "moneda",
      etiqueta: "Total ganado del mes",
      ayuda: "Haber básico más bono de antigüedad, horas extras, comisiones y otros pagos del mes.",
      min: 0,
    },
    {
      id: "facturas",
      tipo: "moneda",
      etiqueta: "Facturas que presenta en el Formulario 110 (opcional)",
      ayuda: "La suma de sus facturas del mes. Solo cuenta si paga RC-IVA.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tg = entrada.totalGanado;
    const smn = valores["bo.salario-minimo"];
    const a = aportesLaborales(tg, valores["bo.aportes-laborales"], valores["bo.ans-tasas"], valores["bo.ans-umbrales"], redondear);
    const sueldoNeto = redondear(tg - a.total);
    const r = rcIva(
      sueldoNeto,
      entrada.facturas ?? 0,
      0,
      {
        alicuota: valores["bo.rc-iva-alicuota"],
        salarioMinimo: smn,
        minimoNoImponibleSmn: valores["bo.rc-iva-minimo-no-imponible"],
        computoSmn: valores["bo.rc-iva-computo-smn"],
      },
      redondear,
    );
    const observaciones = ["Descontamos los aportes laborales y el RC-IVA. Si le descuentan otros conceptos (anticipos, cuota sindical), réstelos aparte."];
    if (r.retencion > 0) observaciones.push("Si presenta más facturas en el Formulario 110, la retención de RC-IVA baja.");
    if (r.saldoAFavor > 0) observaciones.push("Sus facturas superan el impuesto del mes: la diferencia queda como saldo a favor para los meses siguientes.");
    return {
      cotizacion: a.cotizacion,
      riesgoComun: a.riesgoComun,
      comision: a.comision,
      solidario: a.solidario,
      gestora: a.gestora,
      nacionalSolidario: a.nacionalSolidario,
      rcIva: r.retencion,
      liquido: redondear(sueldoNeto - r.retencion),
      saldoAFavor: r.saldoAFavor,
      observaciones,
    };
  },
  resultado: [
    { clave: "cotizacion", etiqueta: "Cotización mensual a la Gestora (vejez)", formato: "moneda" },
    { clave: "riesgoComun", etiqueta: "Prima por riesgo común", formato: "moneda" },
    { clave: "comision", etiqueta: "Comisión de la Gestora", formato: "moneda" },
    { clave: "solidario", etiqueta: "Aporte solidario del asegurado", formato: "moneda" },
    { clave: "gestora", etiqueta: "Total de aportes a la Gestora", formato: "moneda" },
    { clave: "nacionalSolidario", etiqueta: "Aporte Nacional Solidario", formato: "moneda", ocultarSiCero: true },
    { clave: "rcIva", etiqueta: "Retención de RC-IVA", formato: "moneda", ocultarSiCero: true },
    { clave: "liquido", etiqueta: "Líquido pagable", formato: "moneda", destacada: true },
    { clave: "saldoAFavor", etiqueta: "Saldo a favor de RC-IVA para el mes siguiente", formato: "moneda", ocultarSiCero: true },
  ],
});
