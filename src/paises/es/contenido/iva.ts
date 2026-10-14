import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.iva",
  h1: "Calculadora de IVA",
  title: "Calculadora de IVA: añade o quita el IVA a un precio",
  description:
    "Suma o quita el IVA a cualquier precio con los tipos vigentes en España: general, reducido y superreducido. También con recargo de equivalencia.",
  intro: [
    "El IVA es el impuesto que se suma al precio de casi todo lo que compras. En España hay tres tipos: general, reducido y superreducido.",
    "Con esta calculadora pasas de un precio sin IVA a uno con IVA, o al revés, y ves cuánto es el impuesto.",
  ],
  comoSeCalcula: [
    "Para añadir el IVA, multiplica el precio sin IVA por el tipo. El general es del {{es.iva-tipos[general]}}, el reducido del {{es.iva-tipos[reducido]}} y el superreducido del {{es.iva-tipos[superreducido]}}.",
    "Para quitarlo, divide el precio con IVA entre 1 más el tipo. Con el general, entre 1,21.",
    "El recargo de equivalencia se suma aparte cuando vendes a un comercio minorista acogido a ese régimen: {{es.recargo-equivalencia[general]}}, {{es.recargo-equivalencia[reducido]}} o {{es.recargo-equivalencia[superreducido]}} según el tipo de IVA.",
  ],
  ejemplo: [
    "Un servicio de 100 euros sin IVA cuesta 121 euros con el tipo general. Si un menú cuesta 55 euros con IVA incluido, al quitar el 10 % quedan 50 euros de base y 5 de impuesto.",
  ],
  faq: [
    {
      pregunta: "¿Qué lleva IVA del 10 %?",
      respuesta: "Entre otros, la hostelería y la restauración y el transporte de viajeros. La lista completa está en el artículo 91 de la Ley del IVA.",
    },
    {
      pregunta: "¿Qué lleva IVA del 4 %?",
      respuesta: "Los alimentos básicos (pan común, leche, quesos, huevos, fruta, verdura, legumbres y aceite de oliva) y los libros, periódicos y revistas, entre otros.",
    },
    {
      pregunta: "¿Hay IVA en Canarias, Ceuta y Melilla?",
      respuesta: "No. Canarias tiene el IGIC y Ceuta y Melilla el IPSI, con tipos propios. Esta calculadora no sirve para esos territorios.",
    },
    {
      pregunta: "¿Cómo se quita el IVA a un precio?",
      respuesta: "Divide el precio final entre 1,21 si es el tipo general. Lo que da es la base y la diferencia es el IVA. Restar el 21 % al precio final da un resultado equivocado.",
    },
  ],
  glosario: [
    { termino: "Base imponible", definicion: "Precio antes de sumar el IVA." },
    { termino: "Cuota de IVA", definicion: "Importe del impuesto que se suma a la base." },
    { termino: "Recargo de equivalencia", definicion: "Régimen especial de IVA para comerciantes minoristas: su proveedor les cobra un porcentaje extra y ellos no presentan declaraciones de IVA." },
  ],
});
