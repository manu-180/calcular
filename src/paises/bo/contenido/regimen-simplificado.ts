import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.regimen-simplificado",
  h1: "Calculadora del Régimen Tributario Simplificado (RTS)",
  title: "Régimen Tributario Simplificado: categoría y cuota bimestral",
  description:
    "Sepa su categoría del RTS y cuánto paga cada dos meses según el capital de su negocio, con la tabla vigente del Servicio de Impuestos Nacionales.",
  intro: [
    "El Régimen Tributario Simplificado (RTS) es para comerciantes minoristas, vivanderos y artesanos que trabajan a pequeña escala. Reúne el IVA, el IUE y el IT en un solo pago fijo cada dos meses.",
    "La cuota depende del capital del negocio. Escríbalo y le mostramos su categoría y cuánto paga.",
  ],
  comoSeCalcula: [
    "El SIN asigna una categoría del 1 al 6 según el capital declarado en el padrón.",
    "Cada categoría tiene una cuota fija que se paga cada dos meses (seis veces por año).",
    "Con un capital de más de Bs 60.000 no se puede estar en el RTS: corresponde el régimen general.",
  ],
  ejemplo: ["Un puesto de mercado con Bs 20.000 de capital está en la categoría 3 y paga Bs 147 cada dos meses, Bs 882 en el año."],
  faq: [
    {
      pregunta: "¿Quiénes pueden estar en el RTS?",
      respuesta: "Personas naturales que son comerciantes minoristas (mercados, ferias, kioscos, pequeñas tiendas), vivanderos que venden comidas y bebidas en kioscos o pequeños locales, y artesanos que trabajan por cuenta propia.",
    },
    {
      pregunta: "¿Quiénes no pueden?",
      respuesta: "Quienes venden electrodomésticos o aparatos electrónicos, los inscritos en el ICE y quienes están en el Sistema Tributario Integrado o en el Régimen Agropecuario Unificado.",
    },
    {
      pregunta: "¿Qué impuestos reemplaza la cuota?",
      respuesta: "El IVA, el Impuesto sobre las Utilidades de las Empresas (IUE) y el Impuesto a las Transacciones (IT), en un único pago.",
    },
    {
      pregunta: "¿Qué cuenta como capital?",
      respuesta: "El que declara en el padrón del SIN para su negocio. Con ese dato el SIN le asigna la categoría.",
    },
  ],
  glosario: [
    { termino: "RTS", definicion: "Régimen Tributario Simplificado." },
    { termino: "SIN", definicion: "Servicio de Impuestos Nacionales." },
    { termino: "Cuota bimestral", definicion: "Pago que se hace cada dos meses." },
  ],
});
