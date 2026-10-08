import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.sueldo-liquido",
  h1: "Calculadora de sueldo líquido",
  title: "Sueldo líquido en Bolivia: aportes a la Gestora y RC-IVA",
  description: "Calcule su líquido pagable: total ganado menos los aportes a la Gestora, el Aporte Nacional Solidario y el RC-IVA, con el salario mínimo de {{bo.salario-minimo}}.",
  intro: [
    "El líquido pagable es lo que recibe en mano. Sale del total ganado menos los aportes laborales y la retención de RC-IVA.",
    "Escriba su total ganado del mes. Si presenta facturas en el Formulario 110, agréguelas.",
  ],
  comoSeCalcula: [
    "Aportes a la Gestora sobre el total ganado: cotización de {{bo.aportes-laborales[cotizacion]}}, prima por riesgo común de {{bo.aportes-laborales[riesgo-comun]}}, comisión de {{bo.aportes-laborales[comision]}} y aporte solidario de {{bo.aportes-laborales[solidario]}}.",
    "Aporte Nacional Solidario: {{bo.ans-tasas[tramo-1]}} de lo que pasa de {{bo.ans-umbrales[tramo-1]}}, más {{bo.ans-tasas[tramo-2]}} de lo que pasa de {{bo.ans-umbrales[tramo-2]}}, más {{bo.ans-tasas[tramo-3]}} de lo que pasa de {{bo.ans-umbrales[tramo-3]}}.",
    "RC-IVA: al sueldo después de aportes se le restan {{bo.rc-iva-minimo-no-imponible}} salarios mínimos y sobre el resto se aplica el {{bo.rc-iva-alicuota}}. A ese impuesto se le descuenta el {{bo.rc-iva-alicuota}} de {{bo.rc-iva-computo-smn}} salario mínimo y el {{bo.rc-iva-alicuota}} de sus facturas.",
  ],
  faq: [
    {
      pregunta: "¿Desde qué sueldo se paga RC-IVA?",
      respuesta: "Con las reglas de hoy, cuando su sueldo después de aportes pasa de tres salarios mínimos ({{bo.salario-minimo}} cada uno). Por debajo, el cómputo del salario mínimo cubre todo el impuesto.",
    },
    {
      pregunta: "¿Qué es el Aporte Nacional Solidario?",
      respuesta: "Un aporte extra para el Fondo Solidario que pagan quienes ganan más de {{bo.ans-umbrales[tramo-1]}} por mes, solo sobre lo que pasa de ese monto.",
    },
    {
      pregunta: "¿Cómo bajo la retención de RC-IVA?",
      respuesta: "Presentando facturas a su nombre en el Formulario 110 hasta el día 20 del mes. Cada factura le descuenta el {{bo.rc-iva-alicuota}} de su monto.",
    },
    {
      pregunta: "¿Al aguinaldo le descuentan aportes?",
      respuesta: "No. El aguinaldo se paga entero, sin aportes ni RC-IVA.",
    },
  ],
  glosario: [
    { termino: "Total ganado", definicion: "Todo lo que se cobra en el mes antes de descuentos." },
    { termino: "Líquido pagable", definicion: "Lo que recibe en mano después de aportes y RC-IVA." },
    { termino: "Gestora", definicion: "La Gestora Pública de la Seguridad Social de Largo Plazo, que reemplazó a las AFP." },
    { termino: "RC-IVA", definicion: "Régimen Complementario al IVA: el impuesto que se retiene a los sueldos." },
  ],
});
