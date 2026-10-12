import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.resimple",
  h1: "Calculadora del IRE RESIMPLE",
  title: "RESIMPLE 2026: calculá cuánto pagás por trimestre",
  description: "Calculá la cuota del IRE RESIMPLE según lo que facturaste el año anterior. Es para empresas unipersonales que ganaron hasta {{py.resimple-tope}} por año.",
  intro: [
    "El RESIMPLE es el régimen más simple del impuesto a la renta empresarial (IRE). Es para empresas unipersonales chicas: vendedores, almacenes, oficios, emprendimientos.",
    "Pagás un monto fijo según lo que facturaste el año anterior, sin cuentas de gastos ni IVA. El tope es {{py.resimple-tope}} por año.",
  ],
  comoSeCalcula: [
    "Se mira el total de ingresos brutos del año anterior.",
    "Cada escalón de Gs. 20.000.000 tiene un monto fijo por mes, de Gs. 20.000 a Gs. 80.000.",
    "La DNIT lo cobra en cuatro cuotas trimestrales: marzo, junio, setiembre y diciembre.",
  ],
  ejemplo: ["Si el año pasado facturaste Gs. 35.000.000, pagás Gs. 40.000 por mes: una cuota de Gs. 120.000 cada trimestre."],
  faq: [
    {
      pregunta: "¿Quiénes pueden estar en el RESIMPLE?",
      respuesta: "Las empresas unipersonales que facturaron hasta {{py.resimple-tope}} el año anterior. Si lo superás, pasás al IRE SIMPLE o al régimen general.",
    },
    {
      pregunta: "¿Cuánto se paga de RESIMPLE?",
      respuesta: "Entre Gs. 20.000 y Gs. 80.000 por mes según tus ingresos, en cuotas trimestrales de Gs. 60.000 a Gs. 240.000.",
    },
    {
      pregunta: "¿Cuándo vence la declaración del RESIMPLE?",
      respuesta: "La declaración jurada anual (formulario 502) vence el 26 de febrero. Si no la presentás, la DNIT genera las cuotas con el escalón más bajo.",
    },
    {
      pregunta: "¿En el RESIMPLE pago IVA?",
      respuesta: "No. Los contribuyentes del RESIMPLE no pagan IVA ni IDU. Emiten una boleta RESIMPLE por sus ventas.",
    },
  ],
  glosario: [
    { termino: "RESIMPLE", definicion: "Régimen Simplificado para Pequeñas Empresas del IRE (artículo 27 de la Ley 6380/2019)." },
    { termino: "Ingresos brutos", definicion: "Todo lo que vendiste o cobraste, sin restar gastos." },
    { termino: "DNIT", definicion: "Dirección Nacional de Ingresos Tributarios, la que cobra los impuestos (antes SET)." },
  ],
});
