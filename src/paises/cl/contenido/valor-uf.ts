import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.valor-uf",
  h1: "Valor de la UF hoy y conversor de UF a pesos",
  title: "Valor UF hoy: convierte UF a pesos y pesos a UF",
  description:
    "Convierte UF a pesos chilenos con el valor oficial del día que publica el SII. Sirve para arriendos, créditos hipotecarios, finiquitos y planes de Isapre.",
  intro: [
    "La UF (Unidad de Fomento) es una unidad de cuenta que sube con la inflación. Se usa para arriendos, créditos, seguros, planes de salud y topes legales.",
    "Escribe un monto en UF y te mostramos cuántos pesos son hoy. También funciona al revés.",
  ],
  comoSeCalcula: [
    "Tomamos el valor de la UF del día que publica el Servicio de Impuestos Internos (SII).",
    "Para pasar de UF a pesos, se multiplica el monto por el valor de la UF y se redondea al peso.",
    "Para pasar de pesos a UF, se divide el monto por el valor de la UF.",
  ],
  ejemplo: ["Si un arriendo cuesta 15 UF y la UF vale $41.000, el arriendo de ese día es 15 × 41.000 = $615.000."],
  faq: [
    {
      pregunta: "¿Por qué la UF cambia todos los días?",
      respuesta: "Porque se ajusta según la inflación (el IPC). El cambio se reparte día a día, así que sube o baja de a poco.",
    },
    {
      pregunta: "¿De dónde sale el valor que muestran?",
      respuesta: "De la tabla oficial del SII. Además lo comparamos con una segunda fuente y, si no coinciden, no lo actualizamos.",
    },
    {
      pregunta: "¿Qué UF se usa en un finiquito?",
      respuesta: "Para el tope de las indemnizaciones la ley usa la UF del último día del mes anterior al pago.",
    },
    {
      pregunta: "¿Se puede saber la UF de días que todavía no llegan?",
      respuesta: "Sí, por algunos días. El SII publica los valores con anticipación, más o menos hasta el día 9 del mes siguiente.",
    },
  ],
  glosario: [
    { termino: "UF", definicion: "Unidad de Fomento. Unidad de cuenta reajustable según la inflación, con valor diario en pesos." },
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cuánto suben los precios cada mes y lo publica el INE." },
  ],
});
