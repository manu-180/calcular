import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.iva-a-pagar",
  h1: "Calculadora de IVA a pagar del mes",
  title: "IVA a pagar en Paraguay: débito menos crédito fiscal",
  description: "Calculá el IVA del mes: el de tus ventas ({{py.iva-general}} y {{py.iva-reducida}}) menos el de tus compras con factura. Te dice si pagás o te queda saldo a favor.",
  intro: [
    "Si estás inscripto en el IVA, cada mes pagás la diferencia entre el IVA que cobraste en tus ventas y el que pagaste en tus compras.",
    "Poné tus ventas y compras del mes con IVA incluido, separadas por tasa: {{py.iva-general}} o {{py.iva-reducida}}.",
  ],
  comoSeCalcula: [
    "Débito fiscal: el IVA contenido en tus ventas. Al {{py.iva-general}} es el monto dividido 11 y al {{py.iva-reducida}}, dividido 21.",
    "Crédito fiscal: el IVA de tus compras con factura legal a tu RUC, calculado igual.",
    "Se resta el crédito, y el saldo a favor del mes anterior, al débito.",
    "Si da positivo, lo pagás. Si da negativo, te queda saldo a favor para el mes siguiente.",
  ],
  ejemplo: ["Si vendiste Gs. 11.000.000 al {{py.iva-general}} y compraste Gs. 5.500.000, tu débito es Gs. 1.000.000 y tu crédito Gs. 500.000. Pagás Gs. 500.000."],
  faq: [
    {
      pregunta: "¿Cómo se calcula el IVA a pagar?",
      respuesta: "IVA de las ventas menos IVA de las compras. El IVA incluido en un precio al {{py.iva-general}} es el precio dividido 11.",
    },
    {
      pregunta: "¿Qué compras sirven para descontar IVA?",
      respuesta: "Las de tu actividad, con factura legal a tu RUC. Las compras personales o sin factura no dan crédito.",
    },
    {
      pregunta: "¿Qué hago con el saldo a favor?",
      respuesta: "Se pasa al mes siguiente y se descuenta del IVA que tengas que pagar.",
    },
  ],
  glosario: [
    { termino: "Débito fiscal", definicion: "El IVA que cobraste en tus ventas." },
    { termino: "Crédito fiscal", definicion: "El IVA que pagaste en tus compras y podés descontar." },
  ],
});
