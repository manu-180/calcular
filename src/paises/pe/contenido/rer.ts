import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.rer",
  h1: "Calculadora del Régimen Especial de Renta (RER)",
  title: "RER {{anio}}: calcula tu cuota mensual de {{pe.tasa-rer}}",
  description:
    "En el Régimen Especial de Renta pagas {{pe.tasa-rer}} de tus ingresos netos del mes. Calcula tu cuota y revisa si te pasas del límite de {{pe.limite-rer}} al año.",
  intro: [
    "El RER es un régimen para negocios chicos: pagas una cuota fija de {{pe.tasa-rer}} sobre lo que vendes cada mes y con eso cumples el impuesto a la renta.",
    "Pon tus ingresos netos del mes y te damos la cuota. Si pones lo acumulado del año, te avisamos si superas el límite.",
  ],
  comoSeCalcula: [
    "Se toman los ingresos netos del mes: lo que vendiste sin IGV, menos devoluciones y descuentos.",
    "Se aplica {{pe.tasa-rer}}. Esa cuota es cancelatoria: con ella queda pagado tu impuesto a la renta del mes.",
    "Si en el año tus ingresos superan {{pe.limite-rer}}, ya no puedes seguir en el RER.",
  ],
  ejemplo: ["Vendiste S/ 30,000 sin IGV en el mes. Tu cuota de renta en el RER es S/ 450."],
  faq: [
    {
      pregunta: "¿Cuánto se paga en el RER?",
      respuesta: "{{pe.tasa-rer}} de tus ingresos netos de cada mes. Además pagas el IGV de tus ventas.",
    },
    {
      pregunta: "¿Cuál es el límite de ingresos del RER?",
      respuesta: "{{pe.limite-rer}} de ingresos netos en el año. Si lo pasas, cambias al Régimen MYPE Tributario o al régimen general.",
    },
    {
      pregunta: "¿En el RER hay que presentar algo una vez al año?",
      respuesta: "Sí, una declaración jurada anual con el inventario del último día del año anterior, en la forma y fecha que fija SUNAT. El impuesto, en cambio, ya quedó pagado con las cuotas mensuales.",
    },
  ],
  glosario: [
    { termino: "RER", definicion: "Régimen Especial del Impuesto a la Renta, para negocios con ingresos anuales bajos." },
    { termino: "Ingresos netos", definicion: "Ventas del mes sin IGV, menos devoluciones, bonificaciones y descuentos." },
  ],
});
