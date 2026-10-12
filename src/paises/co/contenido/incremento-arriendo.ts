import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.incremento-arriendo",
  h1: "Calculadora del incremento del arriendo",
  title: "Incremento del arriendo 2026: cuánto puede subir",
  description:
    "Calcula cuánto puede subir el arriendo de vivienda: hasta el IPC del año anterior, cada 12 meses. Revisa también el tope del 1 % del valor del inmueble.",
  intro: [
    "El arriendo de vivienda solo puede subir una vez cada 12 meses, y como máximo lo que subió la inflación (IPC) en el año calendario anterior.",
    "Si el reajuste es en 2026, se usa la inflación de 2025, de enero a diciembre. Escribe tu arriendo y la fecha del reajuste.",
  ],
  comoSeCalcula: [
    "Se toma el IPC de diciembre del año anterior y el de diciembre de dos años antes. La variación entre los dos es la inflación del año.",
    "El aumento máximo es el {{co.arriendo-reajuste}} de esa inflación, sobre el arriendo actual.",
    "Además, el arriendo no puede pasar del {{co.arriendo-tope-canon}} del valor comercial del inmueble al mes.",
  ],
  ejemplo: [
    "Con un arriendo de $1.500.000 que se reajusta en 2026, la inflación de 2025 fue de 5,10 %. El arriendo puede subir hasta $76.512 y quedar en $1.576.512.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto puede subir el arriendo en 2026?",
      respuesta: "Hasta la inflación de 2025 medida por el DANE, de diciembre a diciembre. La calculadora la toma del IPC oficial.",
    },
    {
      pregunta: "¿Cada cuánto puede subir el arriendo?",
      respuesta: "Cada 12 meses de contrato con el mismo precio. El arrendador tiene que avisar el monto y la fecha del aumento.",
    },
    {
      pregunta: "¿Esta regla aplica a locales comerciales?",
      respuesta: "No. La regla del IPC es para vivienda urbana. En los locales comerciales el reajuste depende del contrato.",
    },
  ],
  glosario: [
    { termino: "Canon", definicion: "El precio mensual del arriendo." },
    { termino: "IPC", definicion: "Índice de precios al consumidor del DANE. Mide la inflación." },
  ],
});
