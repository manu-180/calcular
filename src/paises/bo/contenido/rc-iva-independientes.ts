import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.rc-iva-independientes",
  h1: "Calculadora de RC-IVA para independientes",
  title: "RC-IVA independientes Bolivia: calcule su trimestre",
  description: "Calcule el RC-IVA trimestral de profesionales, oficios y alquileres: {{bo.rc-iva-alicuota}} de sus ingresos menos aportes, facturas y salarios mínimos.",
  intro: [
    "Desde 2023, las personas que trabajan por su cuenta en una profesión u oficio, o que alquilan bienes, pagan el RC-IVA cada trimestre sobre lo que cobran.",
    "Escriba sus ingresos del trimestre, sus aportes y, si tiene, las facturas de sus compras.",
  ],
  comoSeCalcula: [
    "Al ingreso del trimestre se le restan los aportes a la seguridad social pagados a tiempo. Si usted factura, primero se descuenta el IVA de sus ventas.",
    "Sobre ese monto se aplica el {{bo.rc-iva-alicuota}}.",
    "Se descuenta el {{bo.rc-iva-alicuota}} de {{bo.rc-iva-independiente-computo-smn}} salarios mínimos ({{bo.salario-minimo}} cada uno) por cada mes del trimestre.",
    "También se descuenta el {{bo.rc-iva-alicuota}} de sus facturas de compras y el saldo a favor del trimestre anterior.",
    "Aparte, el IT del {{bo.it}} sobre sus ingresos se declara cada mes.",
  ],
  faq: [
    {
      pregunta: "¿Los profesionales independientes pagan IUE o RC-IVA?",
      respuesta: "RC-IVA. Desde el 1 de enero de 2023 (Ley N° 1448 y D.S. N° 4850) la profesión u oficio independiente pasó del IUE al RC-IVA trimestral.",
    },
    {
      pregunta: "¿Qué facturas puedo descontar?",
      respuesta: "Facturas originales a su nombre, de los 120 días anteriores al cierre del trimestre. Si además factura y paga IVA, desde marzo de 2026 (D.S. N° 5563) sus compras de alimentos, vestimenta, salud, transporte y servicios básicos también valen como crédito fiscal del IVA.",
    },
    {
      pregunta: "¿El saldo a favor se pierde?",
      respuesta: "No. Lo que sobra de sus facturas pasa al trimestre siguiente, actualizado por UFV.",
    },
  ],
  glosario: [
    { termino: "RC-IVA", definicion: "Régimen Complementario al IVA: impuesto sobre ingresos de personas que no pagan IUE." },
    { termino: "Trimestre", definicion: "Los períodos que terminan el 31 de marzo, el 30 de junio, el 30 de septiembre y el 31 de diciembre." },
  ],
});
