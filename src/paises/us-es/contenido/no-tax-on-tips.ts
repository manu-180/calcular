import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.no-tax-on-tips",
  h1: "Calculadora de propinas sin impuestos",
  title: "Propinas sin impuestos: deducción de hasta {{us.tips-deduction-max}}",
  description: "Calcula tu deducción federal por propinas que califican, hasta {{us.tips-deduction-max}} al año de 2025 a 2028, y cuánto impuesto sobre el ingreso te ahorra.",
  intro: [
    "Meseros, bartenders, estilistas y otros trabajadores que reciben propinas pueden deducir las propinas declaradas de su ingreso tributable federal, hasta {{us.tips-deduction-max}} al año.",
    "Escribe tus propinas y tus ingresos para ver tu deducción y un estimado del impuesto que ahorras.",
  ],
  comoSeCalcula: [
    "La deducción son tus propinas que califican, hasta {{us.tips-deduction-max}}. El tope es el mismo para declaraciones individuales y conjuntas.",
    "Si tu MAGI pasa de {{us.tips-overtime-threshold[other]}} ({{us.tips-overtime-threshold[mfj]}} en una declaración conjunta), el tope baja {{us.tips-overtime-phaseout-step}} por cada $1,000 completos de exceso.",
    "El impuesto ahorrado es la diferencia entre el impuesto sobre tu ingreso tributable con y sin la deducción.",
  ],
  ejemplo: [
    "Un mesero con $12,000 de propinas y $28,900 de ingreso tributable las deduce todas y ahorra $1,440 de impuesto federal.",
  ],
  faq: [
    { pregunta: "¿Qué propinas califican?", respuesta: "Las propinas en efectivo y con tarjeta que los clientes dan voluntariamente, en un trabajo que el IRS considera de propinas habituales. Los cargos por servicio obligatorios no cuentan. Las propinas deben estar declaradas en un W-2, un 1099 o el Formulario 4137." },
    { pregunta: "¿Igual pago Seguro Social y Medicare sobre las propinas?", respuesta: "Sí. La deducción solo baja el impuesto federal sobre el ingreso. Los impuestos de nómina y la mayoría de los impuestos estatales se siguen pagando." },
    { pregunta: "¿Pueden tomarla los casados que declaran por separado?", respuesta: "No. Si estás casado, debes presentar una declaración conjunta, y quien ganó las propinas necesita un número de Seguro Social válido." },
  ],
  glosario: [
    { termino: "Propinas que califican", definicion: "Propinas voluntarias recibidas en una ocupación de propinas habituales y declaradas correctamente." },
    { termino: "Anexo 1-A (Schedule 1-A)", definicion: "El formulario del IRS donde se reclaman las deducciones por propinas, horas extras, intereses de préstamos de auto y para mayores." },
  ],
});
