import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.sueldo-neto",
  h1: "Calculadora de sueldo neto {{anio}}",
  title: "Sueldo neto {{anio}}: calcula tu nómina de bruto a neto",
  description:
    "Pasa tu sueldo bruto anual a neto mensual con la Seguridad Social y la retención de IRPF de {{anio}}, en 12 o 14 pagas. Datos del BOE y de la Agencia Tributaria.",
  intro: [
    "El sueldo neto es lo que te llega a la cuenta cada mes. Sale de restar al bruto dos cosas: lo que cotizas a la Seguridad Social y la retención del IRPF.",
    "Esta calculadora usa los tipos de cotización de 2026 y el mismo procedimiento que la Agencia Tributaria para fijar tu tipo de retención según tu sueldo y tu familia.",
  ],
  comoSeCalcula: [
    "Se divide el bruto anual entre 12 para tener la base de cotización, con las pagas extra prorrateadas. El tope es {{es.base-maxima-cotizacion}} al mes.",
    "Sobre esa base pagas {{es.cotizacion-trabajador[contingencias-comunes]}} por contingencias comunes, {{es.cotizacion-trabajador[desempleo-indefinido]}} por desempleo si eres indefinido ({{es.cotizacion-trabajador[desempleo-temporal]}} si eres temporal), {{es.cotizacion-trabajador[formacion]}} por formación y {{es.cotizacion-trabajador[mei]}} de MEI.",
    "Para el IRPF se resta al bruto la Seguridad Social del año y {{es.irpf-otros-gastos}} de otros gastos. Si ganas poco, también la reducción por rendimientos del trabajo.",
    "A esa base se le aplica la escala de retención y se le resta la misma escala aplicada a tu mínimo personal y familiar (desde {{es.irpf-minimo-contribuyente[general]}}).",
    "La cuota dividida entre el bruto da tu tipo de retención, que se aplica a cada paga.",
  ],
  ejemplo: [
    "Con 25.000 euros brutos al año en 14 pagas, contrato indefinido y sin hijos, cotizas 135,41 euros al mes a la Seguridad Social y tu tipo de IRPF es del 14,09 %.",
    "Cada paga bruta es de 1.785,71 euros. En los meses normales cobras 1.398,69 euros netos y en las dos pagas extra, 1.534,10 euros.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es 25.000 euros brutos en neto?",
      respuesta: "Unos 19.850 euros netos al año si no tienes hijos: 1.398,69 euros al mes en 14 pagas o 1.654,38 euros al mes si tienes las pagas prorrateadas.",
    },
    {
      pregunta: "¿Cobro más con 12 o con 14 pagas?",
      respuesta: "Lo mismo al año. Con 14 pagas cada mes cobras menos y en junio o julio y en diciembre recibes una paga extra. Con 12, las pagas extra van repartidas en cada nómina.",
    },
    {
      pregunta: "¿Por qué mi nómina no coincide al céntimo?",
      respuesta: "Tu empresa puede tener pluses, horas extra, retribución en especie o un tipo de IRPF regularizado a mitad de año. Esta calculadora parte de un sueldo fijo y de tu situación al empezar el año.",
    },
    {
      pregunta: "¿El tipo de IRPF depende de la comunidad autónoma?",
      respuesta: "La retención no. Se calcula con una escala única para todo el territorio común. La comunidad sí cuenta en la declaración de la renta, donde puedes pagar o recibir la diferencia.",
    },
    {
      pregunta: "¿Vale para el País Vasco y Navarra?",
      respuesta: "No del todo. Allí el IRPF es foral y las retenciones siguen sus propias tablas. La parte de Seguridad Social sí es la misma.",
    },
  ],
  glosario: [
    { termino: "Sueldo bruto", definicion: "Lo que pactas con tu empresa antes de cotizaciones e impuestos." },
    { termino: "Base de cotización", definicion: "La parte del sueldo sobre la que se calculan las cotizaciones. Incluye la parte proporcional de las pagas extra." },
    { termino: "MEI", definicion: "Mecanismo de Equidad Intergeneracional. Una cotización extra que financia el fondo de reserva de las pensiones." },
    { termino: "Retención de IRPF", definicion: "Lo que tu empresa te descuenta cada mes a cuenta del impuesto sobre la renta y paga a Hacienda por ti." },
  ],
});
