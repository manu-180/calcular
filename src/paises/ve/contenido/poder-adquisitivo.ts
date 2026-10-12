import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.poder-adquisitivo",
  h1: "Calculadora de poder adquisitivo del salario en Venezuela",
  title: "¿Tu salario le ganó a la inflación? Calcúlalo",
  description:
    "Compara tu salario de antes con el de ahora usando el INPC del Banco Central de Venezuela y descubre si ganaste o perdiste poder de compra.",
  intro: [
    "Que tu salario suba en bolívares no quiere decir que puedas comprar más. Para saberlo hay que compararlo con la inflación del mismo período.",
    "Escribe tu salario de antes, el de ahora y sus meses. Con el índice oficial de precios del BCV te decimos cuánto necesitarías hoy para comprar lo mismo y si tu salario ganó o perdió.",
  ],
  comoSeCalcula: [
    "Tomamos el Índice Nacional de Precios al Consumidor (INPC) del BCV de los dos meses.",
    "Salario equivalente: tu salario de antes por el índice de ahora, entre el índice de antes.",
    "Cambio real: tu salario de ahora contra el equivalente. Si es negativo, perdiste poder de compra.",
  ],
  ejemplo: [
    "Si en septiembre de 2025 ganabas Bs. 10.000, en septiembre de 2026 necesitabas Bs. 56.558,06 para comprar lo mismo. Con Bs. 40.000, tu salario perdió 29,28 % de poder de compra.",
  ],
  faq: [
    {
      pregunta: "¿Qué es el poder adquisitivo?",
      respuesta: "Lo que puedes comprar con tu salario. Si los precios suben más rápido que tu salario, compras menos aunque cobres más bolívares.",
    },
    {
      pregunta: "¿De dónde sale la inflación?",
      respuesta: "Del INPC que publica el Banco Central de Venezuela cada mes. Se actualiza solo en esta página.",
    },
    {
      pregunta: "¿Puedo comparar en dólares?",
      respuesta: "Esta calculadora compara en bolívares, porque el INPC mide precios en bolívares. Si tu salario está en dólares, pásalo a bolívares con la tasa de cada mes.",
    },
    {
      pregunta: "¿Por qué no puedo elegir meses antes de octubre de 2021?",
      respuesta: "Porque en octubre de 2021 se le quitaron seis ceros al bolívar. Los montos anteriores están en otra unidad y no se comparan directo.",
    },
  ],
  glosario: [
    { termino: "INPC", definicion: "Índice Nacional de Precios al Consumidor del BCV. Mide la inflación." },
    { termino: "Salario real", definicion: "Lo que vale tu salario medido en lo que puedes comprar con él." },
  ],
});
