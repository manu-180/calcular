import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.renuncia-voluntaria",
  h1: "Calculadora de renuncia voluntaria en El Salvador",
  title: "Renuncia voluntaria en El Salvador: calcule su prestación",
  description:
    "Calcule la prestación por renuncia voluntaria: {{sv.renuncia-dias-por-anio}} de salario por año, con al menos {{sv.renuncia-anios-minimos}} de servicio y tope por sector.",
  intro: [
    "Si renuncia a su trabajo después de al menos {{sv.renuncia-anios-minimos}} con el mismo patrono, la ley le da una prestación económica. Es distinta de la indemnización por despido.",
    "Ponga su salario, las fechas de inicio y de renuncia, y el sector de la empresa. La calculadora aplica el tope de la ley.",
  ],
  comoSeCalcula: [
    "Se saca su salario diario: el salario mensual dividido por 30.",
    "Ese salario diario no puede pasar de {{sv.renuncia-tope}} veces el salario mínimo diario del sector de la empresa. Si lo pasa, se usa el tope.",
    "Le corresponden {{sv.renuncia-dias-por-anio}} de salario por cada año completo de servicio.",
    "El patrono tiene que pagarla dentro de los 15 días siguientes a la fecha en que la renuncia se hace efectiva.",
  ],
  ejemplo: [
    "Trabajó 5 años con un salario de $600 en comercio. Su salario diario es $20 y no pasa el tope. Le corresponden 75 días: $1,500.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuándo tengo derecho a la prestación por renuncia?",
      respuesta: "Desde los {{sv.renuncia-anios-minimos}} de servicio continuo con el mismo patrono. Antes de ese tiempo no hay prestación, aunque sí le pagan el aguinaldo y las vacaciones.",
    },
    {
      pregunta: "¿Con cuánta anticipación tengo que avisar?",
      respuesta: "Con {{sv.renuncia-preaviso}} de anticipación y por escrito. Si es director, gerente, jefe o personal especializado, con {{sv.renuncia-preaviso-jefaturas}}.",
    },
    {
      pregunta: "¿Cómo presento la renuncia?",
      respuesta: "Por escrito y firmada, con copia de su DUI, en las hojas que entrega el Ministerio de Trabajo o un juzgado laboral, o en un documento privado autenticado.",
    },
    {
      pregunta: "¿La prestación paga renta?",
      respuesta: "No. La ley la deja exenta del impuesto sobre la renta.",
    },
    {
      pregunta: "¿Y si mi empresa da más que la ley?",
      respuesta: "Si su contrato colectivo, el reglamento interno o la costumbre de la empresa dan una prestación mayor, se aplica la mayor.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso por escrito que le da al patrono antes de que la renuncia se haga efectiva." },
    { termino: "Prestación por renuncia voluntaria", definicion: "El pago que da la ley a quien renuncia después de cierto tiempo de servicio." },
  ],
});
