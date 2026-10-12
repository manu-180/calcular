import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.preaviso",
  h1: "Calculadora de preaviso",
  title: "Preaviso en Paraguay: cuántos días y cuánto se paga",
  description: "Calculá los días de preaviso según tu antigüedad ({{py.preaviso-dias[hasta-1]}} a {{py.preaviso-dias[mas-10]}}) y cuánto se paga si no se da. Para despido o renuncia.",
  intro: [
    "El preaviso es el aviso con anticipación que tiene que dar quien termina un contrato por tiempo indefinido. Va de {{py.preaviso-dias[hasta-1]}} a {{py.preaviso-dias[mas-10]}}, según tu antigüedad.",
    "Si te despiden sin aviso, el empleador te paga el salario de esos días. Si renunciás sin avisar, le debés la mitad.",
  ],
  comoSeCalcula: [
    "Se mira tu antigüedad el día del aviso: {{py.preaviso-dias[hasta-1]}} hasta un año, {{py.preaviso-dias[hasta-5]}} hasta cinco, {{py.preaviso-dias[hasta-10]}} hasta diez y {{py.preaviso-dias[mas-10]}} con más de diez.",
    "Tu salario diario es el promedio de los últimos seis meses dividido {{py.divisor-salario-diario}}.",
    "El salario del preaviso son esos días por tu salario diario.",
    "Si lo omite el empleador, paga todo ese monto. Si lo omite quien renuncia, debe el {{py.preaviso-omitido-trabajador}}.",
  ],
  ejemplo: [
    "Con 3 años y medio en la empresa y Gs. 4.500.000 de salario, el preaviso es de {{py.preaviso-dias[hasta-5]}}. Si te despiden sin aviso, te tienen que pagar Gs. 6.750.000.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de preaviso me corresponden?",
      respuesta: "Depende de tu antigüedad: {{py.preaviso-dias[hasta-1]}} hasta un año, {{py.preaviso-dias[hasta-5]}} hasta cinco años, {{py.preaviso-dias[hasta-10]}} hasta diez y {{py.preaviso-dias[mas-10]}} con más de diez.",
    },
    {
      pregunta: "¿Qué pasa si renuncio sin dar preaviso?",
      respuesta: "El empleador puede pedirte el {{py.preaviso-omitido-trabajador}} del salario de esos días. En la práctica suele descontarlo de tu liquidación.",
    },
    {
      pregunta: "¿Durante el preaviso tengo que trabajar?",
      respuesta: "Sí, y cobrás tu salario normal. Si te despidieron, tenés dos horas libres por día (o un día por semana) para buscar otro trabajo.",
    },
    {
      pregunta: "¿Hay preaviso en el período de prueba?",
      respuesta: "No. Durante el período de prueba cualquiera de las dos partes puede terminar el contrato sin preaviso ni indemnización.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso con anticipación para terminar un contrato por tiempo indefinido (artículo 87 del Código del Trabajo)." },
    { termino: "Preaviso omitido", definicion: "Cuando no se da el aviso. Se paga en dinero (artículo 90)." },
  ],
});
