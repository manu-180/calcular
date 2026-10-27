import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.monto-asignacion-familiar",
  h1: "Asignación familiar {{anio}}: cuánto es y cuánto suma al año",
  title: "Asignación familiar {{anio}}: cuánto es y cuánto suma",
  description:
    "La asignación familiar es el {{pe.asignacion-familiar}} de la remuneración mínima de {{pe.rmv}}. Mira cuánto suma al mes y al año con gratificaciones y CTS.",
  intro: [
    "La asignación familiar es un pago fijo de {{pe.asignacion-familiar}} de la remuneración mínima vital. Se calcula sobre la RMV de {{pe.rmv}}, que rige desde el {{pe.rmv#desde}}.",
    "Te corresponde si trabajas en planilla en el sector privado y tienes hijos menores de edad o hijos que estudian. No importa cuánto ganes ni cuántos hijos tengas: el monto es el mismo.",
  ],
  comoSeCalcula: [
    "Se toma la remuneración mínima vital vigente y se saca el {{pe.asignacion-familiar}}.",
    "La asignación familiar se suma a tu sueldo todos los meses y forma parte de la remuneración con la que se calculan la gratificación y la CTS.",
    "Por eso también sube lo que cobras en julio y diciembre (con su bonificación extraordinaria) y lo que te depositan de CTS en mayo y noviembre.",
  ],
  ejemplo: [
    "Con la RMV de S/ 1,230, la asignación familiar es S/ 123. En el año son S/ 1,476 en sueldos, S/ 268.14 más en tus gratificaciones y S/ 143.50 más de CTS: S/ 1,887.64 en total.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es la asignación familiar en 2026?",
      respuesta: "Es el {{pe.asignacion-familiar}} de la RMV vigente, que es {{pe.rmv}} desde el {{pe.rmv#desde}}. Con la RMV de S/ 1,230 son S/ 123 al mes. Con la anterior, de S/ 1,130, eran S/ 113.",
    },
    {
      pregunta: "¿Quién tiene derecho a la asignación familiar?",
      respuesta: "Quien trabaja en el régimen privado y tiene a su cargo hijos menores de 18 años. Si al cumplir 18 tu hijo sigue estudios superiores, la cobras hasta que termine, con un máximo de 6 años más. Si ya recibes un beneficio igual o mayor por este concepto, te quedas con el que más te convenga.",
    },
    {
      pregunta: "¿Si tengo tres hijos cobro tres veces la asignación familiar?",
      respuesta: "No. Es un solo monto por trabajador, sin importar cuántos hijos tengas.",
    },
    {
      pregunta: "¿La asignación familiar sube cuando sube el sueldo mínimo?",
      respuesta: "Sí. Como es un porcentaje de la RMV, cada aumento de la remuneración mínima la sube automáticamente.",
    },
  ],
  glosario: [
    { termino: "Asignación familiar", definicion: "Pago mensual del 10 % de la remuneración mínima para trabajadores del régimen privado con hijos (Ley 25129)." },
    { termino: "RMV", definicion: "Remuneración mínima vital: el sueldo más bajo que se puede pagar por jornada completa." },
  ],
});
