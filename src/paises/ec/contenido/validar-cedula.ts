import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.validar-cedula",
  h1: "Validar cédula de Ecuador",
  title: "Validar cédula ecuatoriana: comprueba si el número es válido",
  description: "Comprueba si un número de cédula de Ecuador está bien formado con el dígito verificador y descubre en qué provincia se inscribió. Gratis y al instante.",
  intro: [
    "La cédula ecuatoriana tiene 10 dígitos. Los dos primeros indican la provincia y el último es un dígito verificador que sale de los nueve anteriores.",
    "Escribe el número sin guion y te decimos si está bien formado. Sirve para revisar errores de tipeo en formularios, facturas o roles de pago.",
  ],
  comoSeCalcula: [
    "Los dos primeros dígitos tienen que ser un código de provincia (01 a 24) o 30 para ecuatorianos registrados en el exterior.",
    "El tercer dígito va de 0 a 5 en las cédulas de personas.",
    "Los nueve primeros dígitos se multiplican por 2 y por 1, alternando. Si un producto pasa de 9, se le resta 9.",
    "Se suman los resultados. El verificador es lo que le falta a esa suma para llegar a la siguiente decena.",
  ],
  ejemplo: ["En 1712345675, la suma da 35. Para llegar a 40 faltan 5, que es el último dígito: la cédula es válida."],
  faq: [
    {
      pregunta: "¿Esto confirma que la cédula existe?",
      respuesta: "No. Solo comprueba que el número está bien formado. Para confirmar la identidad de una persona se consulta al Registro Civil.",
    },
    {
      pregunta: "¿Sirve para validar un RUC?",
      respuesta: "El RUC de una persona natural es su cédula más 001. Puedes validar los primeros 10 dígitos aquí.",
    },
    {
      pregunta: "¿Qué provincia es mi cédula?",
      respuesta: "La de los dos primeros dígitos: 17 es Pichincha, 09 es Guayas, 01 es Azuay, y así hasta 24, Santa Elena.",
    },
  ],
  glosario: [
    { termino: "Dígito verificador", definicion: "El último dígito, que se calcula con los demás para detectar errores." },
    { termino: "RUC", definicion: "Registro Único de Contribuyentes del SRI." },
  ],
});
