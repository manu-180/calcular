import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.no-tax-on-tips",
  h1: "Calculadora de propinas sin impuestos",
  title: "Propinas sin impuestos: deducción de hasta {{us.tips-deduction-max}}",
  description: "Calcule su deducción federal por propinas que califican, hasta {{us.tips-deduction-max}} al año de 2025 a 2028, y cuánto impuesto sobre el ingreso le ahorra.",
  intro: [
    "Meseros, bartenders, estilistas y otros trabajadores que reciben propinas pueden deducir las propinas declaradas de su ingreso tributable federal, hasta {{us.tips-deduction-max}} al año.",
    "Indique sus propinas y sus ingresos para ver su deducción y un estimado del impuesto que ahorra.",
  ],
  comoSeCalcula: [
    "La deducción son sus propinas que califican, hasta {{us.tips-deduction-max}}. El tope es el mismo para declaraciones individuales y conjuntas.",
    "Si su MAGI pasa de {{us.tips-overtime-threshold[other]}} ({{us.tips-overtime-threshold[mfj]}} en una declaración conjunta), el tope baja {{us.tips-overtime-phaseout-step}} por cada $1,000 completos de exceso.",
    "El impuesto ahorrado es la diferencia entre el impuesto sobre su ingreso tributable con y sin la deducción.",
  ],
  ejemplo: [
    "Un mesero con $12,000 de propinas y $28,900 de ingreso tributable las deduce todas y ahorra $1,440 de impuesto federal.",
  ],
  faq: [
    { pregunta: "¿Qué propinas califican?", respuesta: "Las propinas en efectivo y con tarjeta que los clientes dan voluntariamente, en un trabajo que el IRS considera de propinas habituales. Los cargos por servicio obligatorios no cuentan. Las propinas deben estar declaradas en un W-2, un 1099 o el Formulario 4137." },
    { pregunta: "¿Igual pago Seguro Social y Medicare sobre las propinas?", respuesta: "Sí. La deducción solo baja el impuesto federal sobre el ingreso. Los impuestos de nómina y la mayoría de los impuestos estatales se siguen pagando." },
    { pregunta: "¿Pueden tomarla los casados que declaran por separado?", respuesta: "No. Si está casado, debe presentar una declaración conjunta, y quien ganó las propinas necesita un número de Seguro Social válido." },
  ],
  glosario: [
    { termino: "Propinas que califican", definicion: "Propinas voluntarias recibidas en una ocupación de propinas habituales y declaradas correctamente." },
    { termino: "Anexo 1-A (Schedule 1-A)", definicion: "El formulario del IRS donde se reclaman las deducciones por propinas, horas extras, intereses de préstamos de auto y para mayores." },
  ],
});
