import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.rmt",
  h1: "Calculadora del Régimen MYPE Tributario (RMT)",
  title: "Régimen MYPE Tributario {{anio}}: pago a cuenta e impuesto",
  description:
    "Calcula tu pago a cuenta mensual del RMT ({{pe.pago-cuenta-rmt}} de tus ingresos) y el impuesto anual: 10 % hasta 15 UIT y 29.5 % sobre el exceso. Con la UIT de {{pe.uit}}.",
  intro: [
    "El Régimen MYPE Tributario es para micro y pequeñas empresas con ingresos de hasta {{pe.limite-rmt}} al año. Pagas un adelanto mensual chico y en la declaración anual una tasa reducida sobre las primeras 15 UIT de utilidad.",
    "Pon tus ingresos del mes y, si quieres, tu utilidad del año. Te damos el pago a cuenta y el impuesto anual estimado.",
  ],
  comoSeCalcula: [
    "Cada mes pagas a cuenta {{pe.pago-cuenta-rmt}} de tus ingresos netos, mientras lo acumulado en el año no pase de {{pe.limite-pago-cuenta-rmt}}.",
    "Si pasas ese límite, el pago a cuenta sigue las reglas del régimen general, con un mínimo de {{pe.pago-cuenta-tercera}}.",
    "En la declaración anual, la utilidad paga 10 % hasta 15 UIT y 29.5 % por lo que exceda. A ese impuesto le restas los pagos a cuenta del año.",
  ],
  ejemplo: [
    "Facturaste S/ 50,000 sin IGV en el mes: tu pago a cuenta es S/ 500. Si en el año tu utilidad es S/ 120,000, el impuesto anual es S/ 8,250 por las primeras 15 UIT más S/ 11,062.50 por el resto: S/ 19,312.50.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el pago a cuenta en el RMT?",
      respuesta: "{{pe.pago-cuenta-rmt}} de los ingresos netos del mes, si en el año no pasaste de {{pe.limite-pago-cuenta-rmt}}.",
    },
    {
      pregunta: "¿Cuál es la tasa del impuesto anual en el RMT?",
      respuesta: "10 % sobre las primeras 15 UIT de utilidad (S/ 82,500 con la UIT de 2026) y 29.5 % sobre el resto.",
    },
    {
      pregunta: "¿Quién puede estar en el RMT?",
      respuesta: "Empresas y personas con negocio cuyos ingresos netos del año no superen {{pe.limite-rmt}}, salvo las que están vinculadas con otras y entre todas pasan el límite.",
    },
    {
      pregunta: "¿Qué pasa si supero el límite del RMT en el año?",
      respuesta: "Desde ese mes determinas el impuesto con el régimen general.",
    },
  ],
  glosario: [
    { termino: "RMT", definicion: "Régimen MYPE Tributario del impuesto a la renta, creado por el Decreto Legislativo 1269." },
    { termino: "Pago a cuenta", definicion: "Adelanto mensual del impuesto anual que se descuenta al presentar la declaración jurada." },
  ],
});
