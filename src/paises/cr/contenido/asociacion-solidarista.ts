import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.asociacion-solidarista",
  h1: "Calculadora de ahorro en la asociación solidarista",
  title: "Asociación solidarista: cuánto ahorra y aporta el patrono",
  description:
    "Calcule su ahorro en la asociación solidarista (entre {{cr.solidarista-ahorro[minimo]}} y {{cr.solidarista-ahorro[maximo]}} del salario) y el aporte del patrono, por mes y acumulado.",
  intro: [
    "Si está afiliado a una asociación solidarista, cada mes se le rebaja un ahorro de su salario y el patrono aporta otro monto a su nombre.",
    "Escriba su salario y los porcentajes de su asociación para ver cuánto entra cada mes y cuánto lleva acumulado.",
  ],
  comoSeCalcula: [
    "Ahorro obligatorio: entre {{cr.solidarista-ahorro[minimo]}} y {{cr.solidarista-ahorro[maximo]}} del salario reportado a la Caja. Lo fija la asamblea.",
    "Aporte patronal: el porcentaje que pactaron la empresa y la asociación.",
    "Acumulado: cada monto por los meses de aportes, sin excedentes.",
  ],
  ejemplo: ["Con un salario de ₡800.000, un ahorro del 5 % y un aporte patronal del 5,33 %, entran ₡82.640 por mes a la asociación."],
  faq: [
    {
      pregunta: "¿Cuánto me rebaja la asociación solidarista?",
      respuesta: "Entre {{cr.solidarista-ahorro[minimo]}} y {{cr.solidarista-ahorro[maximo]}} de su salario, según lo que fije la asamblea. Puede ahorrar más de forma voluntaria.",
    },
    {
      pregunta: "¿El aporte del patrono es mío?",
      respuesta: "Es una reserva para su cesantía que administra la asociación. Si lo despiden sin justa causa, el patrono completa la diferencia hasta la cesantía de ley.",
    },
    {
      pregunta: "¿El aporte patronal reemplaza al FCL?",
      respuesta: "Hasta el 3 % del salario cuenta como cumplido el FCL y la mitad del aporte al ROP. Lo que pasa de ese 3 % sigue las reglas de la asociación.",
    },
  ],
  glosario: [
    { termino: "Asociación solidarista", definicion: "Una organización de trabajadores de una empresa que administra su ahorro y el aporte patronal." },
    { termino: "Excedentes", definicion: "Las ganancias que la asociación reparte cada año entre sus asociados." },
  ],
});
