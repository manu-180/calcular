import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.prima-de-servicios",
  h1: "Calculadora de prima de servicios {{anio}}",
  title: "Calculadora de prima de servicios {{anio}} en Colombia",
  description:
    "Calcula tu prima de junio o de diciembre en segundos: tu salario por los días trabajados, con el auxilio de transporte de {{co.auxilio-transporte}} si te corresponde.",
  intro: [
    "La prima de servicios es medio salario por cada semestre trabajado: se paga hasta el 30 de junio y en los primeros 20 días de diciembre. Si trabajaste menos del semestre, te toca la parte proporcional.",
    "Si ganas hasta {{co.auxilio-tope}}, el auxilio de transporte de {{co.auxilio-transporte}} se suma al salario para calcularla.",
  ],
  comoSeCalcula: [
    "Se toma tu salario mensual. Si ganas hasta {{co.auxilio-tope}}, se le suma el auxilio de transporte de {{co.auxilio-transporte}}.",
    "Ese salario base se multiplica por los días trabajados en el semestre y se divide por 360.",
    "El semestre completo son 180 días, porque en nómina cada mes cuenta como 30 días.",
  ],
  ejemplo: [
    "Con un salario de $4.000.000 y el semestre completo, la prima es $4.000.000 × 180 / 360 = $2.000.000. A ese salario no le toca auxilio de transporte.",
    "Con el salario mínimo de 2026 más el auxilio, la base es $2.000.000 y la prima del semestre completo es de $1.000.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo se paga la prima de servicios?",
      respuesta: "La primera mitad a más tardar el 30 de junio. La segunda, dentro de los primeros 20 días de diciembre.",
    },
    {
      pregunta: "¿Cuánto es la prima si gano el mínimo?",
      respuesta: "Si trabajaste el semestre completo en 2026, $1.000.000: la mitad del salario mínimo de {{co.smmlv}} más el auxilio de transporte de {{co.auxilio-transporte}}.",
    },
    {
      pregunta: "¿Me toca prima si llevo poco tiempo en la empresa?",
      respuesta: "Sí. Te pagan la parte proporcional a los días que trabajaste en el semestre, sin importar cuántos sean.",
    },
    {
      pregunta: "¿La prima tiene descuentos de salud y pensión?",
      respuesta: "No. La prima de servicios no es salario, así que no se le descuentan aportes a salud ni a pensión.",
    },
    {
      pregunta: "¿Las trabajadoras del servicio doméstico reciben prima?",
      respuesta: "Sí. La Ley 1788 de 2016 les reconoce la prima de servicios igual que al resto de trabajadores.",
    },
  ],
  glosario: [
    { termino: "Prima de servicios", definicion: "Prestación social de un mes de salario por año, que paga la empresa en junio y diciembre." },
    { termino: "Auxilio de transporte", definicion: "Pago mensual para quienes ganan hasta {{co.auxilio-tope}}. Para la prima se suma al salario." },
  ],
});
