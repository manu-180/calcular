import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.preaviso",
  h1: "Calculadora de preaviso en República Dominicana",
  title: "Preaviso en RD: cuántos días te tocan y cuánto vale",
  description: "Calcula los días de preaviso según tu antigüedad, la fecha en que termina el contrato y cuánto se paga si no se da el aviso. Según el Código de Trabajo.",
  intro: [
    "El preaviso es el aviso que se da antes de terminar un contrato por tiempo indefinido. Lo debe dar el empleador cuando desahucia y también el trabajador cuando renuncia.",
    "Los días dependen del tiempo trabajado. Si no se da el aviso, se pagan esos días en dinero.",
  ],
  comoSeCalcula: [
    "De 3 a 6 meses de trabajo: {{do.preaviso-dias[tres-a-seis-meses]}}.",
    "De 6 meses a un año: {{do.preaviso-dias[seis-a-doce-meses]}}.",
    "Más de un año: {{do.preaviso-dias[un-anio-o-mas]}}.",
    "Si se omite, se paga el salario diario (promedio mensual entre {{do.divisor-salario-diario}}) por cada día de preaviso.",
  ],
  ejemplo: [
    "Con 5 años de trabajo y un aviso dado el 30 de septiembre de 2026, el contrato termina el 28 de octubre. Con RD$40,000 al mes, el preaviso omitido vale RD$46,999.68.",
  ],
  faq: [
    { pregunta: "¿Cuántos días de preaviso me tienen que dar?", respuesta: "{{do.preaviso-dias[un-anio-o-mas]}} si trabajaste más de un año. Con menos tiempo, {{do.preaviso-dias[seis-a-doce-meses]}} o {{do.preaviso-dias[tres-a-seis-meses]}}. Con menos de 3 meses no hay preaviso." },
    { pregunta: "¿Tengo que dar preaviso si renuncio?", respuesta: "Sí, con los mismos días. Si no lo das, el empleador puede reclamarte el salario de esos días." },
    { pregunta: "¿Puedo faltar durante el preaviso?", respuesta: "Tienes derecho a dos medias jornadas libres por semana, sin descuento, para buscar otro trabajo." },
    { pregunta: "¿El preaviso paga ISR?", respuesta: "No. El pago del preaviso omitido no paga impuesto sobre la renta." },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "Aviso anticipado del fin del contrato. Si no se da, se paga en dinero." },
    { termino: "Desahucio", definicion: "Terminar el contrato sin alegar una causa." },
  ],
});
