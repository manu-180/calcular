import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ni.cuota-fija",
  h1: "Calculadora de cuota fija de la DGI en Nicaragua",
  title: "Cuota fija en Nicaragua: calculá tu estrato y cuánto pagás",
  description: "Si tu negocio vende hasta {{ni.cuota-fija-tope}} al mes, podés pagar cuota fija en Nicaragua. Calculá tu estrato y el rango de la cuota mensual.",
  intro: [
    "La cuota fija es un pago mensual único que reemplaza el IR y el IVA para los negocios chicos de personas naturales: pulperías, talleres, pequeños comercios.",
    "Poné tus ventas de un mes promedio y tu inventario. Te decimos si podés estar en el régimen y en qué estrato quedás.",
  ],
  comoSeCalcula: [
    "Pueden entrar las personas naturales con ventas de hasta {{ni.cuota-fija-tope}} al mes e inventario de hasta {{ni.cuota-fija-inventario}}.",
    "Las ventas mensuales definen tu estrato. Son seis, y en el primero estás exento de pagar la cuota.",
    "Cada estrato tiene una cuota mínima y una máxima. La DGI te asigna el monto exacto.",
  ],
  ejemplo: ["Si vendés C$15,000 al mes, quedás en el estrato 2: la cuota va de C$200 a C$500 al mes."],
  faq: [
    {
      pregunta: "¿Quién puede pagar cuota fija en Nicaragua?",
      respuesta: "Las personas naturales con ventas de hasta {{ni.cuota-fija-tope}} al mes y un inventario de hasta {{ni.cuota-fija-inventario}}. Hay actividades excluidas, como los negocios en centros comerciales.",
    },
    {
      pregunta: "¿Cuánto se paga de cuota fija?",
      respuesta: "Depende del estrato de tus ventas: el primero está exento y cada uno de los otros cinco tiene un rango. Poné tus ventas en la calculadora para ver el tuyo.",
    },
    {
      pregunta: "¿La cuota fija incluye el IVA?",
      respuesta: "Sí. Es un impuesto que reemplaza el IR de actividades económicas y el IVA. No tenés que cobrar IVA a tus clientes.",
    },
    {
      pregunta: "¿Qué pasa si vendo más?",
      respuesta: "Si durante seis meses vendés en promedio más del tope, la DGI te pasa al régimen general.",
    },
  ],
  glosario: [
    { termino: "Régimen simplificado", definicion: "El sistema de cuota fija para pequeños contribuyentes." },
    { termino: "Estrato", definicion: "El tramo de ventas mensuales que define cuánto pagás." },
  ],
});
