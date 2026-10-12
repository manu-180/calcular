import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "gt.inflacion",
  h1: "Calculadora de inflación en Guatemala",
  title: "Calculadora de inflación en Guatemala: actualice un monto",
  description:
    "Actualice un monto con la inflación de los últimos 12 meses que mide el INE y vea cuánto cuesta hoy lo que antes costaba ese dinero.",
  intro: [
    "La inflación mide cuánto suben los precios. En Guatemala la calcula el INE con el índice de precios al consumidor y la publica el Banco de Guatemala.",
    "Usamos la inflación de los últimos 12 meses (interanual) del dato más reciente: {{gt.inflacion-interanual}}.",
  ],
  comoSeCalcula: ["Actualizar: monto × (1 + inflación).", "Descontar: monto / (1 + inflación)."],
  ejemplo: ["Si la inflación interanual fuera del 5 %, lo que hace un año costaba Q1,000 hoy costaría Q1,050."],
  faq: [
    {
      pregunta: "¿De dónde sale el dato de inflación?",
      respuesta: "Del índice de precios al consumidor que calcula el INE cada mes. Lo tomamos de la publicación del Banco de Guatemala y se actualiza solo.",
    },
    {
      pregunta: "¿Qué es la inflación interanual?",
      respuesta: "Es cuánto subieron los precios en los últimos 12 meses, comparando el mes más reciente con el mismo mes del año anterior.",
    },
    {
      pregunta: "¿Sirve para pedir un aumento de salario?",
      respuesta: "Le da una idea de cuánto perdió su salario frente a los precios. No obliga a su patrono a subirlo: el único ajuste obligatorio es el del salario mínimo.",
    },
  ],
  glosario: [{ termino: "IPC", definicion: "Índice de precios al consumidor. Mide el precio de una canasta de bienes y servicios que compran los hogares." }],
});
