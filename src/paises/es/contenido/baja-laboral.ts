import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.baja-laboral",
  h1: "Calculadora de la baja laboral",
  title: "Baja laboral: cuánto cobras por incapacidad temporal",
  description:
    "Calcula cuánto cobras durante una baja por enfermedad común o por accidente de trabajo: base reguladora, porcentajes por tramo y quién paga cada parte.",
  intro: [
    "Cuando estás de baja médica no cobras tu sueldo sino una prestación por incapacidad temporal. Se calcula sobre lo que cotizaste el mes anterior.",
    "Lo que cobras depende de la causa de la baja y de cuántos días dura.",
  ],
  comoSeCalcula: [
    "La base reguladora diaria es la base de cotización del mes anterior a la baja dividida entre 30.",
    "Por enfermedad común o accidente no laboral: los tres primeros días no hay prestación, del día 4 al 20 cobras el {{es.it-porcentajes[comun-dia-4-a-20]}} y desde el día 21, el {{es.it-porcentajes[comun-desde-dia-21]}}.",
    "Por accidente de trabajo o enfermedad profesional: el {{es.it-porcentajes[profesional]}} desde el día siguiente a la baja. El día de la baja lo paga la empresa como salario.",
    "En la baja común, del día 4 al 15 paga la empresa y desde el 16 el INSS o la mutua, aunque normalmente todo te llega en la nómina.",
  ],
  ejemplo: ["Con una base de 1.800 euros y 30 días de baja por enfermedad común, cobras 612 euros por los días 4 a 20 y 450 por los días 21 a 30: 1.062 euros brutos."],
  faq: [
    {
      pregunta: "¿Cobro algo los tres primeros días de baja?",
      respuesta: "La ley no da prestación esos días si la baja es por enfermedad común. Muchos convenios sí los pagan: revisa el tuyo.",
    },
    {
      pregunta: "¿Mi empresa puede completarme la baja?",
      respuesta: "Sí. Muchos convenios obligan a completar la prestación hasta el 100 % de tu sueldo durante un tiempo.",
    },
    {
      pregunta: "¿La baja cotiza para la jubilación?",
      respuesta: "Sí. Durante la baja sigues de alta y se sigue cotizando por ti.",
    },
  ],
  glosario: [
    { termino: "Incapacidad temporal", definicion: "Situación en la que no puedes trabajar por enfermedad o accidente y recibes asistencia sanitaria." },
    { termino: "Base reguladora", definicion: "Cantidad diaria sobre la que se aplica el porcentaje de la prestación." },
    { termino: "Mutua", definicion: "Entidad colaboradora de la Seguridad Social que puede gestionar las bajas de tu empresa." },
  ],
});
