import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.rc-iva",
  h1: "Calculadora de RC-IVA para dependientes 2026",
  title: "RC-IVA dependientes 2026: calcule su retención y facturas",
  description: "Calcule el RC-IVA de su sueldo con el mínimo no imponible de {{bo.rc-iva-minimo-no-imponible}} salarios mínimos y vea cuántas facturas necesita en el Formulario 110.",
  intro: [
    "El RC-IVA (Régimen Complementario al IVA) de los dependientes es el {{bo.rc-iva-alicuota}} de su sueldo después de aportes y de {{bo.rc-iva-minimo-no-imponible}} salarios mínimos, menos el {{bo.rc-iva-alicuota}} de {{bo.rc-iva-computo-smn}} salario mínimo. El empleador se lo retiene cada mes, y usted lo puede bajar presentando facturas a su nombre en el Formulario 110.",
    "Escriba su total ganado y la suma de sus facturas del mes.",
  ],
  comoSeCalcula: [
    "Al total ganado se le restan los aportes laborales: así queda el sueldo después de aportes.",
    "A eso se le resta el mínimo no imponible: {{bo.rc-iva-minimo-no-imponible}} salarios mínimos de {{bo.salario-minimo}}. Sobre el resto se aplica el {{bo.rc-iva-alicuota}}.",
    "Del impuesto se descuenta el {{bo.rc-iva-alicuota}} de {{bo.rc-iva-computo-smn}} salario mínimo, el {{bo.rc-iva-alicuota}} de sus facturas y el saldo a favor que traiga del mes anterior.",
    "Si queda impuesto, se lo retienen. Si sus facturas superan el impuesto, la diferencia queda como saldo a favor, que se actualiza con la UFV.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el RC-IVA de un dependiente?",
      respuesta: "Al total ganado se le restan los aportes y {{bo.rc-iva-minimo-no-imponible}} salarios mínimos. Sobre el resto se aplica el {{bo.rc-iva-alicuota}}, y a ese impuesto se le descuenta el {{bo.rc-iva-alicuota}} de {{bo.rc-iva-computo-smn}} salario mínimo y el de sus facturas.",
    },
    {
      pregunta: "¿Cuántas facturas necesito para no pagar RC-IVA?",
      respuesta: "Las suficientes para que el {{bo.rc-iva-alicuota}} de su monto cubra el impuesto que queda. La calculadora le dice el monto exacto de facturas que necesita.",
    },
    {
      pregunta: "¿Qué cambió en el RC-IVA en 2025?",
      respuesta: "Desde mayo de 2025 (Decreto Supremo N° 5383) el cómputo automático es el {{bo.rc-iva-alicuota}} de un salario mínimo. Antes era sobre dos. Por eso ahora pagan RC-IVA sueldos que antes no pagaban.",
    },
    {
      pregunta: "¿Qué facturas sirven?",
      respuesta: "Facturas a su nombre, de hasta 120 días de antigüedad, que entrega a su empleador en el Formulario 110 hasta el día 20 del mes.",
    },
    {
      pregunta: "¿Las facturas de combustible cuentan completas?",
      respuesta: "Sí. Desde el 10 de abril de 2026 la Ley N° 1718 quitó el límite que solo dejaba computar el 70 % de las compras de gasolina y diésel.",
    },
    {
      pregunta: "¿Qué pasa con mi saldo a favor si cambio de trabajo?",
      respuesta: "El saldo que viene de sus facturas lo puede usar en el nuevo trabajo.",
    },
  ],
  glosario: [
    { termino: "Formulario 110", definicion: "El formulario donde el dependiente declara sus facturas del mes ante su empleador." },
    { termino: "Mínimo no imponible", definicion: "La parte del sueldo que no paga impuesto: {{bo.rc-iva-minimo-no-imponible}} salarios mínimos." },
    { termino: "Saldo a favor", definicion: "El crédito que le queda cuando sus facturas superan el impuesto. Pasa a los meses siguientes." },
  ],
});
