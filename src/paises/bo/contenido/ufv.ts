import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.ufv",
  h1: "UFV hoy: conversor de UFV a bolivianos",
  title: "UFV hoy en Bolivia: valor del BCB y conversor a bolivianos",
  description: "La UFV hoy vale {{bo.ufv}} según el Banco Central de Bolivia. Pase montos de UFV a bolivianos y de bolivianos a UFV con el valor del día.",
  intro: [
    "La UFV (Unidad de Fomento de Vivienda) vale hoy {{bo.ufv}}, según el valor que publica el Banco Central de Bolivia para la fecha de hoy. Es una unidad de cuenta que sube un poco cada día con la inflación.",
    "Elija hacia qué lado quiere convertir y escriba el monto.",
  ],
  comoSeCalcula: [
    "Para pasar de UFV a bolivianos, se multiplica la cantidad de UFV por el valor de la UFV del día.",
    "Para pasar de bolivianos a UFV, se divide el monto por ese mismo valor.",
    "El BCB publica un valor de la UFV para cada día, también sábados, domingos y feriados.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto vale la UFV hoy?",
      respuesta: "{{bo.ufv}}. Es el valor que publica el Banco Central de Bolivia para la fecha de hoy.",
    },
    {
      pregunta: "¿Para qué se usa la UFV?",
      respuesta: "Para mantener el valor de montos en el tiempo: deudas tributarias, saldos a favor del RC-IVA, contratos y multas que se expresan en UFV.",
    },
    {
      pregunta: "¿Quién publica la UFV?",
      respuesta: "El Banco Central de Bolivia, en su tabla de cotizaciones de cada día.",
    },
    {
      pregunta: "¿Por qué la UFV cambia todos los días?",
      respuesta: "Porque sigue la inflación que mide el índice de precios al consumidor. Si los precios suben, la UFV sube.",
    },
  ],
  glosario: [
    { termino: "UFV", definicion: "Unidad de Fomento de Vivienda: unidad de cuenta que se ajusta cada día con la inflación." },
    { termino: "BCB", definicion: "Banco Central de Bolivia." },
  ],
});
