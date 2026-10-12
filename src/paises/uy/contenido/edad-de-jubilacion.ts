import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.edad-de-jubilacion",
  h1: "¿A qué edad me jubilo? Calculadora de edad jubilatoria",
  title: "Edad jubilatoria en Uruguay según tu año de nacimiento",
  description:
    "Calculá a qué edad te podés jubilar con la reforma de la Ley 20.130: de 60 a 65 años según el año en que naciste, y con menos de 30 años de aportes.",
  intro: [
    "La reforma jubilatoria de 2023 (Ley 20.130) sube la edad para jubilarse de 60 a 65 años de forma gradual. La edad que te toca depende del año en que naciste y de tus años de aportes.",
    "Poné tu año de nacimiento y los años de trabajo que vas a tener. Te decimos la edad y el año en que te podés jubilar.",
  ],
  comoSeCalcula: [
    "Si naciste antes de 1973, seguís con el régimen anterior: {{uy.jubilacion-anterior[edad]}} de edad y {{uy.jubilacion-anterior[servicios]}} de servicio.",
    "Si naciste de 1973 a 1976, la edad con 30 años de servicio sube un año por cada año de nacimiento:{{uy.jubilacion-edad-normal[1973]}} si naciste en 1973 y {{uy.jubilacion-edad-normal[1976]}} si naciste en 1976.",
    "Desde 1977, la edad es {{uy.jubilacion-edad-normal[1977]}} con 30 años de servicio.",
    "Con menos años de servicio te jubilás más tarde: por ejemplo, a los 70 con {{uy.jubilacion-anios-minimos[70]}}. Si aportás al BPS, a los 65 alcanza con {{uy.jubilacion-anios-minimos-bps[65]}}.",
  ],
  ejemplo: ["Si naciste en 1980 y vas a tener 30 años de aportes, te jubilás a los 65, en 2045."],
  faq: [
    {
      pregunta: "¿Cuál es la edad jubilatoria en Uruguay?",
      respuesta: "Depende del año en que naciste: {{uy.jubilacion-anterior[edad]}} si naciste antes de 1973, de {{uy.jubilacion-edad-normal[1973]}} a {{uy.jubilacion-edad-normal[1976]}} si naciste de 1973 a 1976, y {{uy.jubilacion-edad-normal[1977]}} desde 1977. En todos los casos, con {{uy.jubilacion-anterior[servicios]}} de servicio.",
    },
    {
      pregunta: "¿Me puedo jubilar con menos de 30 años de aportes?",
      respuesta: "Sí, pero más tarde. Si aportás al BPS, con {{uy.jubilacion-anios-minimos-bps[65]}} te jubilás a los 65. Con {{uy.jubilacion-anios-minimos[70]}}, a los 70.",
    },
    {
      pregunta: "¿Hay jubilación anticipada?",
      respuesta: "Sí, para carreras muy largas (por ejemplo, quien ya tenía 30 años de servicio cuando entró en vigor la reforma puede jubilarse a los 60) y para tareas especialmente exigentes. Tienen sus propias reglas.",
    },
    {
      pregunta: "¿La reforma me afecta si nací antes de 1973?",
      respuesta: "No en la edad. Si configurás la causal hasta el 31 de diciembre de 2032, se te aplica entero el régimen anterior.",
    },
  ],
  glosario: [
    { termino: "Causal jubilatoria", definicion: "Reunir la edad y los años de servicio que pide la ley para jubilarte." },
    { termino: "Años de servicio", definicion: "Los años trabajados que figuran en tu historia laboral con aportes." },
  ],
});
