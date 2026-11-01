import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.jubilacion-iess",
  h1: "Calculadora de jubilación del IESS",
  title: "Jubilación IESS {{anio}}: calcula tu pensión de vejez",
  description: "Estima tu pensión de vejez del IESS con tus años de aportes y el promedio de tus cinco mejores años de sueldo, con los mínimos y máximos del año.",
  intro: [
    "La pensión de vejez del IESS se calcula con el promedio de tus cinco años de mejores sueldos y un coeficiente que crece con tus años de aportes.",
    "Pon tu edad, tus años de aportes y ese promedio. Te decimos si cumples los requisitos y cuánto sería tu pensión.",
  ],
  comoSeCalcula: [
    "Se promedia el sueldo mensual de cada año de aportes y se eligen los cinco promedios más altos.",
    "Ese valor se multiplica por el coeficiente de tus años de aportes: con 30 años es {{ec.jubilacion-coeficientes[30]}} y con 40 llega a {{ec.jubilacion-coeficientes[40]}}.",
    "La pensión no puede bajar del mínimo ni pasar del máximo que corresponde a tus años de aportes.",
  ],
  faq: [
    {
      pregunta: "¿Cuándo me puedo jubilar en el IESS?",
      respuesta: "Desde los 60 años con {{ec.jubilacion-requisitos[60]}} de aportes, desde los 65 con {{ec.jubilacion-requisitos[65]}}, desde los 70 con {{ec.jubilacion-requisitos[70]}}, o con cualquier edad si tienes {{ec.jubilacion-requisitos[0]}}.",
    },
  ],
  glosario: [{ termino: "Imposición", definicion: "Cada mes de aporte registrado en el IESS." }],
});
